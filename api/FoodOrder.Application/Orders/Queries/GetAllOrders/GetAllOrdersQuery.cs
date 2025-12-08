using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetAllOrders;

public record GetAllOrdersQuery() : IRequest<ErrorOr<List<OrderResult>>>;

