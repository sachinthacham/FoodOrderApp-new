// Application/Carts/Commands/AddItem/AddCartItemCommand.cs
using MediatR;
using ErrorOr;
using FoodOrder.Application.Carts.Common;

namespace FoodOrder.Application.Carts.Commands.AddItem;

public record AddCartItemCommand(
    Guid UserId,
    Guid MenuItemId,  // Only need menuItemId!
    int Quantity) : IRequest<ErrorOr<CartResult>>;