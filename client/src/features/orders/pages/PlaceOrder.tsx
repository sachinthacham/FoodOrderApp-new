import { useState, useEffect } from "react";
import { useCartStore } from "../../../store/useCartStore";
import { useNavigate, Link } from "react-router-dom";
import { paymentService } from "../../payment/services/paymentService";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "@/store/useToastStore";
import { findPromoCode, getPromoDiscount, getPromoDeliveryFee } from "@/lib/promoCodes";
import { Tag } from "lucide-react";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const TAX_RATE = 0.08;

function PlaceOrderContent() {
  const { cart, subtotal, restaurantId, loadCart, promoCode } = useCartStore();
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

  const appliedPromo = promoCode ? findPromoCode(promoCode) : null;
  const baseDeliveryFee = cart.length > 0 ? 5 : 0;
  const deliveryFee = getPromoDeliveryFee(appliedPromo, baseDeliveryFee);
  const discount = getPromoDiscount(appliedPromo, subtotal);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  const handlePlaceOrder = async () => {
    if (!address) {
      setError("Please provide a delivery address!");
      toast.error("Please provide a delivery address");
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
      const message = err.message || "Failed to initiate payment. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 flex flex-col items-center">
        <div className="glass-card rounded-[2rem] p-16 text-center max-w-2xl w-full mx-auto border border-slate-200 dark:border-slate-800 animate-fade-in-up">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Checkout Unavailable</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
            Your cart is empty. Please add some delicious items from our partner restaurants before placing an order.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-red-500 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5 transition-all w-full sm:w-auto"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 animate-fade-in-down">
          <Link to="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>Back to Cart</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="bg-red-500 text-white p-2 rounded-xl shadow-lg shadow-red-500/30">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
               Checkout
             </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-2 pl-12 text-lg font-light">
            Complete your order delivery details
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 glass-card border-red-500/20 bg-red-50/50 dark:bg-red-900/10 rounded-2xl flex items-start gap-4 text-red-600 animate-shake shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
            <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold text-red-700 dark:text-red-400 text-lg">Action Required</h3>
              <p className="text-sm font-medium mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Delivery Details Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-8 relative">
                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold">1</span>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Delivery Information</h3>
              </div>

              <div className="space-y-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-xl text-slate-500 cursor-not-allowed font-medium"
                        value={`${user?.firstName} ${user?.lastName}`}
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-xl text-slate-500 cursor-not-allowed font-medium"
                        value={user?.email || ""}
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex border-b border-slate-100 dark:border-slate-800 my-6"></div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex justify-between">
                    <span>Delivery Address <span className="text-red-500">*</span></span>
                  </label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <textarea
                      placeholder="Enter your complete delivery address (Apt, Suite, Floor, etc.)"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white min-h-[120px] shadow-inner"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[420px]">
            <div className="glass-card bg-slate-900 text-white rounded-[2rem] p-8 border border-slate-800 sticky top-32 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 border border-slate-700 pointer-events-none">
                    <span className="font-bold text-sm">2</span>
                 </div>
                 <h3 className="text-2xl font-bold">Payment Setup</h3>
              </div>

              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar mb-6 bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm group">
                    <span className="font-light text-slate-300">
                      <span className="font-semibold text-slate-100">{item.quantity}x</span> {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {appliedPromo && (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 mb-6 text-green-400 text-sm font-semibold">
                  <Tag className="w-4 h-4 shrink-0" />
                  {appliedPromo.code} applied — {appliedPromo.description}
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-slate-300 text-sm font-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-400 text-sm font-light">
                    <span>Promo discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-slate-300 text-sm font-light">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-white">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 text-sm font-light">
                  <span>Tax (8%)</span>
                  <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-700/80 my-6 border-dashed"></div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="block text-sm text-slate-400 mb-1">Total to Pay</span>
                  <span className="text-4xl font-extrabold text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || !address}
                className="group relative w-full flex items-center justify-center bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-500/30 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all overflow-hidden shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {!loading && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Session...
                    </>
                  ) : (
                    <>
                      Proceed to Secure Payment
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                Payments processed securely by Stripe
              </div>
            </div>
          </div>
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
