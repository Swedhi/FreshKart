import axios from "axios";

const API = "http://localhost:8080/api/dashboard";

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    throw error;
  }
};

export const getRecentOrders = async () => {
  try {
    const response = await api.get("/recent-orders");
    return response.data;
  } catch (error) {
    console.error("Recent Orders Error:", error);
    throw error;
  }
};

export const getLowStockProducts = async () => {
  try {
    const response = await api.get("/low-stock");
    return response.data;
  } catch (error) {
    console.error("Low Stock Error:", error);
    throw error;
  }
};

export const getRevenueChart = async () => {
  try {
    const response = await api.get("/revenue-chart");
    return response.data;
  } catch (error) {
    console.error("Revenue Chart Error:", error);
    throw error;
  }
};

export const getTopProducts = async () => {
  try {
    const response = await api.get("/top-products");
    return response.data;
  } catch (error) {
    console.error("Top Products Error:", error);
    throw error;
  }
};

export const getInventoryAlerts = async () => {
  try {
    const response = await api.get("/inventory-alerts");
    return response.data;
  } catch (error) {
    console.error("Inventory Alerts Error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Profile Error:", error);
    throw error;
  }
};