import React, { createContext, useContext, useMemo, useState } from "react";
import { registerUser, loginUser } from "../utils/api";


export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};



type AuthContextValue = {
  user: Pick<StoredUser, "id" | "name" | "email"> | null;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<
    Pick<StoredUser, "id" | "name" | "email"> | null
  >(null);

  const value: AuthContextValue = useMemo(
    () => ({
      user,

      register: async ({ name, email, password }) => {
        const cleanEmail = normalizeEmail(email);
        const cleanName = name.trim();

        if (cleanName.length < 2)
          throw new Error("Please enter your name.");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
          throw new Error("Enter a valid email.");

        if (password.length < 6)
          throw new Error("Password must be at least 6 characters.");

        // 🔥 CALL BACKEND
        const response = await registerUser({
          name: cleanName,
          email: cleanEmail,
          password,
        });

        localStorage.setItem("token", response.token);
        setUser(response.user);
      },

      login: async ({ email, password }) => {
        const cleanEmail = normalizeEmail(email);

        // 🔥 CALL BACKEND
        const response = await loginUser({
          email: cleanEmail,
          password,
        });

        localStorage.setItem("token", response.token);
        setUser(response.user);
      },

      logout: () => {
        localStorage.removeItem("token");
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

