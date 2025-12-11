namespace FoodOrder.Application.Contracts.Carts;

public record AddCartItemRequest(
    Guid? RestaurantId,  // Optional - will be derived from menu item if not provided
    Guid MenuItemId,
    int Quantity);

