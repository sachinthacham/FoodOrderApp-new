import { useState } from "react";

type Order = {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  date: string;
};

export default function MyOrders() {
  // Dummy data for now (replace with API or Zustand later)
  const [orders] = useState<Order[]>([
    {
      id: "ORD-1001",
      items: [
        { name: "Margherita Pizza", qty: 1, price: 12.99 },
        { name: "Coke", qty: 2, price: 1.99 },
      ],
      total: 16.97,
      status: "Delivered",
      date: "2025-09-15",
    },
    {
      id: "ORD-1002",
      items: [{ name: "Cheeseburger", qty: 2, price: 9.99 }],
      total: 19.98,
      status: "Pending",
      date: "2025-09-19",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">🛍️ My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.qty} —{" "}
                    <span className="font-medium">${item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
