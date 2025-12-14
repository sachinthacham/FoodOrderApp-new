using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Queries.GetRestaurant;

public record GetRestaurantQuery(Guid Id) : IRequest<ErrorOr<RestaurantResult>>;

