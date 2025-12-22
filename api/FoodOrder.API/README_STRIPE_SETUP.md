# Stripe Payment Gateway Setup Guide

## Backend Setup

### 1. Install Stripe NuGet Package
The Stripe.net package has been added to `FoodOrder.API.csproj`. Run:
```bash
dotnet restore
```

### 2. Configure Stripe Keys
Update `appsettings.json` with your Stripe keys:

```json
{
  "Stripe": {
    "PublishableKey": "pk_test_your_publishable_key_here",
    "SecretKey": "sk_test_your_secret_key_here",
    "WebhookSecret": "whsec_your_webhook_secret_here"
  },
  "FrontendUrl": "http://localhost:5173"
}
```

**To get your Stripe keys:**
1. Sign up at https://stripe.com
2. Go to Developers > API keys
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 3. Set Up Webhook (For Production)
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/payment/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook signing secret (starts with `whsec_`)

**For local testing**, use Stripe CLI:
```bash
stripe listen --forward-to localhost:5182/payment/webhook
```
This will give you a webhook secret to use in development.

## Frontend Setup

### 1. No Additional Packages Required
The frontend uses Stripe Checkout (hosted by Stripe), so no additional packages are needed.

### 2. Environment Variables (Optional)
If you want to use environment variables for the API URL, create `.env`:
```
VITE_API_URL=http://localhost:5182
```

## Testing

### Test Cards
Use these test card numbers in Stripe Checkout:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

### Flow
1. User adds items to cart
2. User goes to `/order` page
3. User enters delivery address
4. User clicks "Proceed to Payment"
5. User is redirected to Stripe Checkout
6. User completes payment
7. User is redirected to `/order-success`
8. Cart is cleared automatically

## API Endpoints

### POST `/payment/create-checkout-session`
Creates a Stripe checkout session and returns the checkout URL.

**Request:**
```json
{
  "restaurantId": "guid",
  "items": [
    {
      "menuItemId": "guid",
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/...",
  "orderId": "guid"
}
```

### GET `/payment/session-status?sessionId=xxx`
Gets the payment status of a checkout session.

**Response:**
```json
{
  "status": "paid",
  "paymentStatus": "paid",
  "customerEmail": "customer@example.com"
}
```

### POST `/payment/webhook`
Stripe webhook endpoint for payment events (handled automatically by Stripe).

## Troubleshooting

1. **500 Error on checkout creation**: Check that Stripe keys are configured correctly
2. **Webhook not working**: Ensure webhook secret matches and endpoint is accessible
3. **Cart not clearing**: Check that payment status is "paid" before clearing

