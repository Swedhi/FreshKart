import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getVendorById } from "../../../api/vendorApi";

export default function AdminVendorDetailsPage() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendor();
  }, []);

  const loadVendor = async () => {
    try {
      const data = await getVendorById(id);
      setVendor(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h2 className="text-2xl font-semibold">
          Loading Vendor...
        </h2>
      </AdminLayout>
    );
  }

  if (!vendor) {
    return (
      <AdminLayout>
        <h2 className="text-2xl font-semibold text-red-600">
          Vendor not found
        </h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            {vendor.vendorName}
          </h1>

          <p className="text-gray-500 mt-2">
            Vendor Details
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Products</p>

            <h2 className="text-3xl font-bold mt-2">
              {vendor.totalProducts ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Orders</p>

            <h2 className="text-3xl font-bold mt-2">
              {vendor.totalOrders ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Revenue</p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              ₹{vendor.totalRevenue ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Status</p>

            <span
              className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${
                vendor.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {vendor.status}
            </span>
          </div>

        </div>

        {/* Vendor Info */}
        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Vendor Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Vendor Name</p>
              <p className="font-semibold mt-1">
                {vendor.vendorName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Owner</p>
              <p className="font-semibold mt-1">
                {vendor.ownerName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold mt-1">
                {vendor.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-semibold mt-1">
                {vendor.phone}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Address</p>
              <p className="font-semibold mt-1">
                {vendor.address}
              </p>
            </div>

          </div>

        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Assigned Products
          </h2>

          {vendor.products?.length ? (
            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-center">Stock</th>
                  <th className="p-4 text-right">Price</th>
                </tr>

              </thead>

              <tbody>

                {vendor.products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4 text-center">
                      {product.stockQuantity}
                    </td>

                    <td className="p-4 text-right">
                      ₹{product.price}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          ) : (
            <p className="text-gray-500">
              No products assigned.
            </p>
          )}

        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          {vendor.orders?.length ? (
            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="p-4 text-left">Order</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Status</th>
                </tr>

              </thead>

              <tbody>

                {vendor.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b"
                  >
                    <td className="p-4">
                      #{order.id}
                    </td>

                    <td className="p-4">
                      {order.customerName}
                    </td>

                    <td className="p-4 text-right">
                      ₹{order.total}
                    </td>

                    <td className="p-4 text-center">
                      {order.status}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          ) : (
            <p className="text-gray-500">
              No recent orders.
            </p>
          )}

        </div>

      </div>
    </AdminLayout>
  );
}