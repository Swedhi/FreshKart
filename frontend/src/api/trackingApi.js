import axios from "axios";

const API = "http://localhost:8080/api/orders";

export const getOrderTracking = async (orderId) => {

    const response = await axios.get(
        `${API}/${orderId}/tracking`
    );

    return response.data;

};