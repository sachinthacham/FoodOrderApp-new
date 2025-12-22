using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Application.Common.interfaces.Authentication;
using FoodOrder.Application.Common.Interfaces.Persistence;
using FoodOrder.Application.Common.Interfaces.Services;
using FoodOrder.Infrastructure.Authentication;
using FoodOrder.Infrastructure.Persistence;
using FoodOrder.Infrastructure.Persistence.Repositories;
using FoodOrder.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FoodOrder.Infrastructure;

public static class DependencyInjections
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IDateTimeProvider,DateTimeProvider>();

        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        // 2. Add Persistence (Database)
        services.AddDbContext<FoodOrderDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

         // 3. Add Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRestaurantRepository, RestaurantRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IMenuItemRepository, MenuItemRepository>();
        services.AddScoped<ICartRepository, CartRepository>();

       
        
        return services;
    }
}

