using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace FoodOrder.Api.Controllers;

[Route("payments")]
public class PaymentsController : ApiController
{
    public PaymentsController()
    {
    }

    [HttpPost("create-intent")]
    [Authorize]
    public IActionResult CreatePaymentIntent([FromBody] object request)
    {
        // This is a stub for Stripe/PayPal payment intent creation.
        // In a real enterprise app, this integrates with Stripe.NET or PayPal SDK
        var intentSecret = "pi_stub_" + Guid.NewGuid().ToString();

        return Ok(new { clientSecret = intentSecret });
    }
}
