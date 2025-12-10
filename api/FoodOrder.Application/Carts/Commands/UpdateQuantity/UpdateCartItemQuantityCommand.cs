using MediatR;
using ErrorOr;
using FoodOrder.Application.Carts.Common;

namespace FoodOrder.Application.Carts.Commands.UpdateQuantity;

public record UpdateCartItemQuantityCommand(
    Guid UserId,
    Guid CartItemId,
    int Quantity) : IRequest<ErrorOr<CartResult>>;

