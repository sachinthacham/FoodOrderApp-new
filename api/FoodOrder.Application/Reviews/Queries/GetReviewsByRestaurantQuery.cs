using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Reviews.Queries;

public record GetReviewsByRestaurantQuery(Guid RestaurantId) : IRequest<ErrorOr<List<Review>>>;

public class GetReviewsByRestaurantQueryHandler : IRequestHandler<GetReviewsByRestaurantQuery, ErrorOr<List<Review>>>
{
    private readonly IReviewRepository _reviewRepository;

    public GetReviewsByRestaurantQueryHandler(IReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }

    public async Task<ErrorOr<List<Review>>> Handle(GetReviewsByRestaurantQuery request, CancellationToken cancellationToken)
    {
        var reviews = await _reviewRepository.GetByRestaurantIdAsync(request.RestaurantId);
        return reviews;
    }
}
