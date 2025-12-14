using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Commands.Create;

public record CreateMenuItemCommand(
    Guid RestaurantId,
    string Name,
    string Description,
    decimal Price) : IRequest<ErrorOr<MenuItemResult>>;

