using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodOrder.Infrastructure.Persistence.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly FoodOrderDbContext _dbContext;

    public ReviewRepository(FoodOrderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Review review)
    {
        await _dbContext.Reviews.AddAsync(review);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Review>> GetByRestaurantIdAsync(Guid restaurantId)
    {
        return await _dbContext.Reviews
            .Where(r => r.RestaurantId == restaurantId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Review>> GetByUserIdAsync(Guid userId)
    {
        return await _dbContext.Reviews
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }
}
