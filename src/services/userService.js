import apiClient from "./apiClient";

// 1. Upload Profile Photo (Gallery & Camera Selfie) - PUT /users/me/photo
export const uploadProfilePhoto = async (imageUri) => {
  try {
    const formData = new FormData();
    const filename = imageUri.split("/").pop() || "profile_photo.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("photo", {
      uri: imageUri,
      name: filename,
      type,
    });

    const response = await apiClient.put("/users/me/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.warn("[UPLOAD PROFILE PHOTO API ERROR]:", error);
    throw error;
  }
};

// 2. Select Preset Cricket Avatar - PATCH /users/me/avatar
export const updateUserAvatar = async (avatarId) => {
  try {
    const response = await apiClient.patch("/users/me/avatar", { avatarId });
    return response;
  } catch (error) {
    console.warn("[UPDATE AVATAR API ERROR]:", error);
    throw error;
  }
};

// 3. Update Onboarding Profile Info - PATCH /users/me/profile
export const updateUserProfile = async (profilePayload) => {
  try {
    const allowedKeys = [
      "firstName",
      "lastName",
      "city",
      "gender",
      "dateOfBirth",
      "preferredLanguage",
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

// 4. Get Current User Profile - GET /users/me
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response;
  } catch (error) {
    console.warn("[GET USER PROFILE API ERROR]:", error);
    throw error;
  }
};

export default {
  uploadProfilePhoto,
  updateUserAvatar,
  updateUserProfile,
  getUserProfile,
};
