using MediatR;
using ErrorOr;
using FoodOrder.Application.Carts.Common;

namespace FoodOrder.Application.Carts.Commands.ClearCart;

public record ClearCartCommand(Guid UserId) : IRequest<ErrorOr<CartResult>>;

