import createStore from "./createStore";
import { getItem, setItem, removeItem } from "../utils/storage";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
  updateUserAvatar,
  getPlayerProfile,
  updatePlayerProfile,
  mapRoleToBackendEnum,
  mapRoleToUiString,
  mapBattingStyleToBackendEnum,
  mapBattingStyleToUiString,
  mapBowlingStyleToBackendEnum,
  mapBowlingStyleToUiString,
} from "../services/userService";

export const useAuthStore = createStore((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // Initialize auth state from local storage
  initializeAuth: async () => {
    try {
      const storedToken = await getItem("auth-token");
      const storedUserRaw = await getItem("user-profile");
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

      set({
        token: storedToken || null,
        user: storedUser || null,
        isAuthenticated: Boolean(storedToken || (storedUser && storedUser.isRegistered)),
        isLoading: false,
      });

      // If token exists, sync live profile in background
      if (storedToken) {
        get().fetchProfileApi();
      }
    } catch (err) {
      console.warn("[AUTH STORE INIT ERROR]:", err);
      set({ isLoading: false });
    }
  },

  // Set Auth Token & User
  setAuth: async (token, user) => {
    if (token) await setItem("auth-token", token);
    if (user) await setItem("user-profile", JSON.stringify(user));

    set({
      token: token || get().token,
      user: user || get().user,
      isAuthenticated: true,
    });
  },

  // Fetch Live Profile from Backend API (`GET /users/me` & `GET /users/me/player-profile`)
  fetchProfileApi: async () => {
    try {
      const currentUser = get().user || {};
      let mergedUser = { ...currentUser };

      // 1. Fetch Basic User Profile
      try {
        const resUser = await getUserProfile();
        const userData = resUser?.data || resUser?.user || resUser;
        if (userData) {
          mergedUser = {
            ...mergedUser,
            ...userData,
            // ✅ Preserve local-only flags that backend does NOT return
            isRegistered: mergedUser.isRegistered || userData.isRegistered || false,
          };
        }
      } catch (userErr) {
        console.warn("[GET USER PROFILE API NOTICE]:", userErr?.message || userErr);
      }

      // 2. Fetch Player Profile Module (GET /users/me/player-profile)
      try {
        const resPlayer = await getPlayerProfile();
        const playerData = resPlayer?.data || resPlayer?.playerProfile || resPlayer;
        if (playerData) {
          mergedUser = {
            ...mergedUser,
            playerProfileId: playerData.id,
            fullName: playerData.displayName || mergedUser.fullName || mergedUser.name,
            name: playerData.displayName || mergedUser.name || mergedUser.fullName,
            playingRole: mapRoleToUiString(playerData.playingRole),
            battingStyle: mapBattingStyleToUiString(playerData.battingStyle),
            bowlingStyle: mapBowlingStyleToUiString(playerData.bowlingStyle),
            bio: playerData.bio || mergedUser.bio,
            playingRoleEnum: playerData.playingRole,
            battingStyleEnum: playerData.battingStyle,
            bowlingStyleEnum: playerData.bowlingStyle,
          };
        }
      } catch (playerErr) {
        console.warn("[GET PLAYER PROFILE API NOTICE]:", playerErr?.message || playerErr);
      }

      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser, isAuthenticated: true });
    } catch (err) {
      console.warn("[FETCH PROFILE API NOTICE]:", err?.message || err);
    }
  },

  // Upload Profile Photo (`PUT /users/me/photo`)
  uploadPhotoApi: async (imageUri) => {
    try {
      const res = await uploadProfilePhoto(imageUri);
      const updatedData = res?.data || res?.user || {};
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, ...updatedData, profileImageUrl: updatedData.profileImageUrl || imageUri };

      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser, isAuthenticated: true });
      return mergedUser;
    } catch (err) {
      console.warn("[UPLOAD PHOTO API NOTICE]:", err?.message || err);
      // Fallback local save if offline
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, profileImageUrl: imageUri };
      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser });
      return mergedUser;
    }
  },

  // Select Preset Avatar (`PATCH /users/me/avatar`)
  updateAvatarApi: async (avatarId) => {
    try {
      const res = await updateUserAvatar(avatarId);
      const updatedData = res?.data || res?.user || {};
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, ...updatedData, avatarId };

      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser });
      return mergedUser;
    } catch (err) {
      console.warn("[UPDATE AVATAR API NOTICE]:", err?.message || err);
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, avatarId };
      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser });
      return mergedUser;
    }
  },

  // Update Profile on Backend API (`PATCH /users/me/profile` & `PATCH /users/me/player-profile`)
  updateProfileApi: async (profilePayload) => {
    try {
      const currentUser = get().user || {};
      let mergedUser = { ...currentUser, ...profilePayload, isRegistered: true };

      // 1. Send Basic User Info (PATCH /users/me/profile)
      try {
        const resUser = await updateUserProfile(profilePayload);
        const updatedUserData = resUser?.data || resUser?.user || {};
        mergedUser = { ...mergedUser, ...updatedUserData };
      } catch (userErr) {
        console.warn("[UPDATE USER PROFILE API NOTICE]:", userErr?.message || userErr);
      }

      // 2. Send Player Profile Module Contract (PATCH /users/me/player-profile)
      try {
        const playerContractPayload = {
          displayName: profilePayload.fullName || profilePayload.name || currentUser.fullName || currentUser.name || "Cricketer",
          playingRole: mapRoleToBackendEnum(profilePayload.playingRole || currentUser.playingRole),
          battingStyle: mapBattingStyleToBackendEnum(profilePayload.battingStyle || currentUser.battingStyle),
          bowlingStyle: mapBowlingStyleToBackendEnum(profilePayload.bowlingStyle || currentUser.bowlingStyle),
          bio: profilePayload.bio || currentUser.bio || "Passionate Cricketer",
        };

        const resPlayer = await updatePlayerProfile(playerContractPayload);
        const updatedPlayerData = resPlayer?.data || resPlayer?.playerProfile || resPlayer;

        if (updatedPlayerData) {
          mergedUser = {
            ...mergedUser,
            playerProfileId: updatedPlayerData.id,
            fullName: updatedPlayerData.displayName || mergedUser.fullName,
            name: updatedPlayerData.displayName || mergedUser.name,
            playingRole: mapRoleToUiString(updatedPlayerData.playingRole),
            battingStyle: mapBattingStyleToUiString(updatedPlayerData.battingStyle),
            bowlingStyle: mapBowlingStyleToUiString(updatedPlayerData.bowlingStyle),
            bio: updatedPlayerData.bio || mergedUser.bio,
            playingRoleEnum: updatedPlayerData.playingRole,
            battingStyleEnum: updatedPlayerData.battingStyle,
            bowlingStyleEnum: updatedPlayerData.bowlingStyle,
          };
        }
      } catch (playerErr) {
        console.warn("[UPDATE PLAYER PROFILE API NOTICE]:", playerErr?.message || playerErr);
      }

      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser, isAuthenticated: true });
      return mergedUser;
    } catch (err) {
      console.warn("[UPDATE PROFILE API NOTICE]:", err?.message || err);
      // Fallback to local save if offline
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, ...profilePayload, isRegistered: true };
      await setItem("user-profile", JSON.stringify(mergedUser));
      set({ user: mergedUser, isAuthenticated: true });
      return mergedUser;
    }
  },

  // Update User Profile (Local helper)
  updateUser: async (partialUser) => {
    const currentUser = get().user || {};
    const updated = { ...currentUser, ...partialUser };
    await setItem("user-profile", JSON.stringify(updated));
    set({ user: updated });
  },

  // Clear Session / Logout
  logout: async () => {
    await removeItem("auth-token");
    await removeItem("refresh-token");
    await removeItem("user-profile");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
