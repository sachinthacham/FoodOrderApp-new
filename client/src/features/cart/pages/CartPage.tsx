// src/pages/CartPage.tsx
import { useCartStore } from "../../../store/useCartStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "@/store/useToastStore";
import { findPromoCode, getPromoDiscount, getPromoDeliveryFee, type PromoCode } from "@/lib/promoCodes";
import { Tag, X } from "lucide-react";

const TAX_RATE = 0.08;

export default function CartPage() {
  const {
    cart,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    loadCart,
    promoCode,
    setPromoCode,
  } = useCartStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      loadCart(token);
    }
  }, [token, loadCart]);

  const [promoInput, setPromoInput] = useState("");
  const appliedPromo: PromoCode | null = promoCode ? findPromoCode(promoCode) : null;

  const handleApplyPromo = () => {
    const promo = findPromoCode(promoInput);
    if (!promo) {
      toast.error("That promo code isn't valid");
      return;
    }
    setPromoCode(promo.code);
    toast.success(`Promo "${promo.code}" applied`);
  };

  const baseDeliveryFee = cart.length > 0 ? 5 : 0;
  const deliveryFee = getPromoDeliveryFee(appliedPromo, baseDeliveryFee);
  const discount = getPromoDiscount(appliedPromo, subtotal);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 animate-fade-in-down">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>Continue Browsing</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Cart
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card rounded-[2rem] p-16 text-center animate-fade-in-up border border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious meals yet. Explore our menu to find your next favorite dish.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                  {cart.map((item, index) => (
                    <div
                      key={item._id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 ${index !== cart.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative group">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <span className="text-3xl text-slate-400 dark:text-slate-500 font-bold group-hover:scale-110 transition-transform duration-500">
                              {item.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-red-500 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-red-500 font-bold text-lg mb-3 block sm:hidden">${item.price.toFixed(2)}</p>
                          
                          {/* Quantity Controls Mobile */}
                          <div className="flex sm:hidden items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full w-fit">
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-slate-700 dark:text-white shadow-sm disabled:opacity-50"
                              disabled={!token}
                              onClick={() => token && decreaseQuantity(item.id, token).catch((err: any) => toast.error(err.message || "Failed to update quantity"))}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                            </button>
                            <span className="w-8 text-center font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-slate-700 dark:text-white shadow-sm disabled:opacity-50"
                              disabled={!token}
                              onClick={() => token && increaseQuantity(item.id, token).catch((err: any) => toast.error(err.message || "Failed to update quantity"))}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-8 pl-14 sm:pl-0">
                        <p className="text-slate-900 dark:text-white font-bold text-lg w-20 text-right">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white hover:shadow-sm transition-all disabled:opacity-50"
                            disabled={!token}
                            onClick={() => token && decreaseQuantity(item.id, token).catch((err: any) => toast.error(err.message || "Failed to update quantity"))}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                          </button>
                          <span className="w-8 text-center font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white hover:shadow-sm transition-all disabled:opacity-50"
                            disabled={!token}
                            onClick={() => token && increaseQuantity(item.id, token).catch((err: any) => toast.error(err.message || "Failed to update quantity"))}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                          </button>
                        </div>
                        
                        <button
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-full transition-colors disabled:opacity-50"
                          disabled={!token}
                          onClick={() => token && removeFromCart(item.id, token).catch((err: any) => toast.error(err.message || "Failed to remove item"))}
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                      
                      {/* Mobile Remove */}
                      <div className="flex sm:hidden pl-[104px] -mt-2">
                        <button
                           className="text-red-500 text-sm font-semibold flex items-center gap-1 disabled:opacity-50"
                           disabled={!token}
                           onClick={() => token && removeFromCart(item.id, token).catch((err: any) => toast.error(err.message || "Failed to remove item"))}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          Remove
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Changed your mind?</span>
                  <button
                    onClick={() => token && clearCart(token).then(() => toast.info("Cart cleared")).catch((err: any) => toast.error(err.message || "Failed to clear cart"))}
                    disabled={!token}
                    className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="glass-card bg-slate-900 text-white rounded-[2rem] p-8 border border-slate-800 sticky top-32 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

                {/* Promo code */}
                <div className="mb-6">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                        <Tag className="w-4 h-4" />
                        {appliedPromo.code} — {appliedPromo.description}
                      </div>
                      <button
                        onClick={() => {
                          setPromoCode(null);
                          setPromoInput("");
                        }}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                        placeholder="Promo code"
                        className="flex-1 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={!promoInput.trim()}
                        className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-slate-300 font-light">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-400 font-light">
                      <span>Promo discount</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-slate-300 font-light">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-white">
                      {cart.length > 0 ? `$${deliveryFee.toFixed(2)}` : "$0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-light">
                    <span>Tax (8%)</span>
                    <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 my-6"></div>

                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="block text-sm text-slate-400 mb-1">Total Amount</span>
                    <span className="text-3xl font-extrabold text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/order"
                  className="group relative w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all overflow-hidden shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Proceed to Checkout
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </Link>

                <p className="text-xs text-slate-400 text-center mt-6 font-light">
                  Secure checkout. By proceeding, you agree to our Terms and Conditions.
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
