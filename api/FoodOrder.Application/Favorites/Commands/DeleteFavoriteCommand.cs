using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Favorites.Commands;

public record DeleteFavoriteCommand(
    Guid UserId,
    Guid RestaurantId) : IRequest<ErrorOr<Success>>;

public class DeleteFavoriteCommandHandler : IRequestHandler<DeleteFavoriteCommand, ErrorOr<Success>>
{
    private readonly IFavoriteRepository _favoriteRepository;

    public DeleteFavoriteCommandHandler(IFavoriteRepository favoriteRepository)
    {
        _favoriteRepository = favoriteRepository;
    }

    public async Task<ErrorOr<Success>> Handle(DeleteFavoriteCommand request, CancellationToken cancellationToken)
    {
        await _favoriteRepository.DeleteAsync(request.UserId, request.RestaurantId);
        return Result.Success;
    }
}
