import client from "./client";

// Get All Categories
export const getCategories = async () => {
  const response = await client.get("/categories");
  return response.data;
};

// Get Category By Id
export const getCategoryById = async (id) => {
  const response = await client.get(`/categories/${id}`);
  return response.data;
};

// Create Category
export const createCategory = async (category) => {
  const response = await client.post("/categories", category);
  return response.data;
};

// Update Category
export const updateCategory = async (id, category) => {
  const response = await client.put(
    `/categories/${id}`,
    category
  );

  return response.data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const response = await client.delete(
    `/categories/${id}`
  );

  return response.data;
};