import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthUser } from "@/types/auth";

const STORAGE_KEY = "edvana.auth.user";

interface AuthContextValue {
  user: AuthUser | null;
  setUser: (u: AuthUser | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUserState(JSON.parse(raw) as AuthUser);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setUser = (u: AuthUser | null) => {
    setUserState(u);
    try {
      if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, setUser, isAuthenticated: !!user }),
    [user],
  );

  // Avoid rendering children before hydration to prevent auth-flash redirects
  if (!hydrated) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
