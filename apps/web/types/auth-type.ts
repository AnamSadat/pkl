import { User } from "@/types";

export type AuthState = {
  user: User | null;
  loading: boolean;
  hasFetched: boolean;
};

export type AuthActions = {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  reset: () => void;
};

export type AuthStore = AuthState & AuthActions;
