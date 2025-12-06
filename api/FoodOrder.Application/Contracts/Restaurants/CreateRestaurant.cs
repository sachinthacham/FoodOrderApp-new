namespace FoodOrder.Application.Contracts.Restaurants
{
    public record CreateRestaurantRequest(
        string Name, 
        string Description, 
        string Address);
}