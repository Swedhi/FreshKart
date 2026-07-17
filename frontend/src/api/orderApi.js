import client from "./client";

/* ===============================
   Customer APIs
================================ */

// Create Order
export const createOrder = async (orderData) => {
  const response = await client.post("/orders", orderData);
  return response.data;
};

// Checkout
export const checkout = async (userId) => {
  const response = await client.post(`/orders/checkout/${userId}`);
  return response.data;
};

// Get Orders of Logged-in User
export const getOrders = async (userId) => {
  const response = await client.get(`/orders/user/${userId}`);
  return response.data;
};

// Get Order Items
export const getOrderItems = async (orderId) => {
  const response = await client.get(`/orders/${orderId}/items`);
  return response.data;
};

/* ===============================
   Admin APIs
================================ */

// Get All Orders
export const getAllOrders = async () => {
  const response = await client.get("/orders");
  return response.data;
};

// Get Single Order
export const getOrderById = async (id) => {
  const response = await client.get(`/orders/${id}`);
  return response.data;
};

// Update Complete Order
export const updateOrder = async (id, order) => {
  const response = await client.put(`/orders/${id}`, order);
  return response.data;
};

// Update Order Status
// Update Order Status
export const updateOrderStatus = async (id, status) => {
  const response = await client.patch(
    `/orders/${id}/status`,
    null,
    {
      params: { status },
    }
  );

  return response.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const response = await client.delete(`/orders/${id}`);
  return response.data;
};