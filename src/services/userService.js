import apiClient from "./apiClient";

/**
 * User Profile API Service Module
 * Connects to /api/v1/users Endpoints
 */

// 1. Get Authenticated User Profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response;
  } catch (error) {
    console.warn("[GET USER PROFILE API ERROR]:", error);
    throw error;
  }
};

// 2. Update User Profile (Onboarding / Profile Edit)
export const updateUserProfile = async (profilePayload) => {
  try {
    // Sanitize payload to ONLY send fields supported by Backend schema
    const allowedKeys = [
      "firstName",
      "lastName",
      "city",
      "gender",
      "dateOfBirth",
      "avatarId",
      "preferredLanguage",
      "profileImageUrl",
    ];

    const cleanPayload = {};
    Object.keys(profilePayload || {}).forEach((key) => {
      if (allowedKeys.includes(key) && profilePayload[key] !== undefined && profilePayload[key] !== null) {
        cleanPayload[key] = profilePayload[key];
      }
    });

    const response = await apiClient.patch("/users/me/profile", cleanPayload);
    return response;
  } catch (error) {
    console.warn("[UPDATE USER PROFILE API ERROR]:", error);
    throw error;
  }
};

export default {
  getUserProfile,
  updateUserProfile,
};
