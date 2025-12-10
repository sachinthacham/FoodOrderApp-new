using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.common.Interfaces.Persistence;

public interface ICartRepository
{
    Task<Cart?> GetByUserIdAsync(Guid userId);
    Task<Cart?> GetByUserIdAndRestaurantIdAsync(Guid userId, Guid restaurantId);
    Task AddAsync(Cart cart);
    Task UpdateAsync(Cart cart);
    Task DeleteAsync(Cart cart);
    Task<CartItem?> GetCartItemByIdAsync(Guid cartItemId);
}

