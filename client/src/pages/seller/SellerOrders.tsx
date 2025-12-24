import { useEffect, useState } from "react";
import { orderService } from "@/features/orders/services/orderService";
import type { Order } from "@/features/orders/services/orderService";
import { useAuthStore } from "@/store/useAuthStore";
import ProtectedRoute from "@/components/common/ProtectedRoute";


function SellerOrdersContent() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getSellerOrders(token);
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

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    if (!token) return;

    try {
      const updated = await orderService.updateStatus(
        orderId,
        newStatus,
        token
      );
      setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
    } catch (err: any) {
      setError(err.message || "Failed to update order status");
    }
  };

 

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
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Orders</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.orderDateTime).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-sm text-gray-600">
                      {item.name} × {item.quantity} - $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-bold text-lg">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  {order.status.toUpperCase() === "PLACED" && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Confirm Order
                    </button>
                  )}
                  {(order.status.toUpperCase() === "PREPARING" ||
                    order.status.toUpperCase() === "CONFIRMED") && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "READY")}
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    >
                      Mark Ready
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SellerOrders() {
  return (
    <ProtectedRoute allowedRoles={["Seller", "Admin"]}>
      <SellerOrdersContent />
    </ProtectedRoute>
  );
}
