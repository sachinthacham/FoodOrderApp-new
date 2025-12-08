using FoodOrder.Application.Authentication.Common;
using FoodOrder.Domain.Common;
using ErrorOr;
using MediatR;

namespace FoodOrder.Application.Authentication.Commands.Register;

public record RegisterCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string Role = UserRole.Buyer
) : IRequest<ErrorOr<AuthenticationResult>>;