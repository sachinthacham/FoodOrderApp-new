using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace FoodOrder.Infrastructure.Persistence.Repositories;

public class CartRepository : ICartRepository
{
    private readonly FoodOrderDbContext _dbContext;

    public CartRepository(FoodOrderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Cart?> GetByUserIdAsync(Guid userId)
    {
        return await _dbContext.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    public async Task<Cart?> GetByUserIdAndRestaurantIdAsync(Guid userId, Guid restaurantId)
    {
        return await _dbContext.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId && c.RestaurantId == restaurantId);
    }

    public async Task AddAsync(Cart cart)
    {
        await _dbContext.Carts.AddAsync(cart);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Cart cart)
    {
        try
        {
            Console.WriteLine($"CartRepository.UpdateAsync: Updating cart {cart.Id}");

            // Check if cart is already tracked
            var trackedEntry = _dbContext.Entry(cart);
            Cart existingCart;
            
            if (trackedEntry.State == EntityState.Detached)
            {
                // Cart is not tracked, load it fresh
                Console.WriteLine($"Cart {cart.Id} is not tracked, loading fresh");
                var loadedCart = await _dbContext.Carts
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(c => c.Id == cart.Id);

                if (loadedCart is null)
                {
                    throw new InvalidOperationException($"Cart {cart.Id} not found for update.");
                }
                existingCart = loadedCart;
            }
            else
            {
                // Cart is already tracked, use it directly
                Console.WriteLine($"Cart {cart.Id} is already tracked, using tracked instance");
                existingCart = cart;
                
                // Ensure items are loaded
                if (existingCart.Items == null || !existingCart.Items.Any())
                {
                    await _dbContext.Entry(existingCart)
                        .Collection(c => c.Items)
                        .LoadAsync();
                }
            }

            var incomingItems = cart.Items ?? new List<CartItem>();
            var incomingItemIds = incomingItems.Select(i => i.Id).ToHashSet();

            // Ensure existingCart.Items is initialized
            existingCart.Items ??= new List<CartItem>();

            // Remove items that no longer exist in the incoming cart
            var itemsToRemove = existingCart.Items
                .Where(dbItem => !incomingItemIds.Contains(dbItem.Id))
                .ToList();
            
            if (itemsToRemove.Any())
            {
                Console.WriteLine($"Removing {itemsToRemove.Count} items from cart");
                foreach (var item in itemsToRemove)
                {
                    existingCart.Items.Remove(item);
                    _dbContext.CartItems.Remove(item);
                }
            }

            // Add or update items
            foreach (var item in incomingItems)
            {
                var existingItem = existingCart.Items.FirstOrDefault(ci => ci.Id == item.Id);
                if (existingItem is null)
                {
                    // New item - ensure CartId is set
                    item.CartId = existingCart.Id;
                    Console.WriteLine($"Adding new cart item: {item.MenuItemName}, Quantity: {item.Quantity}");
                    existingCart.Items.Add(item);
                }
                else
                {
                    // Update existing item
                    Console.WriteLine($"Updating cart item: {item.MenuItemName}, Quantity: {item.Quantity}");
                    existingItem.MenuItemId = item.MenuItemId;
                    existingItem.MenuItemName = item.MenuItemName;
                    existingItem.Price = item.Price;
                    existingItem.Quantity = item.Quantity;
                }
            }

            // Update cart fields
            existingCart.RestaurantId = cart.RestaurantId;
            existingCart.TotalAmount = cart.TotalAmount;
            existingCart.UpdatedAt = cart.UpdatedAt;

            await _dbContext.SaveChangesAsync();
            Console.WriteLine($"CartRepository.UpdateAsync: Successfully saved cart {cart.Id}");
        }
        catch (DbUpdateConcurrencyException ex)
        {
            Console.WriteLine($"CartRepository.UpdateAsync CONCURRENCY ERROR: {ex.Message}");
            // Reload and retry once
            var existingCart = await _dbContext.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.Id == cart.Id);
            
            if (existingCart != null)
            {
                // Clear tracking and retry
                _dbContext.Entry(existingCart).State = EntityState.Detached;
                await UpdateAsync(cart);
                return;
            }
            throw;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"CartRepository.UpdateAsync ERROR: {ex.Message}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"InnerException: {ex.InnerException.Message}");
            }
            throw;
        }
    }

    public async Task DeleteAsync(Cart cart)
    {
        _dbContext.Carts.Remove(cart);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<CartItem?> GetCartItemByIdAsync(Guid cartItemId)
    {
        return await _dbContext.CartItems
            .FirstOrDefaultAsync(ci => ci.Id == cartItemId);
    }
}