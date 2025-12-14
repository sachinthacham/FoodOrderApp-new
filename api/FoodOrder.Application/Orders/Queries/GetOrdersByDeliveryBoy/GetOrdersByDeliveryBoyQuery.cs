using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetOrdersByDeliveryBoy;

public record GetOrdersByDeliveryBoyQuery(Guid DeliveryBoyId) : IRequest<ErrorOr<List<OrderResult>>>;

