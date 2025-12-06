using MediatR;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Entities;

namespace FoodOrder.Application.Orders.Commands.Create
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Order>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRestaurantRepository _restaurantRepository;

        public CreateOrderCommandHandler(IOrderRepository orderRepository, IRestaurantRepository restaurantRepository)
        {
            _orderRepository = orderRepository;
            _restaurantRepository = restaurantRepository;
        }

        public async Task<Order> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            // 1. Fetch Restaurant to validate items and prices
            var restaurant = await _restaurantRepository.GetByIdAsync(request.RestaurantId);
            if (restaurant is null) throw new Exception("Restaurant not found"); // Use custom error handling here

            var order = new Order
            {
                UserId = request.UserId,
                RestaurantId = request.RestaurantId,
                OrderDateTime = DateTime.UtcNow,
                Status = "Pending"
            };

            foreach (var itemCommand in request.Items)
            {
                var menuItem = restaurant.MenuItems.FirstOrDefault(m => m.Id == itemCommand.MenuItemId);
                if (menuItem is not null)
                {
                    order.Items.Add(new OrderItem
                    {
                        MenuItemId = menuItem.Id,
                        Name = menuItem.Name,
                        Price = menuItem.Price,
                        Quantity = itemCommand.Quantity
                    });
                }
            }

            order.TotalAmount = order.Items.Sum(i => i.Price * i.Quantity);

            await _orderRepository.AddAsync(order);
            return order;
        }
    }
}
