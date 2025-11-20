using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.Common.Interfaces.Persistence;

public interface IUserRepository
{
    void Add(User user);
    User? GetUserByEmail(string email);
}