using ErrorOr;

namespace FoodOrder.Domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error DuplicateEmail => Error.Conflict(
            code: "User.DuplicateEmail",
            description: "A user with the given email already exists."
        );

        public static Error InvalidRole => Error.Validation(
            code: "User.InvalidRole",
            description: "Invalid user role. Valid roles are: Admin, Seller, Buyer, DeliveryBoy."
        );
    }
    
  
}