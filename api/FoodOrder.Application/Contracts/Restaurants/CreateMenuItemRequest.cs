namespace FoodOrder.Application.Contracts.Restaurants;

public record CreateMenuItemRequest(
    Guid RestaurantId,
    string Name,
    string Description,
    decimal Price);

