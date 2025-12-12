using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Commands.UpdateStatus;

public record UpdateOrderStatusCommand(
    Guid Id,
    string Status,
    string UserRole,
    Guid? UserId = null) : IRequest<ErrorOr<OrderResult>>;

