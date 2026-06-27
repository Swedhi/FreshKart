import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Search } from "lucide-react";
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

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(
      `/products?search=${search}`
    );

  };

  const totalCartItems =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (

    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        <Link
          to="/"
          className="text-3xl font-bold text-green-600"
        >
          FreshKart
        </Link>

        <div className="hidden md:block">

          <p className="text-xs text-gray-500">
            Delivery in
          </p>

          <p className="font-bold">
            30 Minutes ⚡
          </p>

        </div>

        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-3">

            <Search
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleSearch();

                }

              }}
              placeholder="Search groceries..."
              className="
                flex-1
                bg-transparent
                outline-none
                ml-3
              "
            />

            <button
              onClick={handleSearch}
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                hover:bg-green-700
              "
            >
              Search
            </button>

          </div>

        </div>

        <Link
          to="/products"
          className="
            font-semibold
            text-gray-700
            hover:text-green-600
          "
        >
          Products
        </Link>

        <Link
          to="/wishlist"
          className="
            relative
            text-red-500
          "
        >

          <Heart size={28} />

          {wishlistItems.length > 0 && (

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                w-5
                h-5
                flex
                items-center
                justify-center
                rounded-full
              "
            >
              {wishlistItems.length}
            </span>

          )}

        </Link>

        <Link
          to="/cart"
          className="
            relative
            text-green-600
          "
        >

          <ShoppingCart size={28} />

          {totalCartItems > 0 && (

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-green-600
                text-white
                text-xs
                w-5
                h-5
                flex
                items-center
                justify-center
                rounded-full
              "
            >
              {totalCartItems}
            </span>

          )}

        </Link>

        {user ? (

          <div className="flex items-center gap-4">

            <span className="font-semibold text-sm">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                px-5
                py-2
                rounded-xl
                hover:bg-red-600
              "
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="
              bg-green-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:bg-green-700
            "
          >
            Login
          </Link>

        )}

      </div>

    </nav>

  );

}