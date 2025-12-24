import type { Order } from "@/features/orders/services/orderService";

interface OrderTrackingProps {
  order: Order;
}

const ORDER_STATUSES = [
  {
    value: "PLACED",
    label: "Placed",
    icon: "📝",
    description: "Order placed by customer",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    icon: "✅",
    description: "Confirmed by restaurant",
  },
  {
    value: "PREPARING",
    label: "Preparing",
    icon: "👨‍🍳",
    description: "Order is being prepared",
  },
  {
    value: "READY",
    label: "Ready",
    icon: "🍽️",
    description: "Order is ready for pickup",
  },
  {
    value: "PICKED_UP",
    label: "Picked Up",
    icon: "📦",
    description: "Picked up by delivery person",
  },
  {
    value: "ON_THE_WAY",
    label: "On The Way",
    icon: "🚗",
    description: "On the way to you",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    icon: "🎉",
    description: "Order delivered",
  },
];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const currentStatusIndex = ORDER_STATUSES.findIndex(
    (status) => status.value === order.status.toUpperCase()
  );

  const getStatusColor = (index: number, currentIndex: number) => {
    if (index < currentIndex) {
      return "bg-green-500 text-white"; // Completed
    } else if (index === currentIndex) {
      return "bg-blue-500 text-white animate-pulse"; // Current
    } else {
      return "bg-gray-200 text-gray-500"; // Pending
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-6">Order Tracking</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {ORDER_STATUSES.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            

            return (
              <div key={status.value} className="relative flex items-start">
                {/* Status circle */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStatusColor(
                    index,
                    currentStatusIndex
                  )}`}
                >
                  {isCompleted ? "✓" : status.icon}
                </div>

                {/* Content */}
                <div className="ml-6 flex-1">
                  <div
                    className={`font-semibold ${
                      isCurrent
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {status.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {status.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
