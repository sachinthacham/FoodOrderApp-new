using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetAvailableOrders;

public record GetAvailableOrdersQuery() : IRequest<ErrorOr<List<OrderResult>>>;

