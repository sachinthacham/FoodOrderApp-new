using FoodOrder.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodOrder.Application.common.Interfaces.Persistence;

public interface IFavoriteRepository
{
    Task AddAsync(Favorite favorite);
    Task<List<Favorite>> GetByUserIdAsync(Guid userId);
    Task DeleteAsync(Guid userId, Guid restaurantId);
}
