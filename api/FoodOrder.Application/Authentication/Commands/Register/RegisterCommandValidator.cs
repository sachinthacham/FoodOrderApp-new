using FluentValidation;
using FoodOrder.Domain.Common;

namespace FoodOrder.Application.Authentication.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(50);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(100);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        RuleFor(x => x.Role)
            .Must(UserRole.IsValidRole)
            .WithMessage($"Role must be one of: {string.Join(", ", UserRole.AllRoles)}")
            .When(x => !string.IsNullOrEmpty(x.Role));
    }
}