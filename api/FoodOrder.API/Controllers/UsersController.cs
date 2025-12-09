using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Users.Queries.GetAllUsers;
using FoodOrder.Api.Controllers;
using ErrorOr;

namespace FoodOrder.Api.Controllers;

[Route("users")]
[Authorize(Roles = "Admin")]
public class UsersController : ApiController
{
    private readonly ISender _mediator;

    public UsersController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var query = new GetAllUsersQuery();
        var result = await _mediator.Send(query);

        return result.Match(
            users => Ok(users),
            errors => Problem(errors)
        );
    }
}

