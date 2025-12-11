using ErrorOr;
using MediatR;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Application.Carts.Common;
using FoodOrder.Domain.Common.Errors;

namespace FoodOrder.Application.Carts.Commands.ClearCart;

public class ClearCartCommandHandler : IRequestHandler<ClearCartCommand, ErrorOr<CartResult>>
{
    private readonly ICartRepository _cartRepository;

    public ClearCartCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<ErrorOr<CartResult>> Handle(ClearCartCommand request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetByUserIdAsync(request.UserId);
        if (cart is null)
        {
            // Return empty cart
            return new CartResult(
                Guid.Empty,
                request.UserId,
                Guid.Empty,
                DateTime.UtcNow,
                DateTime.UtcNow,
                new List<CartItemResult>());
        }

        cart.Items.Clear();
        await _cartRepository.UpdateAsync(cart);

        return new CartResult(
            cart.Id,
            cart.UserId,
            cart.RestaurantId,
            cart.CreatedAt,
            cart.UpdatedAt,
            new List<CartItemResult>());
    }
}

