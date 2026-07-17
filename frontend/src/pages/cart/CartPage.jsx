import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import {
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../../api/cartApi";

import { getUserId } from "../../utils/auth";

export default function CartPage() {

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {

    try {

      const userId = getUserId();

      if (!userId) return;

      const data = await getCart(userId);

      setCartItems(data.items || []);
      setTotalAmount(data.totalAmount || 0);

    } catch (error) {

      console.error(error);

    }

  };

  const increaseQuantity = async (item) => {

    try {

      await updateCartQuantity(
        item.cartId,
        item.quantity + 1
      );

      loadCart();

    } catch (error) {

      console.error(error);

      alert("Unable to update quantity");

    }

  };

  const decreaseQuantity = async (item) => {

    try {

      if (item.quantity === 1) {

        await removeItem(item.cartId);

        return;

      }

      await updateCartQuantity(
        item.cartId,
        item.quantity - 1
      );

      loadCart();

    } catch (error) {

      console.error(error);

      alert("Unable to update quantity");

    }

  };

  const removeItem = async (cartId) => {

    try {

      await removeCartItem(cartId);

      loadCart();

    } catch (error) {

      console.error(error);

      alert("Unable to remove item");

    }

  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          My Cart
        </h1>

        {cartItems.length === 0 ? (

          <div className="text-center">

            <h2 className="text-2xl mb-4">
              Cart is Empty
            </h2>

            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            <div className="md:col-span-2 space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item.cartId}
                  className="bg-white border rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold text-xl">
                      {item.productName}
                    </h3>

                    <p className="text-green-700 font-bold mt-2">
                      ₹{item.price}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item)}
                    >
                      <Minus />
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item)}
                    >
                      <Plus />
                    </button>

                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="bg-white border rounded-2xl p-6 h-fit">

              <h2 className="text-2xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">

                <span>Total</span>

                <span className="font-bold">
                  ₹{totalAmount}
                </span>

              </div>

              <Link
                to="/checkout"
                className="block mt-6 bg-green-600 text-white text-center py-3 rounded-xl"
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        )}

      </div>

    </>
  );

}