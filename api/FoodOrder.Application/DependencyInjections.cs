using Microsoft.Extensions.DependencyInjection;
using MediatR;
using FoodOrder.Application.Authentication.Commands.Register;
using FoodOrder.Application.Common.Behaviors;
using ErrorOr;
using FoodOrder.Application.Authentication.Common;



namespace FoodOrder.Application;

public static class DependencyInjections
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DependencyInjections).Assembly));
        services.AddScoped<IPipelineBehavior<RegisterCommand,ErrorOr<AuthenticationResult>>,ValidateRegisterCommandBehavior>();
        return services;
    }
}

