using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetOrder;

public record GetOrderQuery(Guid Id, Guid? UserId = null) : IRequest<ErrorOr<OrderResult>>;

