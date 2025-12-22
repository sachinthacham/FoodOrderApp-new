using ErrorOr;

namespace FoodOrder.Domain.Common.Errors;

public static partial class Errors
{
    public static class MenuItem
    {
        public static Error NotFound => Error.NotFound(
            code: "MenuItem.NotFound",
            description: "Menu item not found."
        );

        public static Error InvalidPrice => Error.Validation(
            code: "MenuItem.InvalidPrice",
            description: "Menu item price must be greater than zero."
        );
    }
}

