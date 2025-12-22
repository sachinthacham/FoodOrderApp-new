using ErrorOr;

namespace FoodOrder.Domain.Common.Errors;

public static partial class Errors
{
    public static class Order
    {
        public static Error NotFound => Error.NotFound(
            code: "Order.NotFound",
            description: "Order not found."
        );

        public static Error InvalidStatus => Error.Validation(
            code: "Order.InvalidStatus",
            description: "Invalid order status transition."
        );

        public static Error EmptyItems => Error.Validation(
            code: "Order.EmptyItems",
            description: "Order must contain at least one item."
        );

        public static Error RestaurantNotFound => Error.NotFound(
            code: "Order.RestaurantNotFound",
            description: "Restaurant not found for this order."
        );
    }
}

