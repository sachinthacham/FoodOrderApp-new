import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import AddItem from "@/features/AddItem/pages/AddItem";
import ListItem from "@/features/ListItem/pages/ListItem";
import Orders from "@/features/orders/pages/Orders";


const router = createBrowserRouter([
  {
    element: <Layout />, // Layout wraps all pages
    children: [
      { path: "/admin/add", element: <AddItem /> },
      { path: "/admin/list", element: <ListItem /> },
      { path: "/admin/orders", element: <Orders /> },
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/settings", element: <Dashboard /> },
],
  },
]);

export default router;
