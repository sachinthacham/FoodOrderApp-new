// src/components/admin/AdminSidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const navLinks = [
    { name: "Add Items", path: "/admin/add", icon: <BarChart size={20} /> },
    { name: "List Items", path: "/admin/list", icon: <ShoppingBag size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <Package size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="text-xl font-bold">🍔 Foodie Admin</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-red-500 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
