using ErrorOr;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FoodOrder.Application.Addresses.Commands;

public record CreateAddressCommand(
    Guid UserId,
    string Label,
    string Street,
    string City,
    string State,
    string ZipCode,
    string Country,
    bool IsDefault) : IRequest<ErrorOr<Address>>;

public class CreateAddressCommandHandler : IRequestHandler<CreateAddressCommand, ErrorOr<Address>>
{
    private readonly IAddressRepository _addressRepository;

    public CreateAddressCommandHandler(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<ErrorOr<Address>> Handle(CreateAddressCommand request, CancellationToken cancellationToken)
    {
        var address = new Address
        {
            UserId = request.UserId,
            Label = request.Label,
            Street = request.Street,
            City = request.City,
            State = request.State,
            ZipCode = request.ZipCode,
            Country = request.Country,
            IsDefault = request.IsDefault
        };

        await _addressRepository.AddAsync(address);

        return address;
    }
}
