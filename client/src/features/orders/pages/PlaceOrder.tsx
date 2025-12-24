import { useState, useEffect } from "react";
import { useCartStore } from "../../../store/useCartStore";
import { useNavigate, Link } from "react-router-dom";
import { paymentService } from "../../payment/services/paymentService";
import { useAuthStore } from "@/store/useAuthStore";
import ProtectedRoute from "@/components/common/ProtectedRoute";

function PlaceOrderContent() {
  const { cart, subtotal, restaurantId, loadCart } = useCartStore();
  const { token, user } = useAuthStore();
  const navigate = useNavigate();

  // Load cart when component mounts
  useEffect(() => {
    if (token) {
      loadCart(token);
    }
  }, [token, loadCart]);

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address) {
      setError("Please provide a delivery address!");
      return;
    }

    if (!restaurantId) {
      setError("No restaurant selected!");
      return;
    }

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        restaurantId,
        items: cart.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
      };

      // Create Stripe checkout session
      const response = await paymentService.createCheckoutSession(
        orderData,
        token
      );

      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch (err: any) {
      setError(err.message || "Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Place Your Order 🛒</h2>
        <p className="text-gray-500 mb-4">
          Your cart is empty. Add items before placing an order.
        </p>
        <Link to="/" className="text-red-500 hover:underline">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Place Your Order 🛒</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              value={`${user?.firstName} ${user?.lastName}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              value={user?.email || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address *
            </label>
            <textarea
              placeholder="Enter your delivery address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading || !address}
            className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlaceOrder() {
  return (
    <ProtectedRoute allowedRoles={["Buyer"]}>
      <PlaceOrderContent />
    </ProtectedRoute>
  );
}
