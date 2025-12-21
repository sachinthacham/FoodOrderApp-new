import { useEffect, useState } from "react";
import Footer from "@/components/common/Footer";
import Header from "@/components/Home/Header";
import {
  restaurantService,
  
} from "@/features/restaurant/services/restaurantService";
import type{
 
  Restaurant,
} from "@/features/restaurant/services/restaurantService";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantService.getAll(token || undefined);
        setRestaurants(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [token]);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Our Restaurants
        </h2>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading restaurants...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && restaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No restaurants available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && restaurants.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {restaurant.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {restaurant.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    📍 {restaurant.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {restaurant.menuItems.length} items
                    </span>
                    <span className="text-red-500 font-semibold">
                      View Menu →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
