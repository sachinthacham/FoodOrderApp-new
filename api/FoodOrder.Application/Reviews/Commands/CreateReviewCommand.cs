using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Reviews.Commands;

public record CreateReviewCommand(
    Guid UserId,
    Guid RestaurantId,
    Guid? MenuItemId,
    int Rating,
    string Comment) : IRequest<ErrorOr<Review>>;

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, ErrorOr<Review>>
{
    private readonly IReviewRepository _reviewRepository;

    public CreateReviewCommandHandler(IReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }

    public async Task<ErrorOr<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new Review
        {
            UserId = request.UserId,
            RestaurantId = request.RestaurantId,
            MenuItemId = request.MenuItemId,
            Rating = request.Rating,
            Comment = request.Comment,
            CreatedAt = DateTime.UtcNow
        };

        await _reviewRepository.AddAsync(review);

        return review;
    }
}
