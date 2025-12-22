import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="pt-16"> {/* pt-16 to offset fixed Navbar */}
        <Outlet /> {/* Render the nested routes here */}
      </main>
    </div>
  );
}
