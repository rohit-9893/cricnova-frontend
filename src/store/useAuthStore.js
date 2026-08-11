import createStore from "./createStore";
import { getItem, setItem, removeItem } from "../utils/storage";
import { getUserProfile, updateUserProfile, uploadProfilePhoto, updateUserAvatar } from "../services/userService";

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

  // Fetch Live Profile from Backend API (`GET /users/me`)
  fetchProfileApi: async () => {
    try {
      const res = await getUserProfile();
      const userData = res?.data || res?.user || res;
      if (userData) {
        const currentUser = get().user || {};
        const mergedUser = { ...currentUser, ...userData };
        await setItem("user-profile", JSON.stringify(mergedUser));
        set({ user: mergedUser, isAuthenticated: true });
      }
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

  // Update Profile on Backend API (`PATCH /users/me/profile`)
  updateProfileApi: async (profilePayload) => {
    try {
      const res = await updateUserProfile(profilePayload);
      const updatedData = res?.data || res?.user || profilePayload;
      const currentUser = get().user || {};
      const mergedUser = { ...currentUser, ...updatedData, isRegistered: true };

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
