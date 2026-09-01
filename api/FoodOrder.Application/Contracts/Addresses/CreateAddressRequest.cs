using System;

namespace FoodOrder.Application.Contracts.Addresses;

public record CreateAddressRequest(
    string Label,
    string Street,
    string City,
    string State,
    string ZipCode,
    string Country,
    bool IsDefault);
