using System;

namespace FoodOrder.Application.Contracts.Favorites;

public record CreateFavoriteRequest(Guid RestaurantId);
