import { env } from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // NOTE: if using ngrok
  // baseURL: `${env.api.next_public_api_url}/api`, //NOTE: using this for dev/prod
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export default api;
