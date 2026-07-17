import { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  getDashboardStats,
  getRevenueChart,
  getTopProducts,
} from "../../api/dashboardApi";

const COLORS = [
  "#22c55e",
  "#16a34a",
  "#4ade80",
  "#65a30d",
  "#15803d",
];

export default function AdminAnalyticsPage() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [revenue, setRevenue] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const [
        statsData,
        revenueData,
        topProducts,
      ] = await Promise.all([
        getDashboardStats(),
        getRevenueChart(),
        getTopProducts(),
      ]);

      setStats(statsData);
      setRevenue(revenueData);
      setProducts(topProducts);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <AdminLayout>
        <div className="text-2xl font-semibold">
          Loading Analytics...
        </div>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Business Overview
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">
              Products
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalProducts}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">
              Orders
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalOrders}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">
              Customers
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalUsers}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">
              Revenue
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              ₹{stats.totalRevenue}
            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
              Monthly Revenue
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={revenue}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>

                <YAxis/>

                <Tooltip/>

                <Bar
                  dataKey="revenue"
                  fill="#22c55e"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

  <h2 className="text-xl font-bold mb-6">
    Top Products
  </h2>

  {products.length === 0 ? (

    <div className="h-[350px] flex items-center justify-center text-gray-500">
      No products available
    </div>

  ) : (

    <ResponsiveContainer width="100%" height={350}>

      <PieChart>

        <Pie
          data={products}
          dataKey="stockQuantity"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >

          {products.map((item, index) => (

            <Cell
              key={item.id}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip
          formatter={(value) => [`${value} Units`, "Stock"]}
        />

      </PieChart>

    </ResponsiveContainer>

  )}

</div>

        </div>

      </div>

    </AdminLayout>

  );

}