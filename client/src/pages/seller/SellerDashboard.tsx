import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  restaurantService,
  
} from "@/features/restaurant/services/restaurantService";
import type {
 
  Restaurant,
} from "@/features/restaurant/services/restaurantService";
import { orderService } from "@/features/orders/services/orderService";
import type{  Order } from "@/features/orders/services/orderService";
import { useAuthStore } from "@/store/useAuthStore";
import ProtectedRoute from "@/components/common/ProtectedRoute";

function SellerDashboardContent() {
  const { token } = useAuthStore();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [restaurantsData, ordersData] = await Promise.all([
          restaurantService.getMyRestaurants(token),
          orderService.getSellerOrders(token),
        ]);
        setRestaurants(restaurantsData);
        setOrders(ordersData);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending" || o.status === "Paid"
  );
  const totalRevenue = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Seller Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Total Restaurants</h3>
          <p className="text-3xl font-bold text-red-500">
            {restaurants.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingOrders.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-500">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            to="/seller/restaurants"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Manage Restaurants
          </Link>
          <Link
            to="/seller/orders"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.orderDateTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SellerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["Seller", "Admin"]}>
      <SellerDashboardContent />
    </ProtectedRoute>
  );
}
