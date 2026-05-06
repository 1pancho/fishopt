import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { siteConfig } from "@/shared/config/site";
import { TierCards } from "./_components/TierCards";

export const metadata: Metadata = {
  title: "Поддержать Fishopt — стать спонсором",
  description:
    "Fishopt сейчас бесплатный. Поддержите проект на старте и сохраните бесплатный или льготный доступ навсегда.",
};

const TIERS = [
  {
    amountLabel: "Любая сумма",
    amountSub: "от 500 ₽",
    label: "Спонсор",
    badge: "🤝",
    highlight: null,
    perks: [
      "Статус «Спонсор» в профиле",
      "Ранний доступ к новым функциям",
      "Участие в закрытом чате сообщества",
    ],
    cta: "Стать спонсором",
    featured: false,
  },
  {
    amountLabel: "30 000 ₽",
    amountSub: "единовременно",
    label: "Основатель",
    badge: "⭐",
    highlight: "−50% в первый год",
    perks: [
      "Статус «Основатель» в профиле",
      "Скидка 50% на платный план в первый год",
      "Ранний доступ к новым функциям",
      "Влияние на развитие сервиса",
      "Логотип на странице спонсоров",
    ],
    cta: "Стать основателем",
    featured: true,
  },
  {
    amountLabel: "от 100 000 ₽",
    amountSub: "единовременно",
    label: "Партнёр",
    badge: "🚀",
    highlight: "Бесплатно навсегда",
    perks: [
      "Статус «Партнёр» в профиле",
      "Бесплатный доступ навсегда",
      "Ранний доступ к новым функциям",
      "Влияние на развитие сервиса",
      "Логотип + ссылка в разделе «Партнёры»",
      "Упоминание в рассылке и соцсетях",
    ],
    cta: "Стать партнёром",
    featured: false,
  },
];

const TIMELINE = [
  {
    step: "Сейчас",
    emoji: "🟢",
    title: "Полностью бесплатно",
    desc: "Все компании, прайс-листы, объявления — без ограничений и без оплаты.",
    cardColor: "bg-emerald-50 border-emerald-200",
    iconColor: "bg-emerald-100",
    badgeColor: "bg-emerald-100 text-emerald-700",
    lineColor: "from-emerald-400 to-amber-400",
  },
  {
    step: siteConfig.paidLaunchDate,
    emoji: "🔔",
    title: "Введём тарифы",
    desc: "Новые пользователи перейдут на платный план. Спонсоры — остаются.",
    cardColor: "bg-amber-50 border-amber-200",
    iconColor: "bg-amber-100",
    badgeColor: "bg-amber-100 text-amber-700",
    lineColor: "from-amber-400 to-primary",
  },
  {
    step: "Навсегда",
    emoji: "⭐",
    title: "Спонсоры — без изменений",
    desc: "Те, кто поддержал нас сейчас, никогда не платят — независимо от тарифов.",
    cardColor: "bg-primary/5 border-primary/20",
    iconColor: "bg-primary/10",
    badgeColor: "bg-primary/10 text-primary",
    lineColor: "",
  },
];

const FAQ = [
  {
    q: "Когда сервис станет платным?",
    a: `Мы планируем ввести платные тарифы в ${siteConfig.paidLaunchDate}. До этого момента все функции остаются бесплатными.`,
  },
  {
    q: "Как подтвердить статус?",
    a: "После перевода напишите на info@fishopt.pro с email вашего аккаунта — присвоим статус вручную. В будущем это будет автоматизировано.",
  },
  {
    q: "Какими будут тарифы для остальных?",
    a: "Ориентировочно: от 990₽/мес. Партнёры не платят никогда, Основатели получают скидку 50% в первый год.",
  },
  {
    q: "Можно ли получить возврат?",
    a: "Поддержка носит добровольный характер. Возвраты не предусмотрены — если что-то не так, пишите, разберёмся.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-amber-50 via-amber-50/30 to-white py-16 md:py-24 px-4 text-center overflow-hidden">
          {/* Decorative orbs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="absolute top-8 right-1/4 w-48 h-48 rounded-full bg-orange-200/20 blur-2xl" />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-sm font-semibold mb-6">
              <span aria-hidden="true">🕐</span>
              Бесплатно ещё ~6 месяцев
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
              Станьте спонсором{" "}
              <span className="text-amber-500">Fishopt</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Мы строим лучший B2B-портал для рыбного рынка России. Сейчас сервис бесплатный,
              но чтобы развиваться — нам нужна ваша поддержка.
            </p>
            <a
              href={siteConfig.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg transition-all shadow-xl shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-0.5"
            >
              <span aria-hidden="true">❤️</span>
              Поддержать проект
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Перевод через ЮMoney — безопасно и быстро
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-12">
              Как это работает
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIMELINE.map((item, idx) => (
                <div key={item.step} className="relative flex flex-col items-center">
                  {/* Connector arrow on desktop */}
                  {idx < TIMELINE.length - 1 && (
                    <div className="hidden md:flex absolute top-7 left-[calc(50%+28px)] right-0 items-center" aria-hidden="true">
                      <div className={`flex-1 h-px bg-gradient-to-r ${item.lineColor}`} />
                      <svg className="w-3 h-3 text-amber-400 -ml-px shrink-0" fill="currentColor" viewBox="0 0 6 10">
                        <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  {/* Icon */}
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 ${item.iconColor}`}>
                    {item.emoji}
                  </div>
                  {/* Step badge */}
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${item.badgeColor}`}>
                    {item.step}
                  </span>
                  {/* Card */}
                  <div className={`w-full p-5 rounded-2xl border text-center ${item.cardColor}`}>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-14 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">
              Уровни поддержки
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-10">
              Спонсор — любая сумма · Основатель — −50% в первый год · Партнёр — бесплатно навсегда
            </p>
            <TierCards tiers={TIERS} donateUrl={siteConfig.donateUrl} />
            <p className="text-center text-xs text-muted-foreground mt-6">
              Хотите поддержать на другую сумму?{" "}
              <a href={siteConfig.donateUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Введите свою сумму на странице оплаты
              </a>
            </p>
          </div>
        </section>

        {/* Why */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Зачем нам поддержка
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🖥️", title: "Серверы и инфраструктура", desc: "Хостинг, базы данных, CDN — реальные расходы каждый месяц." },
                { icon: "🔍", title: "SEO и продвижение", desc: "Чтобы поставщиков и покупателей было больше — нужно вкладываться в видимость." },
                { icon: "🛠️", title: "Разработка", desc: "Новые функции, мобильное приложение, интеграции с 1С и ЭДО." },
                { icon: "📞", title: "Поддержка пользователей", desc: "Живая служба поддержки, онбординг, помощь с размещением." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all">
                  <div className="text-2xl shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Часто задаваемые вопросы
            </h2>
            <div className="flex flex-col gap-4">
              {FAQ.map((item) => (
                <div key={item.q} className="bg-white rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
                  <p className="font-semibold text-foreground mb-2">{item.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 text-center bg-[#0c4a6e] text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sky-400/10 blur-2xl -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative max-w-xl mx-auto">
            <div className="text-4xl mb-4" aria-hidden="true">❤️</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Помогите нам расти</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Fishopt создаётся для рыбной отрасли России. Любая поддержка —
              это вклад в инструмент, которым пользуетесь вы и тысячи ваших коллег.
            </p>
            <a
              href={siteConfig.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg transition-all hover:-translate-y-0.5 shadow-xl shadow-amber-900/20"
            >
              <span aria-hidden="true">⭐</span>
              Стать спонсором
            </a>
            <p className="text-white/40 text-xs mt-4">
              Вопросы:{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline hover:text-white/60">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
