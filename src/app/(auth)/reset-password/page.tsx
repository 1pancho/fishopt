import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Новый пароль — Fishopt",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-white">
        <div className="text-4xl mb-4 text-center" aria-hidden="true">🔐</div>
        <h1 className="text-2xl font-bold mb-2 text-center">Новый пароль</h1>
        <p className="text-white/65 text-sm leading-relaxed mb-6 text-center">
          Придумайте надёжный пароль для вашего аккаунта.
        </p>
        <ResetPasswordForm />
        <div className="mt-5 text-center">
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
