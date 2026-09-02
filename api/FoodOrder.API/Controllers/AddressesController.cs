using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using FoodOrder.Application.Contracts.Addresses;
using FoodOrder.Application.Addresses.Commands;
using FoodOrder.Application.Addresses.Queries;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace FoodOrder.Api.Controllers;

[Route("addresses")]
public class AddressesController : ApiController
{
    private readonly ISender _mediator;

    public AddressesController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAddress([FromBody] CreateAddressRequest request)
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var command = new CreateAddressCommand(
            userId,
            request.Label,
            request.Street,
            request.City,
            request.State,
            request.ZipCode,
            request.Country,
            request.IsDefault);

        var result = await _mediator.Send(command);

        return result.Match(
            address => Ok(address),
            errors => Problem(errors)
        );
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetMyAddresses()
    {
        var userIdString = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var query = new GetAddressesByUserQuery(userId);
        var result = await _mediator.Send(query);

        return result.Match(
            addresses => Ok(addresses),
            errors => Problem(errors)
        );
    }
}
