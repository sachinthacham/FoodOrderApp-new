namespace FoodOrder.Application.Contracts.Orders
{
    public record CreateOrderRequest(
        Guid RestaurantId,
        List<CartItemRequest> Items);

    public record CartItemRequest(Guid MenuItemId, int Quantity);
}