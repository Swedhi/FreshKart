import axios from "axios";

const API = "http://localhost:8080/api/payment";

export const createPaymentOrder = async (amount) => {
  const response = await axios.post(`${API}/create-order`, {
    amount,
  });

  return response.data;
};