using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using FoodOrder.API.Common.Http;

namespace FoodOrder.Api.Controllers;  

[ApiController]
public class ApiController : ControllerBase
{
    //why this method is protected? because we want to use it in derived classes like AuthenticationController
    //we don't want to expose it to the outside world
    //we want to return a list of errors and set the HttpContext.Items["errors"] to the list of errors
    //then we want to return a ProblemDetails response with the appropriate status code and title
    //this method is used in the AuthenticationController to return errors from the authentication service
    //this method is also used in other controllers to return errors from other services
    protected IActionResult Problem(List<Error> errors)
    {
        HttpContext.Items[HttpContextItemKeys.Errors] = errors;
        var firstError = errors[0];
        var statusCode = firstError.Type switch
        {
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };
        return Problem(statusCode: statusCode, title: firstError.Description);
    }
}