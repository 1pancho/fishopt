import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export const metadata: Metadata = {
  title: "Вход в личный кабинет",
  description: "Войдите в личный кабинет Fishopt для управления компанией и прайс-листами.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Вход в кабинет</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Войдите, чтобы управлять своей компанией
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Ещё нет аккаунта?{" "}
          <a href="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
}
