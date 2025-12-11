using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.common.Interfaces.Persistence;

public interface IMenuItemRepository
{
    Task AddAsync(MenuItem menuItem);
    Task<MenuItem?> GetByIdAsync(Guid id);
    Task<List<MenuItem>> GetByRestaurantIdAsync(Guid restaurantId);
    Task UpdateAsync(MenuItem menuItem);
    Task DeleteAsync(MenuItem menuItem);
}

