import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  console.log("User data in Navbar:", user);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    // { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-baby text-gray-900 shadow-md w-full ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange">
          ShopEase
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-orange font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="hover:text-orange transition">
                {link.name}
              </Link>
            </li>
          ))}
          {user ? (
            <li onClick={() => dispatch(logout())}>
              <p className="hover:text-orange transition">Logout</p>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-orange transition">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Cart Button */}

        <Link to="/cart" className="text-red text-xl relative">
          <FaShoppingCart />
          {/* Optional: Badge */}
          <span className="absolute -top-2 -right-2 bg-mindaro text-xs text-black rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-orange text-2xl ml-4"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden bg-baby px-6 pb-4 space-y-3 text-orange font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="hover:text-orange transition">
                {link.name}
              </Link>
            </li>
          ))}
          {user ? (
            <li onClick={() => dispatch(logout())}>
              <p className="hover:text-orange transition">Logout</p>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-orange transition">
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
