import client from "./client";

// Add Product
export const addCartItem = async (
  userId,
  productId,
  quantity
) => {

  const response = await client.post("/cart/add", {
    user: {
      id: userId,
    },
    product: {
      id: productId,
    },
    quantity,
  });

  return response.data;
};

// Get Cart
export const getCart = async (userId) => {

  const response = await client.get(`/cart/${userId}`);

  return response.data;

};

// Update Quantity
export const updateCartQuantity = async (
  cartId,
  quantity
) => {

  const response = await client.put(
    `/cart/${cartId}`,
    null,
    {
      params: {
        quantity,
      },
    }
  );

  return response.data;

};

// Remove Item
export const removeCartItem = async (
  cartId
) => {

  const response = await client.delete(
    `/cart/${cartId}`
  );

  return response.data;

};

// Add Multiple Products (for Frequently Bought Together)
export const addMultipleToCart = async (
  userId,
  products
) => {

  for (const product of products) {

    await addCartItem(
      userId,
      product.id,
      1
    );

  }

};