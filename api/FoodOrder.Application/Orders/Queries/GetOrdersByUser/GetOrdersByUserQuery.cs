using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetOrdersByUser;

public record GetOrdersByUserQuery(Guid UserId) : IRequest<ErrorOr<List<OrderResult>>>;

