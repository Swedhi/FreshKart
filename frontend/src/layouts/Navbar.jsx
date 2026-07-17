import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Search,
  Bot,
  Camera,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getUser, logout } from "../utils/auth";

export default function Navbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const user = getUser();

  // Debug Logs
  console.log("Navbar Cart Items:", cartItems);

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  console.log("Navbar Total:", totalCartItems);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">

      <div className="max-w-[1500px] mx-auto px-5 py-3 flex items-center gap-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-extrabold text-green-600 whitespace-nowrap"
        >
          FreshKart
        </Link>

        {/* Delivery */}
        <div className="hidden lg:block whitespace-nowrap">
          <p className="text-xs text-gray-500">
            Delivery in
          </p>

          <p className="font-bold text-xl">
            30 Minutes ⚡
          </p>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2">

            <Search
              size={20}
              className="text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }
              placeholder="Search groceries..."
              className="flex-1 bg-transparent outline-none px-3"
            />

            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
            >
              Search
            </button>

          </div>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-5 font-semibold">

          <Link
            to="/products"
            className="hover:text-green-600"
          >
            Products
          </Link>

          {user && (
            <Link
              to="/admin"
              className="text-blue-600 hover:text-blue-800"
            >
              Admin
            </Link>
          )}

        </div>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative text-red-500"
        >
          <Heart size={28} />

          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {wishlistItems.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-green-600"
        >
          <ShoppingCart size={28} />

          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalCartItems}
            </span>
          )}
        </Link>

        {/* AI Buttons */}
        <div className="flex items-center gap-2">

          <Link
            to="/ai"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            <Bot size={18} />
            AI
          </Link>

          <Link
            to="/ai-camera"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            <Camera size={18} />
            Scan
          </Link>

        </div>

        {/* Login/User */}
        {user ? (

          <div className="flex items-center gap-3">

            <span className="hidden xl:block text-sm font-medium max-w-[170px] truncate">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}