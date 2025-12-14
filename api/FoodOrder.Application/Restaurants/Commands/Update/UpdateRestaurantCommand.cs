using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Commands.Update;

public record UpdateRestaurantCommand(
    Guid Id,
    string Name,
    string Description,
    string Address) : IRequest<ErrorOr<RestaurantResult>>;

