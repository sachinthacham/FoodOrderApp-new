import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurantService } from "@/features/restaurant/services/restaurantService";
import type { Restaurant } from "@/features/restaurant/services/restaurantService";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ShoppingCart } from "lucide-react";

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    setRestaurant: setCartRestaurant,
    loadCart,
  } = useCartStore();
  const { token } = useAuthStore();

  // Load cart when component mounts or token changes
  useEffect(() => {
    if (token) {
      loadCart(token);
    }
  }, [token, loadCart]);

  useEffect(() => {
    if (!id) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const data = await restaurantService.getById(id, token || undefined);
        setRestaurant(data);
        setCartRestaurant(data.id); // Set restaurant in cart store
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id, token]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Loading restaurant...</p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Restaurant not found"}
        </div>
        <Link to="/" className="mt-4 inline-block text-red-500 hover:underline">
          ← Back to Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/" className="text-red-500 hover:underline mb-6 inline-block">
        ← Back to Restaurants
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
          <span className="text-white text-6xl font-bold">
            {restaurant.name.charAt(0)}
          </span>
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {restaurant.name}
          </h1>
          <p className="text-gray-600 mb-4">{restaurant.description}</p>
          <p className="text-gray-500">📍 {restaurant.address}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h2>

        {restaurant.menuItems.length === 0 ? (
          <p className="text-gray-600">No menu items available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {restaurant.menuItems.map((item) => {
              const cartItem = cart.find(
                (i) => i._id === item.id || i.id === item.id
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-bold">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-500 font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </span>

                      {!cartItem ? (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
                          disabled={!token}
                          onClick={async () => {
                            if (!token) return;
                            setCartRestaurant(restaurant.id);
                            await addToCart(
                              {
                                _id: item.id,
                                name: item.name,
                                price: item.price,
                                image: "", // Menu items don't have images from backend
                              },
                              restaurant.id,
                              token
                            );
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            disabled={!token}
                            onClick={async () => {
                              if (!token) return;
                              await decreaseQuantity(cartItem.id, token);
                            }}
                          >
                            -
                          </button>
                          <span className="font-semibold">
                            {cartItem.quantity}
                          </span>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            disabled={!token}
                            onClick={async () => {
                              if (!token) return;
                              await increaseQuantity(cartItem.id, token);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
