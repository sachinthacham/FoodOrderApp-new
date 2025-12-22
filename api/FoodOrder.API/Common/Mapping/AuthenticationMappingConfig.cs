using FoodOrder.Application.Authentication.Commands.Register;
using FoodOrder.Application.Authentication.Queries.Login;
using FoodOrder.Application.Contracts.Authentication;
using FoodOrder.Application.Authentication.Common;
using Mapster;

namespace FoodOrder.API.Common.Mapping;

public class AuthenticationMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RegisterRequest, RegisterCommand>();
        config.NewConfig<LoginRequest, LoginQuery>();
        config.NewConfig<AuthenticationResult, AuthenticationResponse>()
           .Map(dest => dest.Id, src => src.User.Id)
           .Map(dest => dest.FirstName, src => src.User.FirstName)
           .Map(dest => dest.LastName, src => src.User.LastName)
           .Map(dest => dest.Email, src => src.User.Email)
           .Map(dest => dest.Role, src => src.User.Role)
           .Map(dest => dest.Token, src => src.Token);
    }
}