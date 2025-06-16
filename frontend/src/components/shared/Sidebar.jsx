import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  { name: "Products", path: "/admin/products", icon: <FaCog /> },
];

export default function Sidebar({ toggleMobile }) {
  const location = useLocation();

  return (
    <div className="bg-mindaro text-dark min-h-screen w-64 px-4 py-6 fixed md:static z-50">
      <h2 className="text-2xl font-bold text-orange mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded hover:bg-orange hover:text-baby transition ${
              location.pathname === item.path
                ? "bg-orange text-baby"
                : "text-dark"
            }`}
            onClick={toggleMobile}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
