import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Commonlayout";
import Home from "../pages/HomePage";
import CartPage from "@/features/cart/pages/CartPage";
import SignUp from "@/features/auth/pages/SignUp";
import SignIn from "@/features/auth/pages/SignIn";
import PlaceOrder from "@/features/orders/pages/PlaceOrder";
import MyOrders from "@/features/myOrders/pages/MyOrder";
import RestaurantDetailPage from "../pages/RestaurantDetailPage";
import UserProfilePage from "@/features/users/pages/UserProfilePage";
import FavoritesPage from "@/features/favorites/pages/FavoritesPage";

// Seller pages
import SellerDashboard from "../pages/seller/SellerDashboard";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/restaurant/:id", element: <RestaurantDetailPage /> },

      // Buyer routes
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <PlaceOrder /> },
      { path: "/my-orders", element: <MyOrders /> },
      { path: "/profile", element: <UserProfilePage /> },
      { path: "/favorites", element: <FavoritesPage /> },

      // Seller routes
      { path: "/seller/dashboard", element: <SellerDashboard /> },

      // Admin routes
      { path: "/admin/dashboard", element: <AdminDashboard /> },
    ],
  },
]);

export default router;
