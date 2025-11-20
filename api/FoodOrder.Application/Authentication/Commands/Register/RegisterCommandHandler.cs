using FoodOrder.Application.Common.interfaces.Authentication;
using FoodOrder.Application.Common.Interfaces.Persistence;
using FoodOrder.Application.Authentication.Common;
using FoodOrder.Domain.Common.Errors;
using FoodOrder.Domain.Entities;
using ErrorOr;
using MediatR;



namespace FoodOrder.Application.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }
    public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
        //01) validate the user doesn't already exist
        if (_userRepository.GetUserByEmail(command.Email) is not null)
        {
            return Errors.User.DuplicateEmail;
        }

        //02) create user(generate unique Id) & Persisi to the database
        var user = new User
        {
            FirstName = command.FirstName,
            LastName = command.LastName,
            Email = command.Email,
            Password = command.Password
        };
        _userRepository.Add(user);


        //03) create Jwt token

        var token = _jwtTokenGenerator.GenerateToken(user);
        return new AuthenticationResult(
           user,
            token
        );
    }
}