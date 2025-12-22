using ErrorOr;

namespace FoodOrder.Domain.Common.Errors;

public static partial class Errors
{
    public static class Authentication
    {
          
        public static Error InvalidCredentials => Error.Validation(
            code: "Auth.InvalidCredentials",
            description: "The provided credentials are invalid."
        );
    
    }
    
  
}