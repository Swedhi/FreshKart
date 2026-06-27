import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";

import { getProductImage } from "../../utils/productImages";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        overflow-hidden
        hover:shadow-2xl
        transition
        duration-300
        group
      "
    >
      <div className="relative">

        <img
          src={
            product.imageUrl ||
            getProductImage(product.name)
          }
          alt={product.name}
          className="
            w-full
            h-56
            object-cover
            group-hover:scale-105
            transition
            duration-300
          "
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="
            absolute
            top-3
            right-3
            bg-white
            p-2
            rounded-full
            shadow-md
          "
        >
          <Heart
            size={18}
            fill={
              isWishlisted(product.id)
                ? "red"
                : "none"
            }
            color={
              isWishlisted(product.id)
                ? "red"
                : "gray"
            }
          />
        </button>

        <div
          className="
            absolute
            top-3
            left-3
            bg-green-600
            text-white
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
          "
        >
          Fresh
        </div>

      </div>

      <div className="p-4">

        <h3
          className="
            text-lg
            font-bold
            text-gray-800
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-gray-500
            text-sm
            mt-1
          "
        >
          {product.category}
        </p>

        <div
          className="
            flex
            justify-between
            items-center
            mt-4
          "
        >
          <div>

            <h4
              className="
                text-2xl
                font-bold
                text-green-700
              "
            >
              ₹{product.price}
            </h4>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Stock: {product.stockQuantity}
            </p>

          </div>

          <button
            onClick={() => addToCart(product)}
            className="
              flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-lg
              font-semibold
            "
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>

        <Link
          to={`/products/${product.id}`}
          className="
            block
            mt-4
            text-center
            bg-gray-100
            hover:bg-gray-200
            py-2
            rounded-xl
            font-medium
          "
        >
          View Details
        </Link>

      </div>
    </div>
  );
}