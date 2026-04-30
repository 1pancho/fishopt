"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGetMe } from "@/shared/lib/api";

type User = {
  id: string;
  email: string;
  role: string;
  company: { slug: string; name: string } | null;
};

type AuthCtx = { token: string; user: User };

const AuthContext = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthCtx | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("fishopt_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    apiGetMe(token)
      .then((user) => setAuth({ token, user }))
      .catch(() => {
        localStorage.removeItem("fishopt_token");
        router.replace("/login");
      });
  }, [router]);

  if (!auth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
