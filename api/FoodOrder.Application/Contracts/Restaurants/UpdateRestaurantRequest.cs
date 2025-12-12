namespace FoodOrder.Application.Contracts.Restaurants;

public record UpdateRestaurantRequest(
    string Name,
    string Description,
    string Address);

