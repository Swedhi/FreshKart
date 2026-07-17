import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  getDashboardStats,
  getRevenueChart,
  getRecentOrders,
  getLowStockProducts,
  getInventoryAlerts,
} from "../../../api/dashboardApi";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getDashboardStats();
      const chartData = await getRevenueChart();
      const orders = await getRecentOrders();
      const lowProducts = await getLowStockProducts();
      const inventory = await getInventoryAlerts();

      setStats({
        revenue: statsData.revenue ?? 0,
        totalOrders: statsData.totalOrders ?? 0,
        totalProducts: statsData.totalProducts ?? 0,
        totalUsers: statsData.totalUsers ?? 0,
      });

      setRevenueData(chartData);
      setRecentOrders(orders);
      setLowStock(lowProducts);
      setAlerts(inventory);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="text-3xl">Loading Dashboard...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Admin
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Total Revenue</h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            ₹{stats.revenue}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Orders</h2>

          <p className="text-3xl font-bold mt-3">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Products</h2>

          <p className="text-3xl font-bold mt-3">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Customers</h2>

          <p className="text-3xl font-bold mt-3">
            {stats.totalUsers}
          </p>
        </div>

      </div>

      {/* Revenue Chart */}

      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Revenue Overview
        </h2>

        <div className="h-96">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Date</th>
            </tr>

          </thead>

          <tbody>

            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">

                <td className="py-3">{order.id}</td>

                <td>{order.userEmail}</td>

                <td>₹{order.totalPrice}</td>

                <td>
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Low Stock */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Low Stock Products
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Stock</th>
              </tr>

            </thead>

            <tbody>

              {lowStock.map((product) => (
                <tr key={product.id} className="border-b">

                  <td className="py-3">
                    {product.name}
                  </td>

                  <td className="text-red-600 font-bold">
                    {product.stockQuantity}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Inventory Alerts */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Inventory Alerts
          </h2>

          {alerts.length === 0 ? (
            <p className="text-green-600">
              No alerts 🎉
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.productId}
                className="border rounded-xl p-4 mb-3 bg-red-50"
              >
                <p className="font-semibold">
                  {alert.productName}
                </p>

                <p className="text-red-600">
                  {alert.alertMessage}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {alert.stockQuantity}
                </p>
              </div>
            ))
          )}

        </div>

      </div>

    </AdminLayout>
  );
}