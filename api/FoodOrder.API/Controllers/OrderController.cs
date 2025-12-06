using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Orders.Commands.Create;
using FoodOrder.Application.Contracts.Orders;
using System.Security.Claims;
using FoodOrder.Api.Controllers; // To get User ID

namespace FoodOrder.API.Controllers
{
    [Route("api/orders")]
    public class OrdersController : ApiController
    {
        private readonly ISender _mediator;

        public OrdersController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder(CreateOrderRequest request)
        {
            // Assuming you have JWT Auth set up and can get the user ID
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var items = request.Items
                .Select(i => new OrderItemCommand(i.MenuItemId, i.Quantity))
                .ToList();

            var command = new CreateOrderCommand(userId, request.RestaurantId, items);

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
