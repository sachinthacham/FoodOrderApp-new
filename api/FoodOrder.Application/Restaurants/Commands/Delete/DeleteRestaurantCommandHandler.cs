using ErrorOr;
using MediatR;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Application.Restaurants.Commands.Delete;
using FoodOrder.Domain.Common.Errors;

namespace FoodOrder.Application.Restaurants.Commands.Delete;

public class DeleteRestaurantCommandHandler : IRequestHandler<DeleteRestaurantCommand, ErrorOr<Deleted>>
{
    private readonly IRestaurantRepository _restaurantRepository;

    public DeleteRestaurantCommandHandler(IRestaurantRepository restaurantRepository)
    {
        _restaurantRepository = restaurantRepository;
    }

    public async Task<ErrorOr<Deleted>> Handle(DeleteRestaurantCommand request, CancellationToken cancellationToken)
    {
        var restaurant = await _restaurantRepository.GetByIdAsync(request.Id);
        if (restaurant is null)
        {
            return Errors.Restaurant.NotFound;
        }

        await _restaurantRepository.DeleteAsync(restaurant);
        return new Deleted();
    }
}

