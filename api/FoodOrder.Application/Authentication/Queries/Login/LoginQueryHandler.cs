using FoodOrder.Application.Common.interfaces.Authentication;
using FoodOrder.Application.Common.Interfaces.Persistence;
using FoodOrder.Application.Authentication.Common;
using FoodOrder.Domain.Common.Errors;
using FoodOrder.Domain.Entities;
using ErrorOr;
using MediatR;



namespace FoodOrder.Application.Authentication.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }
    public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
        //01) validate the user exists
        if (_userRepository.GetUserByEmail(query.Email) is not User user)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        //02) validate the password is correct
        if(user.Password != query.Password)
        {
            return new[] { Errors.Authentication.InvalidCredentials };
        }

        //03) create Jwt token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(
           user,
            token
        );
    }
}