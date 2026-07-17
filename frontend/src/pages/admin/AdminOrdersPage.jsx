import { useEffect, useMemo, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../api/orderApi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getAllOrders();

      setOrders(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error(error);
      alert("Unable to load orders");

    } finally {

      setLoading(false);

    }
  };

  const handleStatusChange = async (id, status) => {

    try {

      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );

    } catch (error) {

      console.error(error);
      alert("Unable to update status");

    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this order?")) return;

    try {

      await deleteOrder(id);

      setOrders((prev) =>
        prev.filter((order) => order.id !== id)
      );

      alert("Order deleted successfully");

    } catch (error) {

      console.error(error);
      alert("Unable to delete order");

    }
  };

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      const matchesSearch =
        order.id?.toString().includes(search) ||
        order.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [orders, search, statusFilter]);

  if (loading) {

    return (
      <AdminLayout>
        <div className="text-2xl font-semibold">
          Loading Orders...
        </div>
      </AdminLayout>
    );

  }

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Order Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all customer orders
            </p>

          </div>

          <button
            onClick={loadOrders}
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
          >
            Refresh
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search by Order ID or Customer Email"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-10 text-gray-500"
                  >
                    No Orders Found
                  </td>

                </tr>

              ) : (

                filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      #{order.id}
                    </td>

                    <td className="p-4">
                      {order.user?.email ?? "Guest"}
                    </td>

                    <td className="p-4">
                      ₹{order.totalPrice}
                    </td>

                    <td className="p-4">
                      {order.paymentMethod ?? "COD"}
                    </td>

                    <td className="p-4">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    <td className="p-4">

                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          handleDelete(order.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}