import type { Metadata } from "next";
import { RegistrationForm } from "@/features/company-registration/ui/RegistrationForm";

export const metadata: Metadata = {
  title: "Разместить компанию на Fishopt — регистрация",
  description:
    "Зарегистрируйте компанию на Fishopt бесплатно. Разместите прайс-листы и получайте заявки от покупателей по всей России.",
  alternates: { canonical: "https://fishopt.pro/register" },
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Разместить компанию на Fishopt
        </h1>
        <p className="text-white/70 mt-2">
          Бесплатно · Занимает 2 минуты · Без звонков
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <RegistrationForm />
      </div>
      <div className="mt-4 text-center text-sm text-white/60">
        Уже есть аккаунт?{" "}
        <a href="/login" className="text-white font-medium hover:text-white/80 transition-colors">
          Войти
        </a>
      </div>
    </div>
  );
}
