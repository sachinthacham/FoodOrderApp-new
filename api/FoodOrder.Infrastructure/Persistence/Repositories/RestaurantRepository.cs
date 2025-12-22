using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodOrder.Infrastructure.Persistence.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly FoodOrderDbContext _dbContext;

        public RestaurantRepository(FoodOrderDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Restaurant restaurant)
        {
            _dbContext.Restaurants.Add(restaurant);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Restaurant?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Restaurants
                .Include(r => r.MenuItems)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Restaurant>> GetAllAsync()
        {
            return await _dbContext.Restaurants
                .Include(r => r.MenuItems)
                .ToListAsync();
        }

        public async Task<List<Restaurant>> GetBySellerIdAsync(Guid sellerId)
        {
            return await _dbContext.Restaurants
                .Include(r => r.MenuItems)
                .Where(r => r.SellerId == sellerId)
                .ToListAsync();
        }

        public async Task UpdateAsync(Restaurant restaurant)
        {
            _dbContext.Restaurants.Update(restaurant);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Restaurant restaurant)
        {
            _dbContext.Restaurants.Remove(restaurant);
            await _dbContext.SaveChangesAsync();
        }
    }
}