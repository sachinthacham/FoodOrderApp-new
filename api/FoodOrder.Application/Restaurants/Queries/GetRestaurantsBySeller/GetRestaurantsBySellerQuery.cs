using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Queries.GetRestaurantsBySeller;

public record GetRestaurantsBySellerQuery(Guid SellerId) : IRequest<ErrorOr<List<RestaurantResult>>>;

