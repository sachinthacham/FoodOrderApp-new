using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Queries.GetAllRestaurants;

public record GetAllRestaurantsQuery() : IRequest<ErrorOr<List<RestaurantResult>>>;

