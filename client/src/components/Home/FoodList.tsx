// src/components/FoodList.tsx
import { useEffect } from "react";
import { food_list } from "../../assets/frontend_assets/assets"; // adjust path if needed
//import removeButton from "../../assets/frontend_assets/remove_icon_red.png";
//import addButton from "../../assets/frontend_assets/add_icon_green.png";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useMenuStore } from "../../store/useMenuStore";

export default function FoodList() {
  const { selectedCategory } = useMenuStore();
  const { cart, restaurantId, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const { token } = useAuthStore();

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const filteredFoods =
    selectedCategory && selectedCategory !== ""
      ? food_list.filter((food) => food.category === selectedCategory)
      : food_list;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          {selectedCategory ? `${selectedCategory} Dishes` : "All Foods"}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredFoods.map((food) => {
            const cartItem = cart.find((i) => i._id === food._id);
            const cartDisabled = !token || !restaurantId;

            return (
              <div
                key={food._id}
                className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {food.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-red-500 font-bold text-lg">
                      ${food.price}
                    </span>

                    {!cartItem ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                        disabled={cartDisabled}
                        onClick={async () => {
                          if (cartDisabled) return;
                          await addToCart(
                            {
                              _id: food._id,
                              name: food.name,
                              price: food.price,
                              image: food.image,
                            },
                            restaurantId ?? undefined,
                            token ?? undefined
                          );
                        }}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          disabled={cartDisabled}
                          onClick={async () => {
                            if (cartDisabled) return;
                            await decreaseQuantity(
                              cartItem.id,
                              token ?? undefined
                            );
                          }}
                        >
                          -
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          disabled={cartDisabled}
                          onClick={async () => {
                            if (cartDisabled) return;
                            await increaseQuantity(
                              cartItem.id,
                              token ?? undefined
                            );
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
      </div>
    </section>
  );
}
