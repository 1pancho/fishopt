import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export const metadata: Metadata = {
  title: "Вход в личный кабинет",
  description: "Войдите в личный кабинет Fishopt для управления компанией и прайс-листами.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-4xl flex gap-8 items-center">
      {/* Left — brand panel (desktop only) */}
      <div className="hidden lg:flex flex-col flex-1 text-white">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-[#2dd4bf]" />
            </span>
            Добро пожаловать обратно
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-3">
            Управляйте своим<br />бизнесом в Fishopt
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Прайс-листы, заявки покупателей, статистика просмотров — всё в одном месте.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-4">
          {[
            { icon: "📊", title: "Аналитика просмотров", desc: "Видите, сколько раз открывали ваш профиль" },
            { icon: "💰", title: "Прайс-листы онлайн", desc: "Обновляйте цены за 30 секунд" },
            { icon: "📢", title: "Доска объявлений", desc: "Публикуйте оптовые предложения" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/8 border border-white/10 backdrop-blur-sm">
              <span className="text-xl mt-0.5" aria-hidden="true">{f.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{f.title}</p>
                <p className="text-white/55 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-8 p-4 rounded-xl bg-white/6 border border-white/10">
          <p className="text-white/70 text-sm italic leading-relaxed">
            "Разместили прайс утром — уже к обеду пришли три запроса от новых покупателей."
          </p>
          <p className="text-white/40 text-xs mt-2">— ООО «Дальрыбпоставка», Владивосток</p>
        </div>
      </div>

      {/* Right — form card */}
      <div className="w-full max-w-md flex-shrink-0">
        {/* Card with glowing border on top */}
        <div className="relative">
          {/* Glow backdrop */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-sky-400/40 via-transparent to-cyan-400/20 blur-sm opacity-60" />
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#0369a1] via-[#0ea5e9] to-[#2dd4bf]" />

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] mb-4 shadow-lg shadow-primary/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Вход в кабинет</h1>
                <p className="text-muted-foreground text-sm mt-1.5">
                  Войдите, чтобы управлять своей компанией
                </p>
              </div>

              <LoginForm />

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">или</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Ещё нет аккаунта?{" "}
                <a href="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  Зарегистрируйтесь бесплатно →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Below card trust badges */}
        <div className="mt-5 flex items-center justify-center gap-6 text-white/40 text-xs">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Безопасный вход
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Данные защищены
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Быстрый доступ
          </span>
        </div>
      </div>
    </div>
  );
}
