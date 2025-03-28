import { create } from "zustand";
import { UserData, UserRole } from '@/types/user'

interface AuthState {
  user: UserData | null;
  role: UserRole | null;
  token: string | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (requiredRole: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: localStorage.getItem('role') as UserRole || null,
  token: localStorage.getItem('token'),
  
  login: (userData) => {
    set({ user: userData, role: userData.role, token: userData.token });
  },
  logout: () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    set({ user: null, role: null, token: null });
  },

  isAuthenticated: (): boolean => !!get().token,
  hasRole: (requiredRole): boolean => get().role === requiredRole,
}));
