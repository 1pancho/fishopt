"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiResetPassword } from "@/shared/lib/api";

export function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params?.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) setError("Ссылка недействительна или устарела.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiResetPassword(token, password);
      setDone(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message;
      setError(msg ?? "Произошла ошибка. Попробуйте запросить ссылку заново.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-300 text-sm mb-4">Ссылка недействительна или устарела.</p>
        <a href="/forgot-password" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
          Запросить новую ссылку →
        </a>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="text-white font-semibold mb-2">Пароль изменён</p>
        <p className="text-white/65 text-sm">Перенаправление на страницу входа...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1.5">
          Новый пароль
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Не менее 6 символов"
            required
            minLength={6}
            className="auth-input w-full px-4 py-3 pr-12 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/35 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="confirm" className="block text-sm font-medium text-white/80 mb-1.5">
          Повторите пароль
        </label>
        <input
          id="confirm"
          type={showPassword ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Повторите пароль"
          required
          className="auth-input w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/35 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
        />
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !password || !confirm}
        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Сохранение...
          </>
        ) : (
          "Сохранить пароль"
        )}
      </button>
    </form>
  );
}
