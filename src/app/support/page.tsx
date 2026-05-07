import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { siteConfig } from "@/shared/config/site";
import { TierCards } from "./_components/TierCards";
import { FAQAccordion } from "./_components/FAQAccordion";
import { ScrollReveal, CountUp } from "./_components/SupportAnimations";

export const metadata: Metadata = {
  title: "Поддержать Fishopt — стать спонсором",
  description:
    "Fishopt сейчас бесплатный. Поддержите проект на старте и сохраните бесплатный или льготный доступ навсегда.",
};

const TIERS = [
  {
    amountLabel: "Любая сумма",
    amountSub: "от 500 \u20bd",
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
    amountLabel: "30 000 \u20bd",
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
    amountLabel: "от 100 000 \u20bd",
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
    iconColor: "bg-emerald-100 ring-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
    pulse: true,
  },
  {
    step: siteConfig.paidLaunchDate,
    emoji: "🔔",
    title: "Введём тарифы",
    desc: "Новые пользователи перейдут на платный план. Спонсоры — остаются.",
    cardColor: "bg-amber-50 border-amber-200",
    iconColor: "bg-amber-100 ring-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
    pulse: false,
  },
  {
    step: "Навсегда",
    emoji: "⭐",
    title: "Спонсоры — без изменений",
    desc: "Те, кто поддержал нас сейчас, никогда не платят — независимо от тарифов.",
    cardColor: "bg-primary/5 border-primary/20",
    iconColor: "bg-primary/10 ring-primary/20",
    badgeColor: "bg-primary/10 text-primary",
    pulse: false,
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
    a: "Ориентировочно: от 990\u20bd/мес. Партнёры не платят никогда, Основатели получают скидку 50% в первый год.",
  },
  {
    q: "Можно ли получить возврат?",
    a: "Поддержка носит добровольный характер. Возвраты не предусмотрены — если что-то не так, пишите, разберёмся.",
  },
  {
    q: "Зачем поддерживать, если сейчас бесплатно?",
    a: "Сейчас — лучший момент. Спонсоры фиксируют льготы до того, как они станут платными. После запуска тарифов этой возможности не будет.",
  },
];

const WHY = [
  {
    title: "Серверы и инфраструктура",
    desc: "Хостинг, базы данных, CDN — реальные расходы каждый месяц.",
    d: "M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6",
  },
  {
    title: "SEO и продвижение",
    desc: "Чтобы поставщиков и покупателей было больше — нужно вкладываться в видимость.",
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    title: "Разработка",
    desc: "Новые функции, мобильное приложение, интеграции с 1С и ЭДО.",
    d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Поддержка пользователей",
    desc: "Живая служба поддержки, онбординг, помощь с размещением.",
    d: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
];

function WhyCard({ title, desc, d }: { title: string; desc: string; d: string }) {
  return (
    <div className="shine-card">
      <div className="s-shine">
        <div />
      </div>
      <div className="s-bg">
        <div className="s-tiles">
          <div className="s-tile s-tile-1" />
          <div className="s-tile s-tile-2 d2" />
          <div className="s-tile s-tile-3 d4" />
          <div className="s-tile s-tile-4" />
          <div className="s-tile s-tile-5 d2" />
          <div className="s-tile s-tile-6 d4" />
          <div className="s-tile s-tile-7" />
          <div className="s-tile s-tile-8 d2" />
          <div className="s-tile s-tile-9 d4" />
          <div className="s-tile s-tile-10" />
        </div>
      </div>
      <div className="s-line s-line-1" />
      <div className="s-line s-line-2" />
      <div className="s-line s-line-3" />
      <div className="s-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={d} />
        </svg>
      </div>
      <p className="s-title">{title}</p>
      <p className="s-desc">{desc}</p>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="sp-aurora relative text-white overflow-hidden min-h-[88vh] flex flex-col items-center justify-center py-28 px-4 text-center">
          {/* Particles */}
          <div className="sp-hero-particles" aria-hidden="true" />

          {/* Glow orbs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="sp-orb-1 absolute top-1/4 left-1/5 w-[28rem] h-[28rem] rounded-full bg-amber-500/10 blur-3xl" />
            <div className="sp-orb-2 absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Badge */}
            <div className="sp-badge-glow inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-bold mb-8 backdrop-blur-sm">
              <span aria-hidden="true">🎉</span>
              <span>Ограниченное предложение для первых партнёров</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-[1.08] tracking-tight">
              <span className="text-white">Поддержите</span>{" "}
              <span className="sp-amber-text">Fishopt</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-white/70 mb-6 leading-snug">
              и получите льготы навсегда
            </p>

            <p className="text-lg text-white/55 max-w-lg mx-auto mb-10 leading-relaxed">
              Мы строим лучший B2B‑портал для рыбного рынка России.
              Те, кто поддержит нас сейчас, никогда не будут платить по стандартным тарифам.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={siteConfig.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-glow-amber"
              >
                <span aria-hidden="true">❤️</span>
                Поддержать проект
              </a>
              <a
                href="#tiers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/75 hover:text-white hover:border-white/40 hover:bg-white/5 font-semibold text-sm transition-all backdrop-blur-sm"
              >
                Выбрать уровень
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <p className="text-white/35 text-xs mt-7">
              Безопасный перевод через ЮMoney · Любая сумма от 500 ₽
            </p>
          </div>

          {/* Wave bottom divider */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]" aria-hidden="true">
            <svg
              viewBox="0 0 1440 64"
              preserveAspectRatio="none"
              className="w-full h-12 md:h-16 fill-white"
            >
              <path d="M0,40 C240,72 480,10 720,42 C960,72 1200,12 1440,38 L1440,64 L0,64 Z" />
            </svg>
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────────────────── */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                {
                  value: 500,
                  prefix: "от ",
                  suffix: " ₽",
                  label: "минимальный взнос спонсора",
                  color: "text-emerald-500",
                  delay: 0,
                },
                {
                  value: 50,
                  prefix: "",
                  suffix: "%",
                  label: "скидка для основателей в первый год",
                  color: "text-amber-500",
                  delay: 120,
                },
                {
                  value: 100,
                  prefix: "",
                  suffix: "%",
                  label: "бесплатный доступ для партнёров навсегда",
                  color: "text-sky-500",
                  delay: 240,
                },
              ].map((s) => (
                <ScrollReveal key={s.label} delay={s.delay} className="text-center py-8 px-6">
                  <div className={`text-5xl font-extrabold mb-2 ${s.color} tabular-nums`}>
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="text-muted-foreground text-sm leading-snug">{s.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* ─── TIMELINE ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50/60">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
                Как это работает
              </h2>
              <p className="text-center text-muted-foreground text-sm mb-14">
                Три этапа — от поддержки до бессрочных привилегий
              </p>
            </ScrollReveal>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Connector line desktop */}
              <div
                className="hidden md:block absolute top-10 left-[calc(16.666%+28px)] right-[calc(16.666%+28px)] h-0.5 bg-gradient-to-r from-emerald-300 via-amber-300 to-primary/60"
                aria-hidden="true"
              />

              {TIMELINE.map((item, idx) => (
                <ScrollReveal key={item.step} delay={idx * 130} className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <div
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 ${item.iconColor} ring-4`}
                  >
                    {item.emoji}
                    {item.pulse && (
                      <span
                        className="sp-pulse-ring absolute inset-0 rounded-full border-2 border-emerald-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${item.badgeColor}`}>
                    {item.step}
                  </span>

                  <div className={`w-full p-6 rounded-2xl border shadow-sm ${item.cardColor}`}>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TIERS ────────────────────────────────────────────────────── */}
        <section id="tiers" className="py-16 px-4 bg-white scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
                Уровни поддержки
              </h2>
              <p className="text-center text-muted-foreground text-sm mb-12">
                Спонсор — любая сумма · Основатель — −50% в первый год · Партнёр — бесплатно навсегда
              </p>
            </ScrollReveal>

            <TierCards tiers={TIERS} donateUrl={siteConfig.donateUrl} />

            <ScrollReveal delay={200}>
              <p className="text-center text-xs text-muted-foreground mt-8">
                Хотите поддержать на другую сумму?{" "}
                <a
                  href={siteConfig.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Введите свою сумму на странице оплаты
                </a>
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── WHY ──────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50/60">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Зачем нам поддержка
              </h2>
              <p className="text-center text-muted-foreground text-sm mb-12">
                Ваши средства идут напрямую на развитие платформы
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <WhyCard {...item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                Частые вопросы
              </h2>
            </ScrollReveal>
            <FAQAccordion items={FAQ} />
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="sp-aurora relative py-24 px-4 text-center text-white overflow-hidden">
          <div className="sp-hero-particles" aria-hidden="true" />

          {/* Orbs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="sp-orb-1 absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/12 blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="sp-orb-2 absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sky-400/12 blur-3xl -translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <ScrollReveal>
              <div className="text-6xl mb-6" aria-hidden="true">❤️</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Помогите нам расти
              </h2>
              <p className="text-white/65 mb-10 leading-relaxed max-w-md mx-auto">
                Fishopt создаётся для рыбной отрасли России. Любая поддержка —
                это вклад в инструмент, которым пользуетесь вы и тысячи ваших коллег.
              </p>

              <a
                href={siteConfig.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-glow-amber"
              >
                <span aria-hidden="true">⭐</span>
                Стать спонсором
              </a>

              <p className="text-white/35 text-xs mt-8">
                Вопросы:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline underline-offset-2 hover:text-white/60 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
