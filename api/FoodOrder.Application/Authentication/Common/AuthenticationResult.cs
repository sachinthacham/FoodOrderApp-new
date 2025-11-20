using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string Token
);