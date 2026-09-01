using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodOrder.Infrastructure.Persistence.Repositories;

public class FavoriteRepository : IFavoriteRepository
{
    private readonly FoodOrderDbContext _dbContext;

    public FavoriteRepository(FoodOrderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Favorite favorite)
    {
        var existing = await _dbContext.Favorites.FirstOrDefaultAsync(f => f.UserId == favorite.UserId && f.RestaurantId == favorite.RestaurantId);
        if (existing == null)
        {
            await _dbContext.Favorites.AddAsync(favorite);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<List<Favorite>> GetByUserIdAsync(Guid userId)
    {
        return await _dbContext.Favorites
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();
    }

    public async Task DeleteAsync(Guid userId, Guid restaurantId)
    {
        var favorite = await _dbContext.Favorites.FirstOrDefaultAsync(f => f.UserId == userId && f.RestaurantId == restaurantId);
        if (favorite != null)
        {
            _dbContext.Favorites.Remove(favorite);
            await _dbContext.SaveChangesAsync();
        }
    }
}
