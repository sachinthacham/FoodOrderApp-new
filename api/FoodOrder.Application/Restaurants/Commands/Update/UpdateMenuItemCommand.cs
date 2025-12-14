using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Commands.Update;

public record UpdateMenuItemCommand(
    Guid Id,
    string Name,
    string Description,
    decimal Price) : IRequest<ErrorOr<MenuItemResult>>;

