using MediatR;
using ErrorOr;

namespace FoodOrder.Application.Restaurants.Commands.Delete;

public record DeleteRestaurantCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;

public record Deleted;

