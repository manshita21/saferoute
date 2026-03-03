import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readStorage, removeStorage, writeStorage } from "../utils/storage";

const USERS_KEY = "saferoute.users.v1";
const SESSION_KEY = "saferoute.session.v1";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

type Session = {
  userId: string;
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
  const [session, setSession] = useState<Session | null>(() =>
    readStorage<Session | null>(SESSION_KEY, null),
  );
  const [users, setUsers] = useState<StoredUser[]>(() => readStorage<StoredUser[]>(USERS_KEY, []));

  useEffect(() => {
    writeStorage(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    if (session) writeStorage(SESSION_KEY, session);
    else removeStorage(SESSION_KEY);
  }, [session]);

  const user = useMemo(() => {
    if (!session) return null;
    const u = users.find((x) => x.id === session.userId);
    if (!u) return null;
    return { id: u.id, name: u.name, email: u.email };
  }, [session, users]);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      register: async ({ name, email, password }) => {
        const cleanEmail = normalizeEmail(email);
        const cleanName = name.trim();
        if (cleanName.length < 2) throw new Error("Please enter your name.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new Error("Enter a valid email.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");

        const exists = users.some((u) => normalizeEmail(u.email) === cleanEmail);
        if (exists) throw new Error("An account with this email already exists.");

        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          name: cleanName,
          email: cleanEmail,
          password,
          createdAt: new Date().toISOString(),
        };
        setUsers((prev) => [newUser, ...prev]);
        setSession({ userId: newUser.id, createdAt: new Date().toISOString() });
      },
      login: async ({ email, password }) => {
        const cleanEmail = normalizeEmail(email);
        const u = users.find((x) => normalizeEmail(x.email) === cleanEmail);
        if (!u || u.password !== password) throw new Error("Invalid email or password.");
        setSession({ userId: u.id, createdAt: new Date().toISOString() });
      },
      logout: () => {
        setSession(null);
      },
    }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

