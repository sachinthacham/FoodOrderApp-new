using FoodOrder.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodOrder.Application.common.Interfaces.Persistence;

public interface IAddressRepository
{
    Task AddAsync(Address address);
    Task<List<Address>> GetByUserIdAsync(Guid userId);
}
