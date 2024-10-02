import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://procar-marketplace-api.netlify.app";
const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
