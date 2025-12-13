using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Commands.Create
{
    public record CreateRestaurantCommand(
        string Name, 
        string Description, 
        string Address,
        Guid? SellerId = null) : IRequest<ErrorOr<RestaurantResult>>;
}