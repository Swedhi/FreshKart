import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import { addProduct } from "../../../api/productApi";
import { getVendors } from "../../../api/vendorApi";

export default function AdminAddProductPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    vendorId: "",
  });

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name.trim()) {
      alert("Enter product name");
      return;
    }

    if (product.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (product.stockQuantity < 0) {
      alert("Stock cannot be negative");
      return;
    }

    setLoading(true);

    try {
      await addProduct({
        name: product.name,
        category: product.category,
        price: Number(product.price),
        stockQuantity: Number(product.stockQuantity),
        imageUrl: product.imageUrl,

        vendor:
          product.vendorId !== ""
            ? {
                id: Number(product.vendorId),
              }
            : null,
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
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Add Product
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new FreshKart product.
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
                value={product.name}
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
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              >
                <option value="">
                  Select Category
                </option>

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
                value={product.vendorId}
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
                value={product.price}
                onChange={handleChange}
                required
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
                value={product.stockQuantity}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Image URL
              </label>

              <input
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                placeholder="https://..."
              />
            </div>

          </div>

          {product.imageUrl && (
            <div>

              <label className="font-semibold block mb-2">
                Preview
              </label>

              <img
                src={product.imageUrl}
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
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              {loading
                ? "Saving..."
                : "Save Product"}
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