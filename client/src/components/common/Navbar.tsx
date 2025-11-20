// Navbar.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [navLinks] = useState([
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      {name:"Sign In", href:"/signin"}
    ]);
  
    const { cart } = useCartStore(); // ✅ get cart from Zustand
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">MyLogo</div>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
  
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
  
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart icon in mobile */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
  
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">Menu</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold">Menu</div>
                  <SheetTrigger asChild>
                    <Button variant="ghost">
                      <X />
                    </Button>
                  </SheetTrigger>
                </div>
                <ScrollArea className="h-[80vh]">
                  <ul className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-700 hover:text-gray-900 text-lg"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }