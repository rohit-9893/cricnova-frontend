import apiClient from "./apiClient";
import { setItem, removeItem, getItem } from "../utils/storage";

/**
 * Authentication Service Module for CricNovas Backend API
 * Connects directly to Live Auth Endpoints:
 * - Health Check: GET /auth/health
 * - Send OTP: POST /auth/send-otp
 * - Verify OTP: POST /auth/verify-otp
 * - Refresh Token: POST /auth/refresh-token
 * - Get Profile: GET /auth/me
 * - Logout: POST /auth/logout
 * - Logout All: POST /auth/logout-all
 */

export const healthCheck = async () => {
  try {
    const response = await apiClient.get("/auth/health");
    return response;
  } catch (error) {
    console.warn("[AUTH HEALTH CHECK ERROR]:", error);
    throw error;
  }
};

export const sendOtp = async (inputMobile) => {
  const digitsOnly = String(inputMobile).replace(/[^0-9]/g, "");
  const tenDigitMobile = digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
  const formattedWithCode = digitsOnly.length === 10 ? `+91${digitsOnly}` : `+${digitsOnly}`;

  try {
    const response = await apiClient.post("/auth/send-otp", {
      mobile: tenDigitMobile,
      mobileNumber: tenDigitMobile,
      phoneNumber: formattedWithCode,
      phone: tenDigitMobile,
    });
    return response;
  } catch (error) {
    console.warn("[SEND OTP ERROR]:", error);
    throw error;
  }
};

export const verifyOtp = async (inputMobile, otp) => {
  const digitsOnly = String(inputMobile).replace(/[^0-9]/g, "");
  const tenDigitMobile = digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
  const formattedWithCode = digitsOnly.length === 10 ? `+91${digitsOnly}` : `+${digitsOnly}`;
  const cleanOtp = String(otp).trim();

  try {
    const response = await apiClient.post("/auth/verify-otp", {
      mobile: tenDigitMobile,
      mobileNumber: tenDigitMobile,
      phoneNumber: formattedWithCode,
      phone: tenDigitMobile,
      otp: cleanOtp,
      code: cleanOtp,
    });

    // Save tokens if returned in API response
    if (response?.token || response?.accessToken) {
      await setItem("auth-token", response.token || response.accessToken);
    }
    if (response?.refreshToken) {
      await setItem("refresh-token", response.refreshToken);
    }
    if (response?.user) {
      await setItem("user-profile", JSON.stringify(response.user));
    }

    return response;
  } catch (error) {
    console.warn("[VERIFY OTP ERROR]:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const storedRefreshToken = await getItem("refresh-token");
    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken: storedRefreshToken,
    });

    if (response?.token || response?.accessToken) {
      await setItem("auth-token", response.token || response.accessToken);
    }
    return response;
  } catch (error) {
    console.warn("[REFRESH TOKEN ERROR]:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    if (response?.user || response?.data) {
      await setItem("user-profile", JSON.stringify(response.user || response.data));
    }
    return response;
  } catch (error) {
    console.warn("[GET PROFILE ERROR]:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (error) {
    console.warn("[LOGOUT API WARNING]:", error);
  } finally {
    await removeItem("auth-token");
    await removeItem("refresh-token");
    await removeItem("user-profile");
  }
};

export const logoutAll = async () => {
  try {
    await apiClient.post("/auth/logout-all");
  } catch (error) {
    console.warn("[LOGOUT ALL API WARNING]:", error);
  } finally {
    await removeItem("auth-token");
    await removeItem("refresh-token");
    await removeItem("user-profile");
  }
};

export default {
  healthCheck,
  sendOtp,
  verifyOtp,
  refreshToken,
  getProfile,
  logout,
  logoutAll,
};
