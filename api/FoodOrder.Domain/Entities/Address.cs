using System;

namespace FoodOrder.Domain.Entities;

public class Address
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    
    public string Label { get; set; } = "Home"; // e.g., Home, Work, etc.
    public string Street { get; set; } = null!;
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string ZipCode { get; set; } = null!;
    public string Country { get; set; } = null!;
    
    public bool IsDefault { get; set; } = false;
}
