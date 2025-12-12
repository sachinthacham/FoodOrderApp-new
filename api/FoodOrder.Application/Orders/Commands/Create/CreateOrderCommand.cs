using MediatR;
using ErrorOr;
using FoodOrder.Application.Orders.Common;

namespace FoodOrder.Application.Orders.Commands.Create
{
    public record CreateOrderCommand(
        Guid UserId,
        Guid RestaurantId,
        List<OrderItemCommand> Items) : IRequest<ErrorOr<OrderResult>>;

    public record OrderItemCommand(Guid MenuItemId, int Quantity);
}
