// src/pages/CartPage.tsx
import { useCartStore } from "../../../store/useCartStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function CartPage() {
  const {
    cart,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    loadCart,
  } = useCartStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      loadCart(token);
    }
  }, [token, loadCart]);

  const [deliveryFee] = useState(5); // example delivery fee
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                      <span className="text-gray-600 text-xl font-bold">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={!token}
                    onClick={async () => {
                      if (!token) return;
                      await decreaseQuantity(item.id, token);
                    }}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={!token}
                    onClick={async () => {
                      if (!token) return;
                      await increaseQuantity(item.id, token);
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Remove Item */}
                <button
                  className="text-red-500 font-bold hover:underline disabled:opacity-50"
                  disabled={!token}
                  onClick={async () => {
                    if (!token) return;
                    await removeFromCart(item.id, token);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={async () => {
                if (!token) return;
                await clearCart(token);
              }}
              disabled={!token}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Summary / Checkout */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Delivery Fee</span>
              <span className="font-semibold">
                {cart.length > 0 ? `$${deliveryFee.toFixed(2)}` : "$0.00"}
              </span>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>

            <Link
              to="/order"
              className="w-full bg-red-500 text-white py-3 px-3 rounded-lg hover:bg-red-600 transition mb-4"
            >
              Proceed to Checkout
            </Link>

            <p className="text-sm text-gray-500 text-center mt-5">
              By proceeding, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
