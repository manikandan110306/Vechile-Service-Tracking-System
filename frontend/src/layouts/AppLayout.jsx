import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <Outlet />   {/* ✔ FIXED */}
        </main>
      </div>
    </div>
  );
}
