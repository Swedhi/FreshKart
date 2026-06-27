import client from "./client";

export const createOrder =
  async (orderData) => {

    const response =
      await client.post(
        "/orders",
        orderData
      );

    return response.data;

  };

export const getOrders =
  async (userId) => {

    const response =
      await client.get(
        `/orders/user/${userId}`
      );

    return response.data;

  };