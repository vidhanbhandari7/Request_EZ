import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

export const sendAPI = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/recreq`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};