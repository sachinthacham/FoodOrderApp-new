using Microsoft.EntityFrameworkCore;
using FoodOrder.Domain.Entities;
using FoodOrder.Domain.Common;

namespace FoodOrder.Infrastructure.Persistence
{
    public class FoodOrderDbContext : DbContext
    {
        public FoodOrderDbContext(DbContextOptions<FoodOrderDbContext> options)
            : base(options)
        {
        }

        // Add your DbSets here
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Restaurant> Restaurants { get; set; } = null!;
        public DbSet<MenuItem> MenuItems { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Cart> Carts { get; set; } = null!;
        public DbSet<CartItem> CartItems { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<Address> Addresses { get; set; } = null!;
        public DbSet<Favorite> Favorites { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure Order entity
            modelBuilder.Entity<Order>()
                .Property(o => o.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<OrderStatus>(v))
                .HasMaxLength(50);

            // Apply configurations from the assembly if you have specific configurations
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(FoodOrderDbContext).Assembly);

            // --- Manual Configuration Examples ---

            // 1. Restaurant -> MenuItems (One-to-Many)
            // modelBuilder.Entity<Restaurant>()
            //     .HasMany(r => r.MenuItems)
            //     .WithOne() // Assuming unidirectional for simplicity, or .WithOne(m => m.Restaurant)
            //     .HasForeignKey(m => m.RestaurantId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // // 2. Order -> OrderItems (One-to-Many)
            // modelBuilder.Entity<Order>()
            //     .HasMany(o => o.Items)
            //     .WithOne()
            //     .HasForeignKey(i => i.OrderId) // Ensure OrderItem has OrderId property if using FK
            //     .OnDelete(DeleteBehavior.Cascade);

            // // 3. User Configuration (if specific constraints needed)
            // modelBuilder.Entity<User>()
            //     .HasKey(u => u.Id);
            
            // modelBuilder.Entity<User>()
            //     .Property(u => u.Email)
            //     .IsRequired()
            //     .HasMaxLength(100);
        }
    }
}