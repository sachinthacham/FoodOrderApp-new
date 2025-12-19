using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodOrder.Infrastructure.Persistence.Repositories;

public class MenuItemRepository : IMenuItemRepository
{
    private readonly FoodOrderDbContext _dbContext;

    public MenuItemRepository(FoodOrderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(MenuItem menuItem)
    {
        _dbContext.MenuItems.Add(menuItem);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<MenuItem?> GetByIdAsync(Guid id)
    {
        return await _dbContext.MenuItems
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<List<MenuItem>> GetByRestaurantIdAsync(Guid restaurantId)
    {
        return await _dbContext.MenuItems
            .Where(m => m.RestaurantId == restaurantId)
            .ToListAsync();
    }

    public async Task UpdateAsync(MenuItem menuItem)
    {
        _dbContext.MenuItems.Update(menuItem);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(MenuItem menuItem)
    {
        _dbContext.MenuItems.Remove(menuItem);
        await _dbContext.SaveChangesAsync();
    }
}

