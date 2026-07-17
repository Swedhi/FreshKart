import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import { checkout } from "../../api/orderApi";
import { getCart } from "../../api/cartApi";
import { getUserId } from "../../utils/auth";
import { createPaymentOrder } from "../../api/paymentApi";

import {
  getAddresses,
  addAddress,
} from "../../api/addressApi";

export default function CheckoutPage() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    loadCart();
    loadAddresses();
  }, []);

  const loadCart = async () => {
    try {

      const data = await getCart(getUserId());

      setCartItems(data.items || []);
      setTotalAmount(data.totalAmount || 0);

    } catch (err) {
      console.error(err);
    }
  };

  const loadAddresses = async () => {

    try {

      const data = await getAddresses(getUserId());

      setAddresses(data);

      if (data.length > 0) {
        setSelectedAddress(data[0]);
      }

    } catch (err) {
      console.error(err);
    }

  };

  const handleAddAddress = async () => {

    try {

      await addAddress({
        ...addressForm,
        user: {
          id: getUserId(),
        },
      });

      alert("Address Added");

      setShowForm(false);

      loadAddresses();

      setAddressForm({
        fullName: "",
        phoneNumber: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });

    } catch (err) {
      console.error(err);
    }

  };

  const handlePlaceOrder = async () => {

  if (!selectedAddress) {
    alert("Please select an address");
    return;
  }

  try {

    const payment = await createPaymentOrder(totalAmount);

    const options = {

      key: payment.key,

      amount: payment.amount * 100,

      currency: payment.currency,

      name: "FreshKart",

      description: "Fresh Grocery Order",

      order_id: payment.orderId,

      handler: async function () {

        alert("Payment Successful");

        await checkout(getUserId());

        navigate("/orders");

      },

      prefill: {

        name: selectedAddress.fullName,

        contact: selectedAddress.phoneNumber,

      },

      theme: {

        color: "#16a34a",

      },

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(error);

    alert("Payment Failed");

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

          {/* ADDRESS */}

          <div>

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Delivery Address
                </h2>

                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  + Add Address
                </button>

              </div>

              {showForm && (

                <div className="border rounded-xl p-4 mb-6">

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="Full Name"
                    value={addressForm.fullName}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        fullName: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="Phone Number"
                    value={addressForm.phoneNumber}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        phoneNumber: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="Address Line"
                    value={addressForm.addressLine}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        addressLine: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="City"
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        city: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="State"
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        state: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-3"
                    placeholder="Pincode"
                    value={addressForm.pincode}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        pincode: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={handleAddAddress}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Address
                  </button>

                </div>

              )}

              {addresses.map((address) => (

                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address)}
                  className={`border rounded-xl p-4 mb-4 cursor-pointer ${
                    selectedAddress?.id === address.id
                      ? "border-green-600 bg-green-50"
                      : ""
                  }`}
                >

                  <h3 className="font-bold">
                    {address.fullName}
                  </h3>

                  <p>{address.addressLine}</p>

                  <p>
                    {address.city}, {address.state}
                  </p>

                  <p>{address.pincode}</p>

                  <p>{address.phoneNumber}</p>

                </div>

              ))}

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {cartItems.map((item) => (

                <div
                  key={item.cartId}
                  className="flex justify-between py-3"
                >

                  <span>
                    {item.productName} × {item.quantity}
                  </span>

                  <span>
                    ₹{item.subtotal}
                  </span>

                </div>

              ))}

              <hr className="my-4"/>

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span>₹{totalAmount}</span>

              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl"
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