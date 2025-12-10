using MediatR;
using ErrorOr;
using FoodOrder.Application.Carts.Common;

namespace FoodOrder.Application.Carts.Commands.RemoveItem;

public record RemoveCartItemCommand(
    Guid UserId,
    Guid CartItemId) : IRequest<ErrorOr<CartResult>>;

