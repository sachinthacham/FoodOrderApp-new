// src/pages/MenuPage.tsx
import { menu_list } from "../../assets/frontend_assets/assets"; // adjust path if needed
import { useMenuStore } from "../../store/useMenuStore";
import FoodList from "../Home/FoodList";

export default function MenuPage() {
  const { selectedCategory, setCategory } = useMenuStore();

  return (
    <div>
      {/* Category Selector */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Menu</h1>
        <div className="flex flex-wrap gap-6">
          {menu_list.map((menu) => (
            <button
              key={menu.id}
              onClick={() =>
                setCategory(
                  selectedCategory === menu.menu_name ? null : menu.menu_name
                )
              }
              className={`flex flex-col items-center p-4 rounded-lg shadow-md transition ${
                selectedCategory === menu.menu_name
                  ? "bg-red-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <img
                src={menu.menu_image}
                alt={menu.menu_name}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="font-medium">{menu.menu_name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Food List */}
      <FoodList />
    </div>
  );
}
