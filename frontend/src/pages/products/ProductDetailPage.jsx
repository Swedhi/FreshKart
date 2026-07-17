import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../layouts/Navbar";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";

import { useWishlist } from "../../context/WishlistContext";

import { getProductImage } from "../../utils/productImages";
import { getUserId } from "../../utils/auth";

import client from "../../api/client";
import { addCartItem } from "../../api/cartApi";

import {
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Clock3,
  PackageCheck,
  Minus,
  Plus
} from "lucide-react";

export default function ProductDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

const [review, setReview] = useState({
  rating: 5,
  comment: "",
});

  useEffect(() => {
    loadProduct();
    setQuantity(1);
}, [id]);
  const loadProduct = async () => {
    try {
      const response = await client.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {

    const userId = getUserId();

    if (!userId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {

      await addCartItem(
        userId,
        product.id,
        quantity
      );

      alert("Product added to cart!");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to add product."
      );

    }
  };

  const handleBuyNow = async () => {

    const userId = getUserId();

    if (!userId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {

      await addCartItem(
        userId,
        product.id,
        quantity
      );

      navigate("/checkout");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to continue."
      );

    }
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">Loading...</h2>
    </div>
  );
}

if (!product) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">
        Product not found
      </h2>
    </div>
  );
}

return (
  <>
    <Navbar />

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE - PRODUCT IMAGE */}

        <div className="space-y-5">

          <div className="relative bg-white rounded-3xl shadow-xl border p-8 flex justify-center items-center group min-h-[430px]">

  {/* Category Badge */}
  <div className="absolute left-6 top-6 z-20">
    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
      {product.category}
    </span>
  </div>

  {/* Wishlist */}
  <button
    onClick={() => toggleWishlist(product)}
    className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
  >
    <Heart
      size={24}
      fill={isWishlisted(product.id) ? "red" : "none"}
      color={isWishlisted(product.id) ? "red" : "#666"}
    />
  </button>

  {/* Product Image */}
 <img
  src={product.imageUrl || getProductImage(product.name)}
  alt={product.name}
  className="
      w-full
      h-[420px]
      object-cover
      rounded-2xl
      transition-all
      duration-500
      group-hover:scale-105
  "
/>

</div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">

            <div className="flex items-center gap-4">

              <Truck size={35} className="text-green-600" />

              <div>
                <h3 className="font-bold text-lg">
                  Free Delivery
                </h3>

                <p className="text-gray-600">
                  Delivery within 15–20 minutes
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

  <h1 className="text-5xl font-bold leading-tight">
    {product.name}
  </h1>

  <p className="text-gray-500 mt-4 leading-7">
    Premium quality grocery item sourced directly from trusted farms and vendors
    to ensure freshness and excellent taste.
  </p>

  <div className="flex items-end gap-4 mt-8">

    <h2 className="text-5xl font-bold text-green-700">
      ₹{product.price}
    </h2>

    <span className="text-lg line-through text-gray-400">
      ₹{Math.round(product.price * 1.25)}
    </span>

    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
      20% OFF
    </span>

  </div>

  <div className="mt-8 flex flex-wrap gap-4">

    <div
      className={`px-5 py-3 rounded-xl font-semibold ${
        product.stockQuantity > 0
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {product.stockQuantity > 0 ? "✅ In Stock" : "❌ Out of Stock"}
    </div>

    {product.stockQuantity > 0 && (
      <div className="px-5 py-3 rounded-xl bg-gray-100">
        {product.stockQuantity} Items Available
      </div>
    )}

  </div>

  {/* Quantity */}

  <div className="mt-10">

    <p className="font-semibold mb-4 text-lg">
      Quantity
    </p>

    <div className="flex items-center w-fit bg-white rounded-2xl shadow border overflow-hidden">

      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="w-14 h-14 hover:bg-gray-100 transition flex items-center justify-center"
      >
        <Minus size={20} />
      </button>

      <div className="w-20 text-center font-bold text-xl">
        {quantity}
      </div>

      <button
        onClick={() =>
          setQuantity(Math.min(quantity + 1, product.stockQuantity))
        }
        className="w-14 h-14 hover:bg-gray-100 transition flex items-center justify-center"
      >
        <Plus size={20} />
      </button>

    </div>

  </div>

  {/* Buttons */}

  <div className="grid md:grid-cols-2 gap-5 mt-10">

    <button
      disabled={product.stockQuantity === 0}
      onClick={handleAddToCart}
      className="bg-green-600 hover:bg-green-700 hover:scale-105 transition duration-300 shadow-lg text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-3 disabled:bg-gray-400"
    >
      <ShoppingCart size={22} />
      Add To Cart
    </button>

    <button
      disabled={product.stockQuantity === 0}
      onClick={handleBuyNow}
      className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition duration-300 shadow-lg text-white py-5 rounded-2xl font-bold disabled:bg-gray-400"
    >
      Buy Now
    </button>

  </div>

  {/* Features */}

  <div className="grid grid-cols-3 gap-5 mt-10">

    <div className="bg-gray-50 rounded-2xl border p-6 flex flex-col items-center justify-center text-center">
      <ShieldCheck size={34} className="text-green-600" />
      <h3 className="font-semibold mt-4">Secure Payment</h3>
    </div>

    <div className="bg-gray-50 rounded-2xl border p-6 flex flex-col items-center justify-center text-center">
      <Truck size={34} className="text-blue-600" />
      <h3 className="font-semibold mt-4">Fast Delivery</h3>
    </div>

    <div className="bg-gray-50 rounded-2xl border p-6 flex flex-col items-center justify-center text-center">
      <Clock3 size={34} className="text-orange-500" />
      <h3 className="font-semibold mt-4">Fresh Everyday</h3>
    </div>

  </div>

</div>

      </div>

      {/* After the grid closes, paste these sections exactly in this order */}

    {/* About Product */}

<div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    About this Product
  </h2>

  <div className="bg-white rounded-3xl border shadow-sm p-8">

    <p className="text-gray-600 leading-8 text-lg">
      FreshKart carefully sources premium-quality
      <span className="font-semibold text-green-700">
        {" "}{product.name}
      </span>{" "}
      from trusted farmers and suppliers. Every product undergoes
      strict quality checks to ensure freshness, hygiene and superior
      taste before reaching your doorstep.
    </p>

    <div className="grid md:grid-cols-2 gap-8 mt-8">

      <div>

        <h3 className="font-bold text-xl mb-4">
          Product Highlights
        </h3>

        <ul className="space-y-3 text-gray-600">
          <li>✔ Premium Quality</li>
          <li>✔ Farm Fresh</li>
          <li>✔ Hygienically Packed</li>
          <li>✔ Best Price Guaranteed</li>
          <li>✔ Fast Delivery</li>
        </ul>

      </div>

      <div>

        <h3 className="font-bold text-xl mb-4">
          Specifications
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span className="font-semibold">{product.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Product</span>
            <span className="font-semibold">{product.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Available Stock</span>
            <span className="font-semibold">{product.stockQuantity}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Delivery</span>
            <span className="font-semibold text-green-600">
              15–20 Minutes
            </span>
          </div>

        </div>

      </div>

    </div>

  </div>

</div>
<section className="mt-16">

  <h2 className="text-3xl font-bold mb-8">
    Why Shop With FreshKart?
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-green-50 rounded-2xl p-6 border">
      <div className="text-4xl">🚚</div>
      <h3 className="font-bold text-lg mt-4">Fast Delivery</h3>
      <p className="text-gray-600 mt-2">
        Delivered within 15–20 minutes directly to your doorstep.
      </p>
    </div>

    <div className="bg-blue-50 rounded-2xl p-6 border">
      <div className="text-4xl">🌿</div>
      <h3 className="font-bold text-lg mt-4">Farm Fresh</h3>
      <p className="text-gray-600 mt-2">
        Fresh vegetables and fruits sourced every morning.
      </p>
    </div>

    <div className="bg-orange-50 rounded-2xl p-6 border">
      <div className="text-4xl">💳</div>
      <h3 className="font-bold text-lg mt-4">Secure Payment</h3>
      <p className="text-gray-600 mt-2">
        100% secure online payment.
      </p>
    </div>

    <div className="bg-purple-50 rounded-2xl p-6 border">
      <div className="text-4xl">⭐</div>
      <h3 className="font-bold text-lg mt-4">Premium Quality</h3>
      <p className="text-gray-600 mt-2">
        Every product passes strict quality checks.
      </p>
    </div>

  </div>

</section>
<section className="mt-24">

  <div className="mb-8">

    <h2 className="text-4xl font-bold">
      Frequently Bought Together
    </h2>

    <p className="text-gray-500 mt-2">
      Customers also purchased these products.
    </p>

  </div>

  <FrequentlyBoughtTogether productId={product.id} />

</section>
<section className="bg-white rounded-3xl shadow border p-8 mt-20">

  <div className="grid md:grid-cols-2 gap-10">

    <div>

      <h1 className="text-6xl font-bold">
        4.8
      </h1>

      <div className="text-yellow-500 text-2xl mt-3">
        ★★★★★
      </div>

      <p className="text-gray-500 mt-2">
        Based on 1,254 reviews
      </p>

    </div>

    <div className="space-y-3">

      {[5,4,3,2,1].map((star,index)=>(
        <div key={star} className="flex items-center gap-3">

          <span className="w-4">{star}</span>

          <div className="flex-1 h-3 bg-gray-200 rounded-full">

            <div
              className={`h-3 rounded-full ${
                index===0 ? "w-[82%]"
                : index===1 ? "w-[12%]"
                : index===2 ? "w-[4%]"
                : "w-[2%]"
              } bg-green-600`}
            />

          </div>

        </div>
      ))}

    </div>

  </div>

</section>
<section className="mt-20">

  <div className="flex justify-between items-center mb-8">

    <div>

      <h2 className="text-4xl font-bold">
        Customer Reviews
      </h2>

      <p className="text-gray-500 mt-2">
        What our customers are saying
      </p>

    </div>

    <button
  onClick={() => setShowReviewForm(true)}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
>
  Write Review
</button>

  </div>

  <div className="grid lg:grid-cols-3 gap-6">

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between">
        <h3 className="font-bold">Rahul Sharma</h3>
        <span className="text-yellow-500">★★★★★</span>
      </div>

      <p className="text-gray-600 mt-4">
        Fresh quality products with super fast delivery. Highly recommended!
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between">
        <h3 className="font-bold">Sneha Verma</h3>
        <span className="text-yellow-500">★★★★★</span>
      </div>

      <p className="text-gray-600 mt-4">
        Packaging was excellent and vegetables were very fresh.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between">
        <h3 className="font-bold">Amit Kumar</h3>
        <span className="text-yellow-500">★★★★☆</span>
      </div>

      <p className="text-gray-600 mt-4">
        Delivery was on time. Great experience shopping with FreshKart.
      </p>

    </div>

  </div>

</section>

      

    </div>
    {showReviewForm && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl p-8 w-[500px]">

      <h2 className="text-2xl font-bold mb-6">
        Write Review
      </h2>

      <label className="font-semibold">
        Rating
      </label>

      <select
        value={review.rating}
        onChange={(e) =>
          setReview({
            ...review,
            rating: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3 mt-2 mb-5"
      >
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>

      <label className="font-semibold">
        Review
      </label>

      <textarea
        rows="5"
        value={review.comment}
        onChange={(e) =>
          setReview({
            ...review,
            comment: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3 mt-2"
        placeholder="Write your review..."
      />

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowReviewForm(false)}
          className="px-5 py-2 rounded-lg bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            console.log(review);
            alert("Review Submitted Successfully!");
            setShowReviewForm(false);
          }}
          className="px-5 py-2 rounded-lg bg-green-600 text-white"
        >
          Submit Review
        </button>

      </div>

    </div>

  </div>
)}

  </>
);
}