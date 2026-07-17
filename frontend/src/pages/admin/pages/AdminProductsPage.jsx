import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import client from "../../../api/client";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await client.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await client.delete(`/products/${id}`);

      loadProducts();

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Product Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all FreshKart products
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Add Product
          </button>

        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-lg">
            Loading Products...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">

            <table className="min-w-full">

              <thead className="bg-green-600 text-white">

                <tr>

                  <th className="p-4 text-left">ID</th>

                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Vendor
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-center">
                    Stock
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {product.id}
                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            product.imageUrl ||
                            "https://via.placeholder.com/60"
                          }
                          alt={product.name}
                          className="w-14 h-14 rounded-lg border object-cover"
                        />

                        <div>

                          <h2 className="font-semibold">
                            {product.name}
                          </h2>

                          <p className="text-gray-500 text-sm">
                            #{product.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4 font-medium">
                      {product.vendorName || "-"}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{product.price}
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          product.stockQuantity === 0
                            ? "bg-red-100 text-red-700"
                            : product.stockQuantity < 20
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stockQuantity === 0
                          ? "Out of Stock"
                          : product.stockQuantity < 20
                          ? `Low (${product.stockQuantity})`
                          : `${product.stockQuantity} Units`}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/products/edit/${product.id}`
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}