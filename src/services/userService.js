import apiClient from "./apiClient";

// ─── Enum Converters (Frontend UI Strings ↔ Backend Enums) ─────────────────
export const mapRoleToBackendEnum = (role) => {
  if (!role) return "ALL_ROUNDER";
  const r = role.toUpperCase();
  if (r.includes("BATTER") || r.includes("BATSMAN")) return "BATTER";
  if (r.includes("BOWLER")) return "BOWLER";
  if (r.includes("WICKET") || r.includes("KEEPER")) return "WICKET_KEEPER";
  return "ALL_ROUNDER";
};

export const mapRoleToUiString = (roleEnum) => {
  if (!roleEnum) return "All-Rounder";
  switch (roleEnum.toUpperCase()) {
    case "BATTER":
      return "Batter";
    case "BOWLER":
      return "Bowler";
    case "WICKET_KEEPER":
      return "Wicket-keeper";
    case "ALL_ROUNDER":
    default:
      return "All-Rounder";
  }
};

export const mapBattingStyleToBackendEnum = (style) => {
  if (!style) return "RIGHT_HAND";
  const s = style.toUpperCase();
  if (s.includes("LEFT")) return "LEFT_HAND";
  return "RIGHT_HAND";
};

export const mapBattingStyleToUiString = (styleEnum) => {
  if (!styleEnum) return "Right-hand bat";
  return styleEnum.toUpperCase() === "LEFT_HAND" ? "Left-hand bat" : "Right-hand bat";
};

export const mapBowlingStyleToBackendEnum = (style) => {
  if (!style || style === "None") return "NONE";
  const s = style.toUpperCase();
  if (s.includes("RIGHT") && s.includes("FAST")) return "RIGHT_ARM_FAST";
  if (s.includes("LEFT") && s.includes("FAST")) return "LEFT_ARM_FAST";
  if (s.includes("RIGHT") && s.includes("MEDIUM")) return "RIGHT_ARM_MEDIUM";
  if (s.includes("LEFT") && s.includes("MEDIUM")) return "LEFT_ARM_MEDIUM";
  if (s.includes("OFF")) return "RIGHT_ARM_OFF_SPIN";
  if (s.includes("ORTHODOX")) return "LEFT_ARM_ORTHODOX";
  if (s.includes("LEG")) return "RIGHT_ARM_LEG_SPIN";
  if (s.includes("CHINAMAN")) return "LEFT_ARM_CHINAMAN";
  return "NONE";
};

export const mapBowlingStyleToUiString = (styleEnum) => {
  if (!styleEnum || styleEnum === "NONE") return "None";
  switch (styleEnum.toUpperCase()) {
    case "RIGHT_ARM_FAST":
      return "Right-arm fast";
    case "LEFT_ARM_FAST":
      return "Left-arm fast";
    case "RIGHT_ARM_MEDIUM":
      return "Right-arm medium";
    case "LEFT_ARM_MEDIUM":
      return "Left-arm medium";
    case "RIGHT_ARM_OFF_SPIN":
      return "Right-arm Off Break";
    case "LEFT_ARM_ORTHODOX":
      return "Slow left-arm orthodox";
    case "RIGHT_ARM_LEG_SPIN":
      return "Right-arm Leg Break";
    case "LEFT_ARM_CHINAMAN":
      return "Slow left-arm chinaman";
    default:
      return "None";
  }
};

// ─── API Methods ─────────────────────────────────────────────────────────────

// 1. Upload Profile Photo - PUT /users/me/photo
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

// 3. Update User Info - PATCH /users/me/profile
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

// 4. Get Current User Basic Profile - GET /users/me
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response;
  } catch (error) {
    console.warn("[GET USER PROFILE API ERROR]:", error);
    throw error;
  }
};

// 5. GET Authenticated Player Profile - GET /users/me/player-profile
export const getPlayerProfile = async () => {
  try {
    const response = await apiClient.get("/users/me/player-profile");
    return response;
  } catch (error) {
    console.warn("[GET PLAYER PROFILE API ERROR]:", error);
    throw error;
  }
};

// 6. PATCH Create / Update Player Profile - PATCH /users/me/player-profile
export const updatePlayerProfile = async (playerProfilePayload) => {
  try {
    const response = await apiClient.patch("/users/me/player-profile", playerProfilePayload);
    return response;
  } catch (error) {
    console.warn("[UPDATE PLAYER PROFILE API ERROR]:", error);
    throw error;
  }
};

export default {
  uploadProfilePhoto,
  updateUserAvatar,
  updateUserProfile,
  getUserProfile,
  getPlayerProfile,
  updatePlayerProfile,
  mapRoleToBackendEnum,
  mapRoleToUiString,
  mapBattingStyleToBackendEnum,
  mapBattingStyleToUiString,
  mapBowlingStyleToBackendEnum,
  mapBowlingStyleToUiString,
};
