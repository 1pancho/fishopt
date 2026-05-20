"use client";

import { useState } from "react";
import { apiForgotPassword } from "@/shared/lib/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiForgotPassword(email);
      setSent(true);
    } catch {
      setError("Произошла ошибка. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-3">📬</div>
        <p className="text-white font-semibold mb-2">Письмо отправлено</p>
        <p className="text-white/65 text-sm leading-relaxed">
          Если адрес <strong className="text-white">{email}</strong> зарегистрирован,
          вы получите письмо со ссылкой для сброса пароля. Проверьте папку «Спам», если письма нет.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="company@example.ru"
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
        disabled={loading || !email}
        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Отправка...
          </>
        ) : (
          "Отправить ссылку"
        )}
      </button>
    </form>
  );
}
