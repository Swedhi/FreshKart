import axios from "axios";

const API =
  "http://localhost:8080/api/products";

export const getAllProducts = async () => {

  const response =
    await axios.get(API);

  return response.data;
};

export const getProductById = async (
  id
) => {

  const response =
    await axios.get(
      `${API}/${id}`
    );

  return response.data;
};

export const getFeaturedProducts =
  async () => {

    const response =
      await axios.get(API);

    return response.data.slice(
      0,
      8
    );
  };

export const getRelatedProducts =
  async (id) => {

    const response =
      await axios.get(API);

    return response.data.filter(
      (p) =>
        p.id !== Number(id)
    );
  };
  export const addProduct = async (product) => {

  const response =
    await axios.post(
      API,
      product
    );

  return response.data;

};

export const updateProduct = async (
  id,
  product
) => {

  const response =
    await axios.put(
      `${API}/${id}`,
      product
    );

  return response.data;

};

export const deleteProduct = async (
  id
) => {

  const response =
    await axios.delete(
      `${API}/${id}`
    );

  return response.data;

};