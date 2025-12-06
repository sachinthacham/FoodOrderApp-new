using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Restaurants.Commands.Create;
using FoodOrder.Application.Contracts.Restaurants;
using FoodOrder.Api.Controllers;

namespace FoodOrder.API.Controllers
{
    [Route("restaurants")] // Keeping consistent with your likely route structure, or use "api/restaurants"
    // Inherit from your base ApiController if you have one
    public class RestaurantsController : ApiController 
    {
        private readonly ISender _mediator;

        public RestaurantsController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateRestaurant(CreateRestaurantRequest request)
        {
            var command = new CreateRestaurantCommand(
                request.Name, 
                request.Description, 
                request.Address);

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}