import axios from "axios";
import { getItem } from "../utils/storage";

// Base API URL from .env or fallback
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1. Request Interceptor: Automatically Attach Bearer Auth Token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getItem("auth-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("[API CLIENT REQUEST TOKEN ERROR]:", err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Centralized Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let formattedError = {
      message: "An unexpected error occurred. Please try again.",
      status: 500,
      originalError: error,
    };

    if (error.response) {
      // Server Responded with Error Code
      const status = error.response.status;
      const data = error.response.data;

      formattedError.status = status;
      formattedError.message = data?.message || data?.error || `Server Error (${status})`;

      if (status === 401) {
        formattedError.message = "Session expired. Please login again.";
      } else if (status === 403) {
        formattedError.message = "Access denied. You don't have permission.";
      } else if (status === 404) {
        formattedError.message = "Requested resource not found.";
      }
    } else if (error.request) {
      // Network Disconnected / No Response Received
      formattedError.status = 0;
      formattedError.message =
        "Network connection error. Please check your internet connection.";
    }

    if (__DEV__) {
      console.warn("[API ERROR CATCH]:", formattedError.message, formattedError.status);
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
