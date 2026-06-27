import { useEffect, useState } from "react";

import Navbar from "../../layouts/Navbar";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} from "../../api/addressApi";

import {
  getUserId
} from "../../utils/auth";

export default function AddressPage() {

  const [addresses,
    setAddresses] =
    useState([]);

  const [editingId,
    setEditingId] =
    useState(null);

  const [form,
    setForm] =
    useState({

      fullName: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"

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

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const userId =
          getUserId();

        const payload = {

          ...form,

          user: {
            id: userId
          }

        };

        if (editingId) {

          await updateAddress(
            editingId,
            payload
          );

          alert(
            "Address Updated"
          );

        } else {

          await addAddress(
            payload
          );

          alert(
            "Address Added"
          );

        }

        setForm({

          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
          country: "India"

        });

        setEditingId(
          null
        );

        loadAddresses();

      } catch (error) {

        console.error(error);

      }

    };

  const handleEdit =
    (address) => {

      setEditingId(
        address.id
      );

      setForm({

        fullName:
          address.fullName,

        phoneNumber:
          address.phoneNumber,

        addressLine:
          address.addressLine,

        city:
          address.city,

        state:
          address.state,

        pincode:
          address.pincode,

        country:
          address.country

      });

    };

  const handleDelete =
    async (id) => {

      try {

        await deleteAddress(
          id
        );

        alert(
          "Address Deleted"
        );

        loadAddresses();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Addresses
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <form
              onSubmit={
                handleSubmit
              }
              className="
                bg-white
                border
                rounded-2xl
                p-6
              "
            >

              <h2 className="text-2xl font-bold mb-6">

                {editingId
                  ? "Edit Address"
                  : "Add Address"}

              </h2>

              <input
                name="fullName"
                value={
                  form.fullName
                }
                onChange={
                  handleChange
                }
                placeholder="Full Name"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                name="phoneNumber"
                value={
                  form.phoneNumber
                }
                onChange={
                  handleChange
                }
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                name="addressLine"
                value={
                  form.addressLine
                }
                onChange={
                  handleChange
                }
                placeholder="Address Line"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                name="city"
                value={
                  form.city
                }
                onChange={
                  handleChange
                }
                placeholder="City"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                name="state"
                value={
                  form.state
                }
                onChange={
                  handleChange
                }
                placeholder="State"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                name="pincode"
                value={
                  form.pincode
                }
                onChange={
                  handleChange
                }
                placeholder="Pincode"
                className="w-full border p-3 rounded-lg mb-3"
              />

              <button
                className="
                  w-full
                  bg-green-600
                  text-white
                  py-3
                  rounded-lg
                "
              >

                {editingId
                  ? "Update Address"
                  : "Add Address"}

              </button>

            </form>

          </div>

          <div>

            {addresses.map(
              (address) => (

                <div
                  key={
                    address.id
                  }
                  className="
                    border
                    rounded-xl
                    p-4
                    mb-4
                    bg-white
                  "
                >

                  <h3 className="font-bold">
                    {
                      address.fullName
                    }
                  </h3>

                  <p>
                    {
                      address.addressLine
                    }
                  </p>

                  <p>
                    {
                      address.city
                    }, {
                      address.state
                    }
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

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        handleEdit(
                          address
                        )
                      }
                      className="
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Edit
                    </button>

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
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </>
  );
}