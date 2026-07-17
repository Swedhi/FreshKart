import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import {
  getProductById,
  updateProduct,
} from "../../../api/productApi";

import { getVendors } from "../../../api/vendorApi";

export default function EditProductPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [vendors, setVendors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    vendorId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const [product, vendorList] = await Promise.all([
        getProductById(id),
        getVendors(),
      ]);

      setVendors(vendorList);

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stockQuantity: product.stockQuantity || "",
        imageUrl: product.imageUrl || "",
        vendorId:
          product.vendor?.id ??
          product.vendorId ??
          "",
      });

    } catch (err) {
      console.error(err);
      alert("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (formData.stockQuantity < 0) {
      alert("Stock cannot be negative");
      return;
    }

    setSaving(true);

    try {

      await updateProduct(id, {

        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
        imageUrl: formData.imageUrl,

        vendor:
          formData.vendorId !== ""
            ? {
                id: Number(formData.vendorId),
              }
            : null,

      });

      alert("Product Updated Successfully");

      navigate("/admin/products");

    } catch (err) {

      console.error(err);
      alert("Unable to update product.");

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-semibold">
            Loading Product...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update product information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold block mb-2">
                Product Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Dairy</option>
                <option>Bakery</option>
                <option>Groceries</option>
                <option>Beverages</option>
              </select>

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Vendor
              </label>

              <select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >

                <option value="">
                  Select Vendor
                </option>

                {vendors.map((vendor) => (

                  <option
                    key={vendor.id}
                    value={vendor.id}
                  >
                    {vendor.vendorName}
                  </option>

                ))}

              </select>

            </div>

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
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Image URL
              </label>

              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

          </div>

          {formData.imageUrl && (

            <div>

              <label className="font-semibold block mb-2">
                Preview
              </label>

              <img
                src={formData.imageUrl}
                alt=""
                className="w-48 h-48 rounded-xl border object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />

            </div>

          )}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}