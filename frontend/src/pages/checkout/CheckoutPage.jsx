import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import { useCart } from "../../context/CartContext";

import { createOrder } from "../../api/orderApi";
import {
  getUserId
} from "../../utils/auth";

import {
  getAddresses,
  addAddress,
} from "../../api/addressApi";

export default function CheckoutPage() {

  const navigate = useNavigate();

  const {
    cartItems,
    totalAmount,
  } = useCart();

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState(null);

  const [showForm,
    setShowForm] =
    useState(false);

  const [addressForm,
    setAddressForm] =
    useState({
      fullName: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses =
    async () => {

      try {

        const userId =
  getUserId();

        const data =
          await getAddresses(userId);

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddress(data[0]);
        }

      } catch (error) {

        console.error(
          "Failed to load addresses",
          error
        );

      }

    };

  const handleAddAddress =
    async () => {

      try {

        const newAddress = {

          ...addressForm,

          user: {
  id: getUserId(),
},

        };

        await addAddress(
          newAddress
        );

        alert(
          "Address Added Successfully"
        );

        setShowForm(false);

        setAddressForm({
          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        });

        loadAddresses();

      } catch (error) {

        console.error(error);

      }

    };

  const handlePlaceOrder =
    async () => {

      if (!selectedAddress) {

        alert(
          "Please select an address"
        );

        return;

      }

      try {

        const order = {

          totalAmount,

          addressId:
            selectedAddress.id,

          products:
            cartItems.map(
              (item) => ({
                productId: item.id,
                quantity: item.quantity,
              })
            ),

        };

        await createOrder(order);

        alert(
          "Order Placed Successfully"
        );

        navigate("/orders");

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ADDRESS SECTION */}

          <div>

            <div className="bg-white rounded-2xl border p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Delivery Address
                </h2>

                <button
                  onClick={() =>
                    setShowForm(
                      !showForm
                    )
                  }
                  className="
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  + Add Address
                </button>

              </div>

              {showForm && (

                <div className="border rounded-xl p-4 mb-6">

                  <input
                    placeholder="Full Name"
                    value={
                      addressForm.fullName
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        fullName:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <input
                    placeholder="Phone Number"
                    value={
                      addressForm.phoneNumber
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        phoneNumber:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <input
                    placeholder="Address Line"
                    value={
                      addressForm.addressLine
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        addressLine:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <input
                    placeholder="City"
                    value={
                      addressForm.city
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        city:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <input
                    placeholder="State"
                    value={
                      addressForm.state
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        state:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <input
                    placeholder="Pincode"
                    value={
                      addressForm.pincode
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        pincode:
                          e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3"
                  />

                  <button
                    onClick={
                      handleAddAddress
                    }
                    className="
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Save Address
                  </button>

                </div>

              )}

              {addresses.map(
                (address) => (

                  <div
                    key={address.id}
                    onClick={() =>
                      setSelectedAddress(
                        address
                      )
                    }
                    className={`
                      border
                      rounded-xl
                      p-4
                      mb-4
                      cursor-pointer
                      ${
                        selectedAddress?.id ===
                        address.id
                          ? "border-green-600 bg-green-50"
                          : ""
                      }
                    `}
                  >

                    <h3 className="font-bold">
                      {address.fullName}
                    </h3>

                    <p>
                      {address.addressLine}
                    </p>

                    <p>
                      {address.city},
                      {" "}
                      {address.state}
                    </p>

                    <p>
                      {address.pincode}
                    </p>

                    <p>
                      {address.phoneNumber}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div className="bg-white rounded-2xl border p-6">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {cartItems.map(
                (item) => (

                  <div
                    key={item.id}
                    className="
                      flex
                      justify-between
                      py-3
                    "
                  >

                    <span>
                      {item.name}
                      {" "}×{" "}
                      {item.quantity}
                    </span>

                    <span>
                      ₹
                      {item.price *
                        item.quantity}
                    </span>

                  </div>

                )
              )}

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span>
                  ₹{totalAmount}
                </span>

              </div>

              <button
                onClick={
                  handlePlaceOrder
                }
                className="
                  mt-8
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                "
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );
}