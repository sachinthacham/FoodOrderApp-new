using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Favorites.Queries;

public record GetFavoritesByUserQuery(Guid UserId) : IRequest<ErrorOr<List<Favorite>>>;

public class GetFavoritesByUserQueryHandler : IRequestHandler<GetFavoritesByUserQuery, ErrorOr<List<Favorite>>>
{
    private readonly IFavoriteRepository _favoriteRepository;

    public GetFavoritesByUserQueryHandler(IFavoriteRepository favoriteRepository)
    {
        _favoriteRepository = favoriteRepository;
    }

    public async Task<ErrorOr<List<Favorite>>> Handle(GetFavoritesByUserQuery request, CancellationToken cancellationToken)
    {
        var favorites = await _favoriteRepository.GetByUserIdAsync(request.UserId);
        return favorites;
    }
}
