import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { paymentService } from "../../payment/services/paymentService";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import ProtectedRoute from "@/components/common/ProtectedRoute";

function OrderSuccessContent() {
  const [searchParams] = useSearchParams();
  
  const { token } = useAuthStore();
  const { clearCart } = useCartStore();

  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !token) {
        setError("Missing session information");
        setLoading(false);
        return;
      }

      try {
        const status = await paymentService.getSessionStatus(sessionId, token);
        setPaymentStatus(status.paymentStatus);

        if (status.paymentStatus === "paid") {
          // Clear cart after successful payment
          if (token) {
            await clearCart(token);
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to verify payment");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, token, clearCart]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <Link to="/order" className="text-red-500 hover:underline">
          ← Back to Order
        </Link>
      </div>
    );
  }

  if (paymentStatus === "paid") {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. Order ID:{" "}
            <span className="font-semibold">{orderId}</span>
          </p>
          <div className="space-y-4">
            <Link
              to="/my-orders"
              className="block w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Pending
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment is being processed. Please check back later.
        </p>
        <Link
          to="/my-orders"
          className="block w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <ProtectedRoute allowedRoles={["Buyer"]}>
      <OrderSuccessContent />
    </ProtectedRoute>
  );
}

