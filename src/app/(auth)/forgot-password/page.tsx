import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Восстановление пароля — Fishopt",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-5" aria-hidden="true">🔑</div>
        <h1 className="text-2xl font-bold mb-3">Восстановление пароля</h1>
        <p className="text-white/65 leading-relaxed mb-7">
          Автоматический сброс пароля пока в разработке.
          Напишите нам — сбросим вручную в течение нескольких часов.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Восстановление пароля Fishopt")}`}
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Написать на {siteConfig.email}
        </a>
        <div className="mt-6">
          <Link
            href="/login"
            className="text-white/45 hover:text-white/80 text-sm transition-colors"
          >
            ← Вернуться ко входу
          </Link>
        </div>
      </div>
    </div>
  );
}
