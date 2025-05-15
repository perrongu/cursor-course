"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; email: string };
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,
  login: async () => {
    await signIn("google", {
      callbackUrl: "/dashboards",
    });
  },
  logout: async () => {
    await signOut({ callbackUrl: "/" });
    set({ isAuthenticated: false, user: null });
  },
}));

// Hook pour synchroniser l'état de la session avec notre store
export function useAuthSync() {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session?.user) {
      useAuth.setState({
        isAuthenticated: true,
        user: {
          id: session.user.email || "",
          email: session.user.email || "",
        },
      });
    } else {
      useAuth.setState({
        isAuthenticated: false,
        user: null,
      });
    }
  }, [session]);
} 