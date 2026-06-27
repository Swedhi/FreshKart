import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import {
  getUser,
  logout,
} from "../../utils/auth";

import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../../api/addressApi";
import {
  getUserId
} from "../../utils/auth";

export default function ProfilePage() {

  const navigate =
    useNavigate();

  const user =
    getUser();

  const [addresses,
    setAddresses] =
    useState([]);

  const [showForm,
    setShowForm] =
    useState(false);

  const [formData,
    setFormData] =
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
          await getAddresses(
            userId
          );

        setAddresses(data);

      } catch (error) {

        console.error(error);

      }

    };

  const handleAddAddress =
    async (e) => {

      e.preventDefault();

      try {

        await addAddress({

          user: {
  id: getUserId(),
},

          ...formData,

        });

        alert(
          "Address Added Successfully"
        );

        setShowForm(false);

        setFormData({

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

        alert(
          "Failed To Add Address"
        );

      }

    };

  const handleDelete =
    async (id) => {

      try {

        await deleteAddress(id);

        loadAddresses();

      } catch (error) {

        console.error(error);

      }

    };

  const handleLogout =
    () => {

      logout();

      navigate("/login");

    };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl border p-6 mb-8">

          <h1 className="text-4xl font-bold mb-4">
            My Profile
          </h1>

          <div className="space-y-2">

            <p>
              <strong>Email:</strong>
              {" "}
              {user?.email}
            </p>

          </div>

          <div className="flex gap-4 mt-6">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="
                bg-green-600
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              My Orders
            </button>

            <button
              onClick={
                handleLogout
              }
              className="
                bg-red-500
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Logout
            </button>

          </div>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Saved Addresses
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
                px-5
                py-2
                rounded-lg
              "
            >
              + Add Address
            </button>

          </div>

          {showForm && (

            <form
              onSubmit={
                handleAddAddress
              }
              className="
                grid
                md:grid-cols-2
                gap-4
                mb-8
              "
            >

              <input
                placeholder="Full Name"
                value={
                  formData.fullName
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
                required
              />

              <input
                placeholder="Phone Number"
                value={
                  formData.phoneNumber
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
                required
              />

              <input
                placeholder="Address Line"
                value={
                  formData.addressLine
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addressLine:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                  md:col-span-2
                "
                required
              />

              <input
                placeholder="City"
                value={
                  formData.city
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
                required
              />

              <input
                placeholder="State"
                value={
                  formData.state
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
                required
              />

              <input
                placeholder="Pincode"
                value={
                  formData.pincode
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pincode:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
                required
              />

              <input
                placeholder="Country"
                value={
                  formData.country
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country:
                      e.target.value,
                  })
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

              <button
                type="submit"
                className="
                  bg-green-600
                  text-white
                  py-3
                  rounded-xl
                  md:col-span-2
                "
              >
                Save Address
              </button>

            </form>

          )}

          <div className="space-y-4">

            {addresses.map(
              (address) => (

                <div
                  key={address.id}
                  className="
                    border
                    rounded-xl
                    p-4
                    flex
                    justify-between
                  "
                >

                  <div>

                    <h3 className="font-bold">
                      {address.fullName}
                    </h3>

                    <p>
                      {
                        address.addressLine
                      }
                    </p>

                    <p>
                      {address.city},
                      {" "}
                      {address.state}
                    </p>

                    <p>
                      {
                        address.pincode
                      }
                    </p>

                    <p>
                      {
                        address.phoneNumber
                      }
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        address.id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      h-fit
                    "
                  >
                    Delete
                  </button>

                </div>

              )
            )}

          </div>

        </div>

      </div>
    </>
  );
}