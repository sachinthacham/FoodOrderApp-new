using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Favorites.Commands;

public record CreateFavoriteCommand(
    Guid UserId,
    Guid RestaurantId) : IRequest<ErrorOr<Favorite>>;

public class CreateFavoriteCommandHandler : IRequestHandler<CreateFavoriteCommand, ErrorOr<Favorite>>
{
    private readonly IFavoriteRepository _favoriteRepository;

    public CreateFavoriteCommandHandler(IFavoriteRepository favoriteRepository)
    {
        _favoriteRepository = favoriteRepository;
    }

    public async Task<ErrorOr<Favorite>> Handle(CreateFavoriteCommand request, CancellationToken cancellationToken)
    {
        var favorite = new Favorite
        {
            UserId = request.UserId,
            RestaurantId = request.RestaurantId,
            CreatedAt = DateTime.UtcNow
        };

        await _favoriteRepository.AddAsync(favorite);

        return favorite;
    }
}
