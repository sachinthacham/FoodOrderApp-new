namespace FoodOrder.Application.Contracts.Authentication;

public record RegisterRequest(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string Role = "Buyer" // Default to Buyer if not specified
);
