using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Common;

namespace FoodOrder.Application.Restaurants.Queries.GetMenuItems;

public record GetMenuItemsQuery(Guid RestaurantId) : IRequest<ErrorOr<List<MenuItemResult>>>;

