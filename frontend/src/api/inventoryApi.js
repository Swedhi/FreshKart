import client from "./client";

// Inventory List
export const getInventory = async () => {
  const response = await client.get("/products");
  return response.data;
};

// Update Stock
export const updateStock = async (id, stock) => {
  const response = await client.patch(
    `/products/${id}/stock?stock=${stock}`
  );

  return response.data;
};

// Inventory Logs
export const getInventoryLogs = async () => {
  const response = await client.get("/inventory-logs");
  return response.data;
};

// Dashboard
export const getLowStock = async () => {
  const response = await client.get("/dashboard/low-stock");
  return response.data;
};

export const getInventoryAlerts = async () => {
  const response = await client.get("/dashboard/inventory-alerts");
  return response.data;
};