import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { getFeaturedProducts } from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getProductImage } from "../../utils/productImages";

export default function FeaturedProducts() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted
  } = useWishlist();

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts = async () => {

    try {

      const data =
        await getFeaturedProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <section className="max-w-7xl mx-auto py-12 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Featured Products
        </h2>

        <button
          onClick={() =>
            navigate("/products")
          }
          className="
            text-green-600
            font-semibold
            hover:text-green-700
          "
        >
          View All →
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="
              bg-white
              rounded-2xl
              border
              overflow-hidden
              hover:shadow-xl
              transition
            "
          >

            <div className="relative">

              <Link
                to={`/products/${product.id}`}
              >

                <img
                  src={
                    product.imageUrl ||
                    getProductImage(
                      product.name
                    )
                  }
                  alt={product.name}
                  className="
                    w-full
                    h-44
                    object-cover
                  "
                />

              </Link>

              <span
                className="
                  absolute
                  top-3
                  left-3
                  bg-green-600
                  text-white
                  text-xs
                  px-3
                  py-1
                  rounded-full
                "
              >
                Fresh
              </span>

              <button
                onClick={() =>
                  toggleWishlist(product)
                }
                className="
                  absolute
                  top-3
                  right-3
                  bg-white
                  p-2
                  rounded-full
                  shadow
                "
              >

                <Heart
                  size={18}
                  fill={
                    isWishlisted(
                      product.id
                    )
                      ? "red"
                      : "none"
                  }
                  color={
                    isWishlisted(
                      product.id
                    )
                      ? "red"
                      : "gray"
                  }
                />

              </button>

            </div>

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {product.category}
              </p>

              <p className="text-sm text-gray-500">
                Stock:
                {" "}
                {product.stockQuantity}
              </p>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-4
                "
              >

                <div>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-green-700
                    "
                  >
                    ₹{product.price}
                  </p>

                </div>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
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
                    text-sm
                    font-medium
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
                  text-center
                  mt-4
                  py-2
                  rounded-lg
                  bg-gray-100
                  hover:bg-gray-200
                  text-sm
                  font-medium
                "
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}