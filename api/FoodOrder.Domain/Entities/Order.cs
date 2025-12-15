using FoodOrder.Domain.Common;

namespace FoodOrder.Domain.Entities;
public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid RestaurantId { get; set; }
    public Guid? DeliveryBoyId { get; set; } // Assigned delivery person
    public DateTime OrderDateTime { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.PLACED;

    public List<OrderItem> Items { get; set; } = new();
}