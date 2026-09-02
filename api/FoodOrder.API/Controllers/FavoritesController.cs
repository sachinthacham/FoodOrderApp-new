using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Contracts.Favorites;
using FoodOrder.Application.Favorites.Commands;
using FoodOrder.Application.Favorites.Queries;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace FoodOrder.Api.Controllers;

[Route("favorites")]
public class FavoritesController : ApiController
{
    private readonly ISender _mediator;

    public FavoritesController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddFavorite([FromBody] CreateFavoriteRequest request)
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var command = new CreateFavoriteCommand(userId, request.RestaurantId);
        var result = await _mediator.Send(command);

        return result.Match(
            favorite => Ok(favorite),
            errors => Problem(errors)
        );
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetMyFavorites()
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var query = new GetFavoritesByUserQuery(userId);
        var result = await _mediator.Send(query);

        return result.Match(
            favorites => Ok(favorites),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{restaurantId:guid}")]
    [Authorize]
    public async Task<IActionResult> RemoveFavorite(Guid restaurantId)
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var command = new DeleteFavoriteCommand(userId, restaurantId);
        var result = await _mediator.Send(command);

        return result.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }
}
