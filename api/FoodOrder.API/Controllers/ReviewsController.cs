using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Contracts.Reviews;
using FoodOrder.Application.Reviews.Commands;
using FoodOrder.Application.Reviews.Queries;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace FoodOrder.Api.Controllers;

[Route("reviews")]
public class ReviewsController : ApiController
{
    private readonly ISender _mediator;

    public ReviewsController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateReview([FromBody] CreateReviewRequest request)
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var command = new CreateReviewCommand(
            userId,
            request.RestaurantId,
            request.MenuItemId,
            request.Rating,
            request.Comment);

        var result = await _mediator.Send(command);

        return result.Match(
            review => Ok(review),
            errors => Problem(errors)
        );
    }

    [HttpGet("restaurant/{restaurantId:guid}")]
    public async Task<IActionResult> GetReviewsByRestaurant(Guid restaurantId)
    {
        var query = new GetReviewsByRestaurantQuery(restaurantId);
        var result = await _mediator.Send(query);

        return result.Match(
            reviews => Ok(reviews),
            errors => Problem(errors)
        );
    }
}
