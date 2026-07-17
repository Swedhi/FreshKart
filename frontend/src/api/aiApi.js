import axios from "axios";

const API = "http://localhost:8080/api/ai";

export const analyzeImage = async (image) => {

    const formData = new FormData();

    formData.append("image", image);

    const response = await axios.post(
        `${API}/analyze-image`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};