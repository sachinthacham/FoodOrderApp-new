using MediatR;
using ErrorOr;
using FoodOrder.Application.Carts.Common;

namespace FoodOrder.Application.Carts.Queries.GetCart;

public record GetCartQuery(Guid UserId) : IRequest<ErrorOr<CartResult>>;

