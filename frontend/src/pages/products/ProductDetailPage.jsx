import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import {
  useCart,
} from "../../context/CartContext";

import {
  useWishlist,
} from "../../context/WishlistContext";

import {
  getProductImage,
} from "../../utils/productImages";

import client from "../../api/client";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";

export default function ProductDetailPage() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const { addToCart } =
    useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [product,
    setProduct] =
    useState(null);

  const [quantity,
    setQuantity] =
    useState(1);

  useEffect(() => {

    loadProduct();

  }, [id]);

  const loadProduct =
    async () => {

      try {

        const response =
          await client.get(
            `/products/${id}`
          );

        setProduct(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const handleAddToCart =
    () => {

      addToCart({
        ...product,
        quantity,
      });

      alert(
        "Added To Cart"
      );

    };

  const handleBuyNow =
    () => {

      addToCart({
        ...product,
        quantity,
      });

      navigate(
        "/checkout"
      );

    };

  if (!product) {

    return (
      <>
        <Navbar />

        <div className="p-10 text-center">
          Loading...
        </div>
      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="relative">

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
                h-[500px]
                object-cover
                rounded-3xl
              "
            />

            <button
              onClick={() =>
                toggleWishlist(
                  product
                )
              }
              className="
                absolute
                top-4
                right-4
                bg-white
                p-3
                rounded-full
                shadow-lg
              "
            >
              <Heart
                size={22}
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

          <div>

            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-3">
              {product.category}
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-green-700
                mt-6
              "
            >
              ₹{product.price}
            </h2>

            <p className="mt-4">
              Available Stock:
              {" "}
              {product.stockQuantity}
            </p>

            <div
              className="
                flex
                items-center
                gap-4
                mt-8
              "
            >

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(
                    quantity - 1
                  )
                }
                className="
                  w-12
                  h-12
                  bg-gray-200
                  rounded-lg
                  text-xl
                "
              >
                -
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(
                    quantity + 1
                  )
                }
                className="
                  w-12
                  h-12
                  bg-gray-200
                  rounded-lg
                  text-xl
                "
              >
                +
              </button>

            </div>

            <div
              className="
                flex
                gap-4
                mt-10
              "
            >

              <button
                onClick={
                  handleAddToCart
                }
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                "
              >
                <ShoppingCart
                  size={20}
                />
                Add To Cart
              </button>

              <button
                onClick={
                  handleBuyNow
                }
                className="
                  flex-1
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                "
              >
                Buy Now
              </button>

            </div>

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-4">
                Product Details
              </h3>

              <p className="text-gray-600">
                Fresh premium quality
                {" "}
                {product.name}
                {" "}
                sourced directly
                from trusted farms
                and suppliers.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}