using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Queries.GetOrdersBySeller;

public record GetOrdersBySellerQuery(Guid SellerId) : IRequest<ErrorOr<List<OrderResult>>>;

