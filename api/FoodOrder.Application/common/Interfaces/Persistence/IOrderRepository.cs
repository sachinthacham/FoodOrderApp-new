using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.common.Interfaces.Persistence
{
    public interface IOrderRepository
    {
        Task AddAsync(Order order);
        Task<List<Order>> GetByUserIdAsync(Guid userId);
    }
}