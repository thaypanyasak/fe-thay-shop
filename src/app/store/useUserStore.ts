import { create } from "zustand";
import { User } from "../types/user";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => {
  let storedUser: User | null = null;
  let storedToken: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const userStr = localStorage.getItem("user");
      const tokenStr = localStorage.getItem("token");

      if (userStr && tokenStr) {
        storedUser = JSON.parse(userStr);
        storedToken = tokenStr;
      }
    } catch (err) {
      console.error("Error reading user from localStorage:", err);
    }
  }

  return {
    user: storedUser,
    isLoggedIn: !!storedUser && !!storedToken,
    setUser: (user) => set({ user }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null, isLoggedIn: false });
    },
  };
});
