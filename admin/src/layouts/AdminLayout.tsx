import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";   // Top bar
import Sidebar from "../components/common/SideBar"; // Left sidebar

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64"> {/* offset by sidebar width */}
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 mt-16 overflow-y-auto">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
}
