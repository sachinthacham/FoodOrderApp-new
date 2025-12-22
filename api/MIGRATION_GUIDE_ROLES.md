# Migration Guide: Adding User Roles

This guide explains how to add the Role column to the existing User table in the database.

## Steps to Apply Migration

### 1. Create a New Migration

Run the following command in the `api/FoodOrder.Infrastructure` directory:

```bash
dotnet ef migrations add AddUserRole --project ../FoodOrder.Infrastructure/FoodOrder.Infrastructure.csproj --startup-project ../FoodOrder.API/FoodOrder.API.csproj
```

### 2. Review the Migration

The migration will be created in `api/FoodOrder.Infrastructure/Migrations/`. Review the generated migration file to ensure it:

- Adds the `Role` column to the `Users` table
- Sets a default value of "Buyer" for existing users
- Makes the column NOT NULL

### 3. Apply the Migration

Run the following command to apply the migration to your database:

```bash
dotnet ef database update --project ../FoodOrder.Infrastructure/FoodOrder.Infrastructure.csproj --startup-project ../FoodOrder.API/FoodOrder.API.csproj
```

## Manual SQL Script (Alternative)

If you prefer to run the migration manually, use this SQL script:

```sql
-- Add Role column to Users table
ALTER TABLE Users
ADD Role NVARCHAR(50) NOT NULL DEFAULT 'Buyer';

-- Update existing users to have Buyer role (if needed)
UPDATE Users
SET Role = 'Buyer'
WHERE Role IS NULL OR Role = '';
```

## Role-Based Access Control

After migration, the following roles are available:

### **Buyer** (Default)

- Can place orders
- Can view their own orders
- Cannot manage restaurants or menu items

### **Seller**

- All Buyer permissions
- Can create/update/delete restaurants
- Can create/update/delete menu items
- Can update order status

### **DeliveryBoy**

- Can view orders
- Can update order status (to track delivery)
- Cannot create or modify restaurants/menu items

### **Admin**

- Full system access
- Can view all orders
- Can manage all restaurants and menu items
- Can manage users (if user management is implemented)

## Testing Roles

### Register as Buyer (Default)

```json
POST /auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "buyer@example.com",
  "password": "Password123!"
}
```

### Register as Seller

```json
POST /auth/register
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "seller@example.com",
  "password": "Password123!",
  "role": "Seller"
}
```

### Register as DeliveryBoy

```json
POST /auth/register
{
  "firstName": "Bob",
  "lastName": "Johnson",
  "email": "delivery@example.com",
  "password": "Password123!",
  "role": "DeliveryBoy"
}
```

## Endpoint Access by Role

| Endpoint                                 | Buyer | Seller | DeliveryBoy | Admin |
| ---------------------------------------- | ----- | ------ | ----------- | ----- |
| POST /orders                             | ✅    | ✅     | ✅          | ✅    |
| GET /orders/my-orders                    | ✅    | ✅     | ✅          | ✅    |
| GET /orders/{id}                         | ✅    | ✅     | ✅          | ✅    |
| GET /orders                              | ❌    | ❌     | ❌          | ✅    |
| PUT /orders/{id}/status                  | ❌    | ✅     | ✅          | ✅    |
| POST /restaurants                        | ❌    | ✅     | ❌          | ✅    |
| PUT /restaurants/{id}                    | ❌    | ✅     | ❌          | ✅    |
| DELETE /restaurants/{id}                 | ❌    | ✅     | ❌          | ✅    |
| POST /restaurants/{id}/menu-items        | ❌    | ✅     | ❌          | ✅    |
| PUT /restaurants/{id}/menu-items/{id}    | ❌    | ✅     | ❌          | ✅    |
| DELETE /restaurants/{id}/menu-items/{id} | ❌    | ✅     | ❌          | ✅    |

## JWT Token Claims

After registration/login, the JWT token now includes:

- `sub`: User ID
- `given_name`: First Name
- `family_name`: Last Name
- `role`: User Role (for authorization)
- `jti`: JWT ID

The role claim is used by `[Authorize(Roles = "...")]` attributes in controllers.

## Troubleshooting

### Issue: "Invalid role" error during registration

**Solution:** Ensure the role value is exactly one of: "Buyer", "Seller", "DeliveryBoy", or "Admin" (case-sensitive).

### Issue: Existing users don't have roles

**Solution:** Run the migration or SQL script to add the Role column with default value "Buyer".

### Issue: Authorization fails even with correct role

**Solution:**

1. Ensure the JWT token includes the role claim
2. Log out and log back in to get a new token with the role claim
3. Check that the role in the token matches exactly (case-sensitive)
