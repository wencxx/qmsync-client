import { create } from "zustand";

interface AuthState {
  user: string | null;
  role: "admin" | "user" | null;
  login: (userData: string, userRole: "admin" | "user", token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (requiredRole: "admin" | "user") => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  
  login: (userData, userRole, token) => {
    localStorage.setItem('role', userRole);
    localStorage.setItem('token', token);
    set({ user: userData, role: userRole });
  },
  logout: () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    set({ user: null, role: null });
  },

  isAuthenticated: (): boolean => !!get().user,
  hasRole: (requiredRole): boolean => get().role === requiredRole,
}));
