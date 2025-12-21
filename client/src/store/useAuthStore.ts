import { create } from "zustand";
import { authService } from "@/features/auth/services/authService";
import { ApiError } from "@/lib/api";

export type UserRole = "Admin" | "Seller" | "Buyer" | "DeliveryBoy";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  initialize: () => void;
}

// Load from localStorage on initialization
const loadAuthFromStorage = (): { user: User | null; token: string | null } => {
  try {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        token: parsed.token,
      };
    }
  } catch (error) {
    console.error("Failed to load auth from storage:", error);
  }
  return { user: null, token: null };
};

// Save to localStorage
const saveAuthToStorage = (user: User | null, token: string | null) => {
  try {
    localStorage.setItem("auth-storage", JSON.stringify({ user, token }));
  } catch (error) {
    console.error("Failed to save auth to storage:", error);
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize from storage
  const { user, token } = loadAuthFromStorage();

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading: false,
    error: null,

    initialize: () => {
      const { user, token } = loadAuthFromStorage();
      set({ user, token, isAuthenticated: !!user && !!token });
    },

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.login({ email, password });
        const user = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role as UserRole,
        };
        saveAuthToStorage(user, response.token);
        set({
          user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Login failed. Please try again.";
        set({
          isLoading: false,
          error: message,
          isAuthenticated: false,
        });
        throw error;
      }
    },

    register: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      role = "Buyer"
    ) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.register({
          firstName,
          lastName,
          email,
          password,
          role,
        });
        const user = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role as UserRole,
        };
        saveAuthToStorage(user, response.token);
        set({
          user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Registration failed. Please try again.";
        set({
          isLoading: false,
          error: message,
          isAuthenticated: false,
        });
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem("auth-storage");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    },

    clearError: () => set({ error: null }),

    hasRole: (roles: UserRole[]) => {
      const user = get().user;
      if (!user) return false;
      return roles.includes(user.role);
    },
  };
});
