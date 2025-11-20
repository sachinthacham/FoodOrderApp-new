using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.Common.interfaces.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}