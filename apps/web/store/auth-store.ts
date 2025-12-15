"use client";

import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import Cookies from "js-cookie";
import api from "@/lib/axios";
import { env, isProduction } from "@/config";
import { STORAGE_KEYS } from "@/constants";
import { AxiosError } from "axios";
import { AuthState, AuthStore, User } from "@/types";

const initialState: AuthState = {
  user: null,
  loading: true,
  hasFetched: false,
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  ...initialState,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  // login
  login: async (credentials) => {
    try {
      set({ loading: true });

      const response = await api.post<{ access_token: string; user: User }>(
        "/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      const token = response.data.access_token;
      Cookies.set(STORAGE_KEYS.token, token, {
        secure: isProduction ? env.auth.cookie_secure === "true" : false,
        sameSite: (isProduction
          ? env.auth.cookie_samesite || "Strict"
          : "Lax") as "Strict" | "Lax" | "None",
        expires: 1,
      });

      set({ user: response.data.user });
      return { success: true, message: "Login berhasil" };
    } catch (err) {
      const error = err as AxiosError<{ detail?: string; message?: string }>;
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Login gagal, periksa kembali email dan password";

      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // logout
  logout: () => {
    Cookies.remove(STORAGE_KEYS.token);
    set({ user: null });
  },

  fetchUser: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;

    set({ hasFetched: true });

    try {
      set({ loading: true });

      const token = Cookies.get(STORAGE_KEYS.token);

      if (!token) {
        set({ user: null });
        return;
      }

      const response = await api.get<User>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.email) {
        set({ user: response.data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.warn("Fetch user gagal:", err);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set(initialState),
}));

// Selector hooks dengan shallow comparison untuk optimasi re-render
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthActions = () =>
  useAuthStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
      fetchUser: state.fetchUser,
    }))
  );

// Main hook - auto fetch user on firt calling
export const useAuth = () => {
  const store = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      login: state.login,
      logout: state.logout,
      fetchUser: state.fetchUser,
      hasFetched: state.hasFetched,
    }))
  );

  // Auto fetch user on first call (client-side only)
  if (typeof window !== "undefined" && !store.hasFetched) {
    store.fetchUser();
  }

  return {
    user: store.user,
    loading: store.loading,
    login: store.login,
    logout: store.logout,
  };
};
