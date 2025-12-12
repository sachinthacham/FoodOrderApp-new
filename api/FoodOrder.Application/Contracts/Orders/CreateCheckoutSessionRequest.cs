namespace FoodOrder.Application.Contracts.Orders;

public record CreateCheckoutSessionRequest(
    Guid RestaurantId,
    List<OrderItemRequest> Items);

public record OrderItemRequest(
    Guid MenuItemId,
    int Quantity);

