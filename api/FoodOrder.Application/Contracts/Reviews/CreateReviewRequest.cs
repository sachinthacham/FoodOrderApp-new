using System;

namespace FoodOrder.Application.Contracts.Reviews;

public record CreateReviewRequest(
    Guid RestaurantId, 
    Guid? MenuItemId, 
    int Rating, 
    string Comment);
