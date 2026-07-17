import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getInventory,
  updateStock,
} from "../../../api/inventoryApi";

export default function AdminInventoryPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [savingId, setSavingId] = useState(null);
  const [stockValues, setStockValues] = useState({});

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {

    try {

      const data = await getInventory();

      setProducts(data);

      const stocks = {};

      data.forEach((product) => {
        stocks[product.id] = product.stockQuantity;
      });

      setStockValues(stocks);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleSaveStock = async (productId) => {

    try {

      setSavingId(productId);

      await updateStock(
        productId,
        stockValues[productId]
      );

      await loadInventory();

      alert("Stock updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to update stock.");

    } finally {

      setSavingId(null);

    }

  };

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [products, search]);

  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) =>
      product.stockQuantity > 0 &&
      product.stockQuantity <= 10
  ).length;

  const outOfStock = products.filter(
    (product) => product.stockQuantity === 0
  ).length;

  if (loading) {

    return (
      <AdminLayout>
        <h2 className="text-2xl font-semibold">
          Loading Inventory...
        </h2>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Inventory Management
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor and manage stock levels
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">
            Total Products
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalProducts}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl shadow p-6">
          <h3 className="text-yellow-700">
            Low Stock
          </h3>

          <p className="text-3xl font-bold mt-2 text-yellow-700">
            {lowStock}
          </p>
        </div>

        <div className="bg-red-50 border border-red-300 rounded-2xl shadow p-6">
          <h3 className="text-red-700">
            Out of Stock
          </h3>

          <p className="text-3xl font-bold mt-2 text-red-700">
            {outOfStock}
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  #{product.id}
                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <input
                    type="number"
                    min="0"
                    value={
                      stockValues[product.id] ?? ""
                    }
                    onChange={(e) =>
                      setStockValues({
                        ...stockValues,
                        [product.id]:
                          Number(e.target.value),
                      })
                    }
                    className="w-24 border rounded-lg px-3 py-2 text-center"
                  />

                </td>

                <td className="p-4">

                  {stockValues[product.id] === 0 ? (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>

                  ) : stockValues[product.id] <= 10 ? (

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Low Stock
                    </span>

                  ) : (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock
                    </span>

                  )}

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      handleSaveStock(product.id)
                    }
                    disabled={
                      savingId === product.id
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >

                    {savingId === product.id
                      ? "Saving..."
                      : "Save"}

                  </button>

                </td>

              </tr>

            ))}

            {filteredProducts.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}