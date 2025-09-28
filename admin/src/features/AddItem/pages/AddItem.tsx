import { useState } from "react";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normally send this to backend with axios/fetch
    console.log({
      name,
      description,
      price,
      category,
      image,
    });

    alert("Product added successfully!");
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="drinks">Drinks</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            required
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
