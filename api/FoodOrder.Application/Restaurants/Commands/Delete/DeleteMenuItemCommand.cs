using MediatR;
using ErrorOr;
using FoodOrder.Application.Restaurants.Commands.Delete;

namespace FoodOrder.Application.Restaurants.Commands.Delete;

public record DeleteMenuItemCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;

