namespace FoodOrder.Domain.Common;

public static class UserRole
{
    public const string Admin = "Admin";
    public const string Seller = "Seller";
    public const string Buyer = "Buyer";
    public const string DeliveryBoy = "DeliveryBoy";

    public static readonly string[] AllRoles = { Admin, Seller, Buyer, DeliveryBoy };

    public static bool IsValidRole(string role)
    {
        return AllRoles.Contains(role);
    }
}

