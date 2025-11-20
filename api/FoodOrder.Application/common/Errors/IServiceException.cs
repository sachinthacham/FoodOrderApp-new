using System.Net;

namespace FoodOrder.Application.Common.Errors;

public interface IServiceException
{
    public HttpStatusCode StatusCode { get; }
    public string ErrorMessage { get; }
    
}