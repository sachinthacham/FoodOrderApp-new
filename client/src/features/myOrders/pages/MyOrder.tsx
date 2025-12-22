import { useEffect, useState } from "react";
import { orderService } from "@/features/orders/services/orderService";
import type { Order } from "@/features/orders/services/orderService";
import { useAuthStore } from "@/store/useAuthStore";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import OrderTracking from "@/components/orders/OrderTracking";

function MyOrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders(token);
        setOrders(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "PREPARING":
        return "bg-purple-100 text-purple-700";
      case "READY":
        return "bg-indigo-100 text-indigo-700";
      case "PICKED_UP":
        return "bg-orange-100 text-orange-700";
      case "ON_THE_WAY":
        return "bg-cyan-100 text-cyan-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">🛍️ My Orders</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't placed any orders yet.
          </p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">
                  Order #{order.id.slice(0, 8)}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>

              {/* Order Tracking Timeline */}
              <OrderTracking order={order} />

              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-bold text-lg">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyOrders() {
  return (
    <ProtectedRoute>
      <MyOrdersContent />
    </ProtectedRoute>
  );
}
