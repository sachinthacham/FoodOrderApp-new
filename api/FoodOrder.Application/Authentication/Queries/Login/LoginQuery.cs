using FoodOrder.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace FoodOrder.Application.Authentication.Queries.Login;

public record LoginQuery(
    string Email,
    string Password
) : IRequest<ErrorOr<AuthenticationResult>>;