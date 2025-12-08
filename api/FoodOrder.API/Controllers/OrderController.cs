using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Orders.Commands.Create;
using FoodOrder.Application.Orders.Commands.UpdateStatus;
using FoodOrder.Application.Orders.Queries.GetOrder;
using FoodOrder.Application.Orders.Queries.GetOrdersByUser;
using FoodOrder.Application.Orders.Queries.GetAllOrders;
using FoodOrder.Application.Contracts.Orders;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FoodOrder.Api.Controllers;
using ErrorOr;

namespace FoodOrder.Api.Controllers
{
    [Route("orders")]
     [Authorize(Roles = "Admin,Seller")]
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
            // Get user ID from JWT token
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var items = request.Items
                .Select(i => new OrderItemCommand(i.MenuItemId, i.Quantity))
                .ToList();

            var command = new CreateOrderCommand(userId, request.RestaurantId, items);
            var result = await _mediator.Send(command);

            return result.Match(
                order => Ok(order),
                errors => Problem(errors)
            );
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetOrder(Guid id)
        {
            // Get user ID from JWT token
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            Guid? userId = null;
            if (!string.IsNullOrEmpty(userIdString) && Guid.TryParse(userIdString, out var parsedUserId))
            {
                userId = parsedUserId;
            }

            // Check if user has Admin, Seller, or DeliveryBoy role (can view any order)
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var canViewAnyOrder = userRole == "Admin" || userRole == "Seller" || userRole == "DeliveryBoy";

            var query = new GetOrderQuery(id, canViewAnyOrder ? null : userId);
            var result = await _mediator.Send(query);

            return result.Match(
                order => Ok(order),
                errors => Problem(errors)
            );
        }

        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var query = new GetOrdersByUserQuery(userId);
            var result = await _mediator.Send(query);

            return result.Match(
                orders => Ok(orders),
                errors => Problem(errors)
            );
        }

        [HttpGet]
        [Authorize(Roles = "Admin")] // Only admins can see all orders
        public async Task<IActionResult> GetAllOrders()
        {
            var query = new GetAllOrdersQuery();
            var result = await _mediator.Send(query);

            return result.Match(
                orders => Ok(orders),
                errors => Problem(errors)
            );
        }

        [HttpPut("{id:guid}/status")]
        [Authorize(Roles = "Admin,Seller,DeliveryBoy")]
        public async Task<IActionResult> UpdateOrderStatus(Guid id, UpdateOrderStatusRequest request)
        {
            var command = new UpdateOrderStatusCommand(id, request.Status);
            var result = await _mediator.Send(command);

            return result.Match(
                order => Ok(order),
                errors => Problem(errors)
            );
        }
    }
}
