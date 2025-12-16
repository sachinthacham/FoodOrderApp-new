using MediatR;
using ErrorOr;
using FoodOrder.Application.Users.Common;

namespace FoodOrder.Application.Users.Queries.GetAllUsers;

public record GetAllUsersQuery() : IRequest<ErrorOr<List<UserResult>>>;

