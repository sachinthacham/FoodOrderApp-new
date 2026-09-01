using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodOrder.Infrastructure.Persistence.Repositories;

public class AddressRepository : IAddressRepository
{
    private readonly FoodOrderDbContext _dbContext;

    public AddressRepository(FoodOrderDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Address address)
    {
        // If this is set as default, we might want to unset others, but keeping it simple for now
        await _dbContext.Addresses.AddAsync(address);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Address>> GetByUserIdAsync(Guid userId)
    {
        return await _dbContext.Addresses
            .Where(a => a.UserId == userId)
            .ToListAsync();
    }
}
