import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ShoppingCart, LogOut, User, Sun, Moon } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = useMemo(() => {
    const baseLinks = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ];

    if (!isAuthenticated) {
      return [...baseLinks, { name: "Sign In", href: "/signin" }];
    }

    const roleLinks: { [key: string]: { name: string; href: string }[] } = {
      Buyer: [
        { name: "Favorites", href: "/favorites" },
        { name: "My Orders", href: "/my-orders" },
      ],
      Seller: [
        { name: "Dashboard", href: "/seller/dashboard" },
        { name: "My Restaurants", href: "/seller/restaurants" },
        { name: "Orders", href: "/seller/orders" },
      ],
      DeliveryBoy: [{ name: "Orders", href: "/delivery/orders" }],
      Admin: [
        { name: "Dashboard", href: "/admin/dashboard" },
        { name: "All Orders", href: "/admin/orders" },
        { name: "Restaurants", href: "/admin/restaurants" },
      ],
    };

    return [...baseLinks, ...(roleLinks[user?.role || "Buyer"] || [])];
  }, [isAuthenticated, user?.role]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          FoodOrder
        </Link>

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

          {/* Cart Icon - Only show for Buyers */}
          {isAuthenticated && user?.role === "Buyer" && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-gray-700 hover:text-gray-900"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          {isAuthenticated && user?.role === "Buyer" && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-gray-700"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

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
                  {isAuthenticated && (
                    <>
                      <li className="pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.role}
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-lg"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
