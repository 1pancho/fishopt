import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Поддержать Fishopt — стать основателем",
  description:
    "Fishopt сейчас бесплатный. Поддержите проект на старте и получите бесплатный доступ навсегда — даже когда сервис станет платным.",
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
    highlight: "−50% навсегда",
    perks: [
      "Статус «Основатель» в профиле",
      "Скидка 50% на платный план — навсегда",
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

const FAQ = [
  {
    q: "Когда сервис станет платным?",
    a: `Мы планируем ввести платные тарифы в ${siteConfig.paidLaunchDate}. До этого момента все функции остаются бесплатными для всех пользователей.`,
  },
  {
    q: "Как подтвердить статус основателя?",
    a: "После перевода напишите нам на почту info@fishopt.pro с указанием email вашего аккаунта — мы присвоим статус вручную. В будущем это будет автоматизировано.",
  },
  {
    q: "Какими будут тарифы для остальных?",
    a: "Пока мы прорабатываем тарифную сетку. Ориентировочно: от 990₽/мес за базовый доступ. Партнёры не платят никогда, Основатели платят 50% от тарифа навсегда.",
  },
  {
    q: "Можно ли получить возврат?",
    a: "Поддержка носит добровольный характер. Возвраты не предусмотрены, но если что-то пошло не так — пишите, разберёмся.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-amber-50 via-amber-50/40 to-white py-16 md:py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
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
              Те, кто помогает нам сейчас, не заплатят никогда.
            </p>
            <a
              href={siteConfig.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg transition-colors shadow-lg shadow-amber-200"
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
            <h2 className="text-2xl font-bold text-center text-foreground mb-10">
              Как это работает
            </h2>
            <div className="relative">
              {/* Line */}
              <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-primary mx-24" aria-hidden="true" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "Сейчас",
                    icon: "🟢",
                    title: "Полностью бесплатно",
                    desc: "Все компании, прайс-листы, объявления — без ограничений и без оплаты.",
                    color: "border-emerald-200 bg-emerald-50",
                    badge: "bg-emerald-100 text-emerald-700",
                  },
                  {
                    step: siteConfig.paidLaunchDate,
                    icon: "🔔",
                    title: "Введём тарифы",
                    desc: "Новые пользователи перейдут на платный план. Спонсоры остаются бесплатными.",
                    color: "border-amber-200 bg-amber-50",
                    badge: "bg-amber-100 text-amber-700",
                  },
                  {
                    step: "Навсегда",
                    icon: "⭐",
                    title: "Спонсоры — бесплатно",
                    desc: "Те, кто поддержал нас сейчас, никогда не платят — независимо от наших тарифов.",
                    color: "border-primary/20 bg-primary/5",
                    badge: "bg-primary/10 text-primary",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`relative flex flex-col items-center text-center p-6 rounded-2xl border ${item.color}`}
                  >
                    <div className={`text-2xl mb-3 w-14 h-14 rounded-full flex items-center justify-center ${item.badge} font-bold text-2xl`}>
                      {item.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full ${item.badge}`}>
                      {item.step}
                    </span>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
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
              Спонсор — любая сумма · Основатель — −50% навсегда · Партнёр — бесплатно навсегда
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIERS.map((tier) => (
                <div
                  key={tier.amount}
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    tier.featured
                      ? "border-amber-400 bg-white shadow-xl shadow-amber-100 scale-[1.02]"
                      : "border-border bg-white"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold whitespace-nowrap">
                      Популярный выбор
                    </div>
                  )}
                  <div className="text-3xl mb-3">{tier.badge}</div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {tier.label}
                  </p>
                  {tier.highlight && (
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold mb-3 ${
                      tier.label === "Партнёр"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {tier.highlight}
                    </div>
                  )}
                  <div className="mb-5">
                    <span className="text-3xl font-extrabold text-foreground">{tier.amountLabel}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{tier.amountSub}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-foreground/80">
                        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={siteConfig.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-colors ${
                      tier.featured
                        ? "bg-amber-500 hover:bg-amber-400 text-white"
                        : "bg-muted hover:bg-muted/70 text-foreground border border-border"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Хотите поддержать на другую сумму?{" "}
              <a href={siteConfig.donateUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Введите свою сумму на странице оплаты
              </a>
            </p>
          </div>
        </section>

        {/* Why we need support */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Зачем нам поддержка
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "🖥️",
                  title: "Серверы и инфраструктура",
                  desc: "Хостинг, базы данных, CDN — это реальные расходы каждый месяц.",
                },
                {
                  icon: "🔍",
                  title: "SEO и продвижение",
                  desc: "Чтобы поставщиков и покупателей было больше — нужно вкладываться в видимость.",
                },
                {
                  icon: "🛠️",
                  title: "Разработка",
                  desc: "Новые функции, мобильное приложение, интеграции с 1С и ЭДО.",
                },
                {
                  icon: "📞",
                  title: "Поддержка пользователей",
                  desc: "Живая служба поддержки, онбординг, помощь с размещением.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-white border border-border">
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
                <div key={item.q} className="bg-white rounded-xl border border-border p-5">
                  <p className="font-semibold text-foreground mb-2">{item.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 text-center bg-[#0c4a6e] text-white">
          <div className="max-w-xl mx-auto">
            <div className="text-4xl mb-4" aria-hidden="true">❤️</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Помогите нам расти
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Fishopt создаётся для рыбной отрасли России. Любая поддержка —
              это вклад в инструмент, которым пользуетесь вы и тысячи ваших коллег.
            </p>
            <a
              href={siteConfig.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg transition-colors"
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
