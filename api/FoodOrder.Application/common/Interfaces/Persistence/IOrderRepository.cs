using FoodOrder.Domain.Entities;
using FoodOrder.Domain.Common;

namespace FoodOrder.Application.common.Interfaces.Persistence
{
    public interface IOrderRepository
    {
        Task AddAsync(Order order);
        Task<Order?> GetByIdAsync(Guid id);
        Task<List<Order>> GetByUserIdAsync(Guid userId);
        Task<List<Order>> GetAllAsync();
        Task<List<Order>> GetByRestaurantIdAsync(Guid restaurantId);
        Task<List<Order>> GetByRestaurantIdsAsync(List<Guid> restaurantIds);
        Task<List<Order>> GetByDeliveryBoyIdAsync(Guid deliveryBoyId);
        Task<List<Order>> GetByStatusAsync(OrderStatus status);
        Task UpdateAsync(Order order);
    }
}