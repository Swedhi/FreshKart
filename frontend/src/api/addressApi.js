import axios from "axios";

const API =
  "http://localhost:8080/api/addresses";

export const getAddresses = async (
  userId
) => {

  const response =
    await axios.get(
      `${API}/${userId}`
    );

  return response.data;
};

export const addAddress = async (
  address
) => {

  const response =
    await axios.post(
      API,
      address
    );

  return response.data;
};

export const updateAddress = async (
  addressId,
  address
) => {

  const response =
    await axios.put(
      `${API}/${addressId}`,
      address
    );

  return response.data;
};

export const deleteAddress = async (
  addressId
) => {

  await axios.delete(
    `${API}/${addressId}`
  );
};