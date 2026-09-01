using System;

namespace FoodOrder.Domain.Entities;

public class Favorite
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid RestaurantId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
