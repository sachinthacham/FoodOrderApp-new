using System;

namespace FoodOrder.Domain.Entities;

public class Review
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    // The user who wrote the review
    public Guid UserId { get; set; }
    
    // The restaurant being reviewed
    public Guid RestaurantId { get; set; }
    
    // Optional: if the review is specific to a menu item
    public Guid? MenuItemId { get; set; }
    
    public int Rating { get; set; } // 1 to 5
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
