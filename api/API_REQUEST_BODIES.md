# API Request Bodies Reference

This document provides request body examples for all API endpoints.

---

## 🔐 Authentication Controller


### 1. Register User

**Endpoint:** `POST /auth/register`  
**Authentication:** Not required

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "role": "Buyer"
}
```

**Valid Role Values:**

- `"Buyer"` - Regular customer (default if not specified)
- `"Seller"` - Restaurant owner/seller
- `"DeliveryBoy"` - Delivery personnel
- `"Admin"` - System administrator

**Note:** If `role` is not provided, it defaults to `"Buyer"`.

---

### 2. Login

**Endpoint:** `POST /auth/login`  
**Authentication:** Not required

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** Returns JWT token (use in `Authorization: Bearer <token>` header for protected endpoints)

---

## 🍕 Restaurant Controller

### 1. Create Restaurant

**Endpoint:** `POST /restaurants`  
**Authentication:** Required (Admin or Seller role)

**Request Body:**

```json
{
  "name": "Pizza Palace",
  "description": "Authentic Italian pizza with fresh ingredients",
  "address": "123 Main Street, City, State 12345"
}
```

---

### 2. Get All Restaurants

**Endpoint:** `GET /restaurants`  
**Authentication:** Not required  
**Request Body:** None (query parameters only)

---

### 3. Get Restaurant by ID

**Endpoint:** `GET /restaurants/{id}`  
**Authentication:** Not required  
**Request Body:** None (ID in URL path)

**Example:** `GET /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e`

---

### 4. Update Restaurant

**Endpoint:** `PUT /restaurants/{id}`  
**Authentication:** Required (Admin or Seller role)

**Request Body:**

```json
{
  "name": "Pizza Palace - Updated",
  "description": "Authentic Italian pizza with fresh ingredients and new menu items",
  "address": "123 Main Street, City, State 12345"
}
```

**Example:** `PUT /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e`

---

### 5. Delete Restaurant

**Endpoint:** `DELETE /restaurants/{id}`  
**Authentication:** Required (Admin or Seller role)  
**Request Body:** None

**Example:** `DELETE /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e`

---

## 🍔 Menu Items Controller

### 1. Create Menu Item

**Endpoint:** `POST /restaurants/{restaurantId}/menu-items`  
**Authentication:** Required (Admin or Seller role)

**Request Body:**

```json
{
  "restaurantId": "85c573cc-eb53-41fd-9e3b-0e328e78428e",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato, mozzarella, and basil",
  "price": 12.99
}
```

**Example:** `POST /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e/menu-items`

**Note:** The `restaurantId` in the body must match the `restaurantId` in the URL path.

---

### 2. Get Menu Items by Restaurant

**Endpoint:** `GET /restaurants/{restaurantId}/menu-items`  
**Authentication:** Not required  
**Request Body:** None

**Example:** `GET /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e/menu-items`

---

### 3. Update Menu Item

**Endpoint:** `PUT /restaurants/{restaurantId}/menu-items/{id}`  
**Authentication:** Required (Admin or Seller role)

**Request Body:**

```json
{
  "name": "Margherita Pizza - Large",
  "description": "Classic pizza with tomato, mozzarella, and basil (Large size)",
  "price": 15.99
}
```

**Example:** `PUT /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e/menu-items/5d3f85f6-4567-4892-b9fc-3d963f77bfb7`

---

### 4. Delete Menu Item

**Endpoint:** `DELETE /restaurants/{restaurantId}/menu-items/{id}`  
**Authentication:** Required (Admin or Seller role)  
**Request Body:** None

**Example:** `DELETE /restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e/menu-items/5d3f85f6-4567-4892-b9fc-3d963f77bfb7`

---

## 📦 Orders Controller

### 1. Create Order

**Endpoint:** `POST /orders`  
**Authentication:** Required (JWT token)

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "restaurantId": "85c573cc-eb53-41fd-9e3b-0e328e78428e",
  "items": [
    {
      "menuItemId": "5d3f85f6-4567-4892-b9fc-3d963f77bfb7",
      "quantity": 2
    },
    {
      "menuItemId": "7a4f96f7-5678-5903-c0fd-4ea74f88cfc8",
      "quantity": 1
    }
  ]
}
```

**Note:** User ID is automatically extracted from the JWT token.

---

### 2. Get Order by ID

**Endpoint:** `GET /orders/{id}`  
**Authentication:** Required (JWT token)  
**Request Body:** None

**Example:** `GET /orders/123e4567-e89b-12d3-a456-426614174000`

---

### 3. Get My Orders

**Endpoint:** `GET /orders/my-orders`  
**Authentication:** Required (JWT token)  
**Request Body:** None

**Note:** Returns all orders for the authenticated user.

---

### 4. Get All Orders

**Endpoint:** `GET /orders`  
**Authentication:** Required (Admin role)  
**Request Body:** None

**Note:** Only admins can access this endpoint.

---

### 5. Update Order Status

**Endpoint:** `PUT /orders/{id}/status`  
**Authentication:** Required (Admin, Seller, or DeliveryBoy role)

**Request Body:**

```json
{
  "status": "Paid"
}
```

**Valid Status Values:**

- `"Pending"`
- `"Paid"`
- `"Preparing"`
- `"Ready"`
- `"Delivered"`
- `"Cancelled"`

**Example:** `PUT /orders/123e4567-e89b-12d3-a456-426614174000/status`

**Note:** Orders with status "Delivered" or "Cancelled" cannot be updated.

---

## 📝 Request Body Field Descriptions

### Authentication

- **firstName** (string, required, max 50 chars): User's first name
- **lastName** (string, required, max 50 chars): User's last name
- **email** (string, required, max 100 chars): User's email address (must be unique, valid email format)
- **password** (string, required, min 6 chars): User's password
- **role** (string, optional): User's role - "Buyer" (default), "Seller", "DeliveryBoy", or "Admin"

### Restaurant

- **name** (string, required, max 100 chars): Restaurant name
- **description** (string, required, max 500 chars): Restaurant description
- **address** (string, required, max 200 chars): Restaurant address

### Menu Item

- **restaurantId** (Guid, required): ID of the restaurant this item belongs to
- **name** (string, required, max 100 chars): Menu item name
- **description** (string, required, max 500 chars): Menu item description
- **price** (decimal, required, > 0): Menu item price

### Order

- **restaurantId** (Guid, required): ID of the restaurant
- **items** (array, required, min 1 item): Array of order items
  - **menuItemId** (Guid, required): ID of the menu item
  - **quantity** (int, required, > 0): Quantity of the item

### Order Status

- **status** (string, required): New status for the order
  - Valid values: "Pending", "Paid", "Preparing", "Ready", "Delivered", "Cancelled"

---

## 🔒 Authentication Notes

1. **JWT Token Format:** `Authorization: Bearer <token>`
2. **Token Extraction:** User ID is extracted from the `sub` claim in the JWT token
3. **Admin Role:** Some endpoints require the user to have "Admin" role
4. **Token Expiry:** Tokens expire after 60 minutes (configurable in appsettings.json)

---

## 📋 Common Response Formats

### Success Response (200 OK)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Example",
  ...
}
```

### Error Response (400/404/409/500)

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Error description",
  "status": 400,
  "traceId": "00-..."
}
```

### Validation Error Response (400 Bad Request)

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred",
  "status": 400,
  "errors": {
    "Name": ["The Name field is required."],
    "Price": ["Price must be greater than 0."]
  }
}
```

---

## 🧪 Example cURL Commands

### Register User

```bash
curl -X POST http://localhost:5182/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

### Create Order

```bash
curl -X POST http://localhost:5182/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "restaurantId": "85c573cc-eb53-41fd-9e3b-0e328e78428e",
    "items": [
      {
        "menuItemId": "5d3f85f6-4567-4892-b9fc-3d963f77bfb7",
        "quantity": 2
      }
    ]
  }'
```

### Create Menu Item

```bash
curl -X POST http://localhost:5182/restaurants/85c573cc-eb53-41fd-9e3b-0e328e78428e/menu-items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "restaurantId": "85c573cc-eb53-41fd-9e3b-0e328e78428e",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "price": 12.99
  }'
```

---

## 📌 Important Notes

1. **GUID Format:** All IDs are in GUID format (e.g., `85c573cc-eb53-41fd-9e3b-0e328e78428e`)
2. **Price Format:** Prices are decimal numbers (e.g., `12.99`, `15.50`)
3. **Quantity:** Must be a positive integer greater than 0
4. **Required Fields:** All fields marked as required must be provided
5. **String Lengths:** Respect maximum length constraints for string fields
6. **Status Transitions:** Order status can only be updated to valid values and cannot be changed once "Delivered" or "Cancelled"
