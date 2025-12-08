import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  items: { name: string; qty: number }[];
  total: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  date: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "John Doe",
      items: [
        { name: "Margherita Pizza", qty: 2 },
        { name: "Coke", qty: 1 },
      ],
      total: 29.97,
      status: "Pending",
      date: "2025-09-18",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: [{ name: "Cheeseburger", qty: 1 }],
      total: 9.99,
      status: "Delivered",
      date: "2025-09-19",
    },
  ]);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">📑 Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3 text-sm text-gray-600">
                  {order.items.map((i, idx) => (
                    <div key={idx}>
                      {i.name} × {i.qty}
                    </div>
                  ))}
                </td>
                <td className="p-3">${order.total.toFixed(2)}</td>
                <td className="p-3">
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
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "Delivered")}
                    className="text-green-600 hover:text-green-800"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "Cancelled")}
                    className="text-red-600 hover:text-red-800"
                  >
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
