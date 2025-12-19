using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using FoodOrder.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace FoodOrder.Infrastructure.Persistence.Repositories
{
    public class OrderRepository: IOrderRepository
    {
        private readonly FoodOrderDbContext _dbContext;

        public OrderRepository(FoodOrderDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Order order)
        {
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Order?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<List<Order>> GetByUserIdAsync(Guid userId)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task<List<Order>> GetAllAsync()
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task<List<Order>> GetByRestaurantIdAsync(Guid restaurantId)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => o.RestaurantId == restaurantId)
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task<List<Order>> GetByRestaurantIdsAsync(List<Guid> restaurantIds)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => restaurantIds.Contains(o.RestaurantId))
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task<List<Order>> GetByDeliveryBoyIdAsync(Guid deliveryBoyId)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => o.DeliveryBoyId == deliveryBoyId)
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task<List<Order>> GetByStatusAsync(OrderStatus status)
        {
            return await _dbContext.Orders
                .Include(o => o.Items)
                .Where(o => o.Status == status)
                .OrderByDescending(o => o.OrderDateTime)
                .ToListAsync();
        }

        public async Task UpdateAsync(Order order)
        {
            _dbContext.Orders.Update(order);
            await _dbContext.SaveChangesAsync();
        }
    }
}