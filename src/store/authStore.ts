import { create } from "zustand";
import { authAPI } from "../services/api.service";
import { setToken as saveToken, removeToken } from "../config/api";

// --- Types ---
interface User {
  id: number;
  email: string;
  name?: string;
  created_at?: string;
  [key: string]: any; // Backend dan qanday user kelishiga qarab o'zgartirishingiz mumkin
}

interface AuthStore {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  logout: () => void;
  getProfile: () => Promise<{
    success: boolean;
    user?: User;
    message?: string;
  }>;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  initializeAuth: () => void;
}

// --- Store ---
export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  isInitialized: false,
  isAuthenticated: !!localStorage.getItem("token"),
  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    removeToken();
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await authAPI.getProfile();
      const user = response.data.data as User;
      set({
        user: user,
        isLoading: false,
        isAuthenticated: true,
      });
      return {
        success: response.data.success,
        user,
        message: response.data.message,
      };
    } catch (error: any) {
      set({
        isLoading: false,
        token: null,
        user: null,
        isAuthenticated: false,
      });
      removeToken();
      return {
        success: false,
        message: error.response?.data?.message || "Failed to get profile",
      };
    }
  },

  setToken: (token: string) => {
    saveToken(token);
    set({ token, isAuthenticated: true });
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    set({
      token,
      isAuthenticated: !!token,
      isInitialized: true,
    });
  },
}));
