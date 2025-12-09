using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Carts.Commands.AddItem;
using FoodOrder.Application.Carts.Commands.RemoveItem;
using FoodOrder.Application.Carts.Commands.UpdateQuantity;
using FoodOrder.Application.Carts.Commands.ClearCart;
using FoodOrder.Application.Carts.Queries.GetCart;
using FoodOrder.Application.Contracts.Carts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FoodOrder.Api.Controllers;
using ErrorOr;

namespace FoodOrder.Api.Controllers
{
    [Route("cart")]
   
    public class CartController : ApiController
    {
        private readonly ISender _mediator;

        public CartController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var query = new GetCartQuery(userId);
            var result = await _mediator.Send(query);

            return result.Match(
                cart => Ok(cart),
                errors => Problem(errors)
            );
        }

      [HttpPost("items")]
[Authorize(Roles = "Admin,Buyer")]
public async Task<IActionResult> AddItem(AddCartItemRequest request)
{
    // Extract userId from JWT token
    var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
        ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
    {
        return Unauthorized();
    }

    // Create command without restaurantId
    var command = new AddCartItemCommand(
        userId,                 // From JWT token
        request.MenuItemId,     // Only menu item ID needed
        request.Quantity);      // Quantity

    var result = await _mediator.Send(command);

    return result.Match(
        cart => Ok(cart),
        errors => Problem(errors)
    );
}

        [HttpDelete("items/{cartItemId:guid}")]
        public async Task<IActionResult> RemoveItem(Guid cartItemId)
        {
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var command = new RemoveCartItemCommand(userId, cartItemId);
            var result = await _mediator.Send(command);

            return result.Match(
                cart => Ok(cart),
                errors => Problem(errors)
            );
        }

        [HttpPut("items/{cartItemId:guid}/quantity")]
        public async Task<IActionResult> UpdateQuantity(Guid cartItemId, UpdateCartItemQuantityRequest request)
        {
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var command = new UpdateCartItemQuantityCommand(userId, cartItemId, request.Quantity);
            var result = await _mediator.Send(command);

            return result.Match(
                cart => Ok(cart),
                errors => Problem(errors)
            );
        }

        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var command = new ClearCartCommand(userId);
            var result = await _mediator.Send(command);

            return result.Match(
                cart => Ok(cart),
                errors => Problem(errors)
            );
        }
    }
}

