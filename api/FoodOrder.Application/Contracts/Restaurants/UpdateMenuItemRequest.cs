namespace FoodOrder.Application.Contracts.Restaurants;

public record UpdateMenuItemRequest(
    string Name,
    string Description,
    decimal Price);

