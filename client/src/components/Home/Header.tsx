// src/components/Header.tsx
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-red-500 to-orange-400 text-white">
      <div className="container mx-auto px-6 py-16 text-center md:text-left md:flex md:items-center md:justify-between">
        
        {/* Left Content */}
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Delicious Food, Delivered To You 🍔🍕
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Order your favorite meals and get them delivered fresh and fast to your door.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link
              to="/menu"
              className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
            >
              Explore Menu
            </Link>
            <Link
              to="/cart"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition"
            >
              View Cart
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" // replace with your food image
            alt="Delicious Food"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </header>
  );
}
