using Microsoft.Extensions.DependencyInjection;
using MediatR;
using FoodOrder.Application.Common.Behaviors;
using FluentValidation;
using System.Reflection;

namespace FoodOrder.Application;

public static class DependencyInjections
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DependencyInjections).Assembly));
        
        // Add FluentValidation validators
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        // Add generic validation behavior for ErrorOr responses
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        
        return services;
    }
}

