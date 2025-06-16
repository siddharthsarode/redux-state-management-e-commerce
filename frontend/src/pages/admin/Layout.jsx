import { Outlet } from "react-router-dom";
import Sidebar from "../../components/shared/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const toggleMobile = () => setOpen(!open);

  return (
    <div className="bg-baby text-dark min-h-screen flex">
      <ToastContainer />

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className="p-2 rounded bg-mindaro text-dark"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full z-40 bg-khaki">
          <Sidebar toggleMobile={toggleMobile} />
        </div>
      )}

      {/* Page Content */}
      <div className="flex-1 ml-0 p-6 h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
