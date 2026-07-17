import client from "./client";

export const getAllUsers = async () => {
  const response = await client.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await client.get(`/users/${id}`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await client.delete(`/users/${id}`);
  return response.data;
};