import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Commonlayout";
import Home from "../pages/HomePage";
import About from "../pages/AboutPage";
import Contact from "../pages/Contactpage";
import CartPage from "@/features/cart/pages/CartPage";
import SignUp from "@/features/auth/pages/SignUp";
import SignIn from "@/features/auth/pages/SignIn";
import PlaceOrder from "@/features/orders/pages/PlaceOrder";
import OrderSuccess from "@/features/orders/pages/OrderSuccess";
import MyOrders from "@/features/myOrders/pages/MyOrder";
import RestaurantDetailPage from "../pages/RestaurantDetailPage";

// Seller pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerRestaurants from "../pages/seller/SellerRestaurants";
import SellerMenuItems from "../pages/seller/SellerMenuItems";
import SellerOrders from "../pages/seller/SellerOrders";

// Delivery pages
import DeliveryOrders from "../pages/delivery/DeliveryOrders";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/restaurant/:id", element: <RestaurantDetailPage /> },

      // Buyer routes
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <PlaceOrder /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/my-orders", element: <MyOrders /> },

      // Seller routes
      { path: "/seller/dashboard", element: <SellerDashboard /> },
      { path: "/seller/restaurants", element: <SellerRestaurants /> },
      {
        path: "/seller/restaurants/:restaurantId/menu-items",
        element: <SellerMenuItems />,
      },
      { path: "/seller/orders", element: <SellerOrders /> },

      // Delivery routes
      { path: "/delivery/orders", element: <DeliveryOrders /> },

      // Admin routes
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/orders", element: <SellerOrders /> }, // Reuse seller orders for admin
      { path: "/admin/restaurants", element: <SellerRestaurants /> }, // Reuse seller restaurants for admin
      { path: "/admin/users", element: <AdminUsers /> },
    ],
  },
]);

export default router;
