import { useState } from "react";
import { Trash2, Edit } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function ListItem() {
  // Dummy data (replace with API or Zustand later)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with cheese and tomato",
      price: 12.99,
      category: "Pizza",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      name: "Cheeseburger",
      description: "Juicy beef burger with cheese",
      price: 9.99,
      category: "Burger",
      image: "https://via.placeholder.com/100",
    },
  ]);

  // Delete product
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Product List</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={18} />
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
