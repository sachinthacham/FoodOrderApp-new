using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.common.Interfaces.Persistence
{
    public interface IRestaurantRepository
    {
        Task AddAsync(Restaurant restaurant);
        Task<Restaurant?> GetByIdAsync(Guid id);
        Task<List<Restaurant>> GetAllAsync();
        Task<List<Restaurant>> GetBySellerIdAsync(Guid sellerId);
        Task UpdateAsync(Restaurant restaurant);
        Task DeleteAsync(Restaurant restaurant);
    }
}