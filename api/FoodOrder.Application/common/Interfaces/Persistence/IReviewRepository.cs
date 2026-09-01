using FoodOrder.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodOrder.Application.common.Interfaces.Persistence;

public interface IReviewRepository
{
    Task AddAsync(Review review);
    Task<List<Review>> GetByRestaurantIdAsync(Guid restaurantId);
    Task<List<Review>> GetByUserIdAsync(Guid userId);
}
