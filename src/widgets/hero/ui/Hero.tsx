import Link from "next/link";
import { FISH_CATEGORIES } from "@/shared/config/site";
import { FishParticles } from "./FishParticles";
import { AnimatedCounter } from "./AnimatedCounter";
import { TypewriterText } from "./TypewriterText";

const stats = [
  { value: "3 500+", label: "компаний" },
  { value: "85", label: "регионов России" },
  { value: "12", label: "видов продукции" },
  { value: "Ежедневно", label: "обновляем прайсы" },
];

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0c4a6e] via-[#075985] to-[#0369a1] text-white overflow-hidden">
      {/* Drifting background orbs */}
      <div className="absolute inset-0 opacity-15" aria-hidden="true">
        <div className="orb-drift absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-1/3 -translate-y-1/3" />
        <div className="orb-drift-slow absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -translate-x-1/3 translate-y-1/3" />
        <div className="orb-drift absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-cyan-400/10" style={{ animationDelay: "4s" }} />
      </div>

      {/* Floating fish particles */}
      <FishParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Main heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
            <span className="relative flex w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75" />
              <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-[#2dd4bf]" />
            </span>
            Портал №1 для оптовой торговли рыбой в России
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Найдите поставщика{" "}
            <TypewriterText />{" "}
            по всей России
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
            Актуальные прайс-листы, каталог проверенных компаний, доска объявлений
            и новости рыбной отрасли — всё в одном месте.
          </p>

          {/* Search bar */}
          <form
            action="/companies"
            method="get"
            className="flex flex-col sm:flex-row gap-3 mb-8"
            role="search"
          >
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Лосось, краб, треска, горбуша..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base backdrop-blur-sm transition-all"
                aria-label="Поиск рыбы и морепродуктов"
              />
            </div>
            <button
              type="submit"
              className="btn-glow px-6 py-3.5 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-colors text-base shrink-0"
            >
              Найти
            </button>
          </form>

          {/* Popular tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white/50 text-sm mr-1">Популярно:</span>
            {FISH_CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/companies/${cat.slug}`}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 text-white/80 text-sm transition-all hover:scale-105 hover:text-white"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-all hover:-translate-y-1"
            >
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative h-12 md:h-16 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 800 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 40 Q 200 80 400 40 Q 600 0 800 40 L 800 80 L 0 80 Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
