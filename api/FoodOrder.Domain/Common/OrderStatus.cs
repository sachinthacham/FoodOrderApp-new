namespace FoodOrder.Domain.Common;

public enum OrderStatus
{
    PLACED,        // By customer
    CONFIRMED,     // By restaurant
    PREPARING,     // System (automatic after CONFIRMED)
    READY,         // By restaurant
    PICKED_UP,     // By delivery boy
    ON_THE_WAY,    // System (automatic after PICKED_UP)
    DELIVERED      // By delivery boy
}

