using ErrorOr;
using FluentValidation;
using MediatR;

namespace FoodOrder.Application.Common.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any())
        {
            return await next();
        }

        var context = new ValidationContext<TRequest>(request);

        var validationResults = await Task.WhenAll(
            _validators.Select(v => v.ValidateAsync(context, cancellationToken)));

        var failures = validationResults
            .Where(r => r.Errors.Any())
            .SelectMany(r => r.Errors)
            .ToList();

        if (failures.Any())
        {
            // Check if TResponse is ErrorOr<T>
            if (typeof(TResponse).IsGenericType && 
                typeof(TResponse).GetGenericTypeDefinition() == typeof(ErrorOr<>))
            {
                var errors = failures
                    .Select(f => Error.Validation(
                        code: f.PropertyName,
                        description: f.ErrorMessage))
                    .ToList();

                // Use ErrorOr.From method
                var fromMethod = typeof(IErrorOr)
                    .GetMethods()
                    .FirstOrDefault(m => m.Name == "From" && m.GetParameters().Length == 1 && 
                                        m.GetParameters()[0].ParameterType == typeof(List<Error>));

                if (fromMethod != null)
                {
                    var errorOrType = typeof(TResponse).GetGenericArguments()[0];
                    var genericFromMethod = fromMethod.MakeGenericMethod(errorOrType);
                    var result = genericFromMethod.Invoke(null, new object[] { errors });
                    
                    if (result is TResponse response)
                    {
                        return response;
                    }
                }
            }

            throw new ValidationException(failures);
        }

        return await next();
    }
}
