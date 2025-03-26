import { create } from "zustand";

interface AuthState {
  user: string | null;
  role: "admin" | "user" | null;
  login: (userData: string, userRole: "admin" | "user") => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (requiredRole: "admin" | "user") => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  
  login: (userData, userRole) => set({ user: userData, role: userRole }),
  logout: () => set({ user: null, role: null }),

  isAuthenticated: () => !!useAuthStore.getState().user,
  hasRole: (requiredRole) => useAuthStore.getState().role === requiredRole,
}));
