import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import { addProduct } from "../../../api/productApi";

export default function AddProductPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await addProduct({
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(
          formData.stockQuantity
        ),
      });

      alert("Product Added Successfully");

      navigate("/admin/products");

    } catch (error) {

      console.error(error);

      alert("Unable to add product");

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="font-semibold block mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <label className="font-semibold block mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />

            </div>

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Image URL
            </label>

            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="
                bg-green-600
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
              "
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="
                bg-gray-300
                px-8
                py-3
                rounded-xl
                font-semibold
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}