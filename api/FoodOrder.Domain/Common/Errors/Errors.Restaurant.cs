using ErrorOr;

namespace FoodOrder.Domain.Common.Errors;

public static partial class Errors
{
    public static class Restaurant
    {
        public static Error NotFound => Error.NotFound(
            code: "Restaurant.NotFound",
            description: "Restaurant not found."
        );

        public static Error DuplicateName => Error.Conflict(
            code: "Restaurant.DuplicateName",
            description: "A restaurant with the given name already exists."
        );
    }
}

