import client from "./client";

export const getRecommendations = async (productId) => {

    console.log("Calling API for product:", productId);

    const response = await client.get(`/recommendations/${productId}`);

    console.log("API Response:", response.data);

    return response.data;
};