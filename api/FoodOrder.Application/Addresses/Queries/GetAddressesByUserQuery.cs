using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Addresses.Queries;

public record GetAddressesByUserQuery(Guid UserId) : IRequest<ErrorOr<List<Address>>>;

public class GetAddressesByUserQueryHandler : IRequestHandler<GetAddressesByUserQuery, ErrorOr<List<Address>>>
{
    private readonly IAddressRepository _addressRepository;

    public GetAddressesByUserQueryHandler(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<ErrorOr<List<Address>>> Handle(GetAddressesByUserQuery request, CancellationToken cancellationToken)
    {
        var addresses = await _addressRepository.GetByUserIdAsync(request.UserId);
        return addresses;
    }
}
