using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Restaurants.Commands.Create;
using FoodOrder.Application.Restaurants.Commands.Update;
using FoodOrder.Application.Restaurants.Commands.Delete;
using FoodOrder.Application.Restaurants.Queries.GetMenuItems;
using FoodOrder.Application.Contracts.Restaurants;
using FoodOrder.Api.Controllers;
using ErrorOr;

namespace FoodOrder.Api.Controllers
{
    [Route("restaurants/{restaurantId:guid}/menu-items")]
    public class MenuItemsController : ApiController
    {
        private readonly ISender _mediator;

        public MenuItemsController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Seller")]
        public async Task<IActionResult> CreateMenuItem(Guid restaurantId, CreateMenuItemRequest request)
        {
            if (restaurantId != request.RestaurantId)
            {
                return BadRequest("Restaurant ID mismatch");
            }

            var command = new CreateMenuItemCommand(
                request.RestaurantId,
                request.Name,
                request.Description,
                request.Price);

            var result = await _mediator.Send(command);

            return result.Match(
                menuItem => CreatedAtAction(
                    nameof(GetMenuItems),
                    new { restaurantId = request.RestaurantId },
                    menuItem),
                errors => Problem(errors)
            );
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuItems(Guid restaurantId)
        {
            var query = new GetMenuItemsQuery(restaurantId);
            var result = await _mediator.Send(query);

            return result.Match(
                menuItems => Ok(menuItems),
                errors => Problem(errors)
            );
        }

        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Admin,Seller")]
        public async Task<IActionResult> UpdateMenuItem(Guid restaurantId, Guid id, UpdateMenuItemRequest request)
        {
            var command = new UpdateMenuItemCommand(
                id,
                request.Name,
                request.Description,
                request.Price);

            var result = await _mediator.Send(command);

            return result.Match(
                menuItem => Ok(menuItem),
                errors => Problem(errors)
            );
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Admin,Seller")]
        public async Task<IActionResult> DeleteMenuItem(Guid restaurantId, Guid id)
        {
            var command = new DeleteMenuItemCommand(id);
            var result = await _mediator.Send(command);

            return result.Match(
                _ => NoContent(),
                errors => Problem(errors)
            );
        }
    }
}

