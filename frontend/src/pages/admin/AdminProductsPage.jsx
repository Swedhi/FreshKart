import { useEffect, useState } from "react";
import client from "../../api/client";
import Navbar from "../../layouts/Navbar";

export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const response = await client.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

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

    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Product Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all products in FreshKart
            </p>

          </div>

          <button
            className="
              bg-green-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            + Add Product
          </button>

        </div>

        {loading ? (

          <h2 className="text-xl">
            Loading Products...
          </h2>

        ) : (

          <div className="overflow-x-auto bg-white rounded-2xl shadow">

            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-left">
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
                    className="border-b"
                  >

                    <td className="p-4">
                      {product.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4">
                      ₹{product.price}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          ${
                            product.stockQuantity < 20
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {product.stockQuantity}
                      </span>

                    </td>

                    <td className="p-4 flex justify-center gap-3">

                      <button
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
                          deleteProduct(product.id)
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

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>

  );

}