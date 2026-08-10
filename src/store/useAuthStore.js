import createStore from "./createStore";
import { getItem, setItem, removeItem } from "../utils/storage";

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

  // Update User Profile
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
