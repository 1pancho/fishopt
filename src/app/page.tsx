import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Hero, WhyFishopt } from "@/widgets/hero";
import { CategoriesGrid } from "@/widgets/catalog-filters";
import { RecentCompanies } from "@/widgets/company-card";
import { NewsPreview } from "@/widgets/news-card";
import { ScrollReveal } from "@/shared/ui/ScrollReveal";
import { PriceTicker } from "@/widgets/price-ticker";
import { ScrollProgressBar } from "@/shared/ui/ScrollProgressBar";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Fishopt — Оптовая торговля рыбой и морепродуктами в России",
  description:
    "Найдите поставщиков рыбы и морепродуктов по всей России. Актуальные прайс-листы, каталог компаний, доска объявлений и новости рыбной отрасли.",
  alternates: {
    canonical: "https://fishopt.pro",
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <PriceTicker />
      <main id="main-content">
        <Hero />
        <ScrollReveal>
          <CategoriesGrid />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <RecentCompanies />
        </ScrollReveal>
        <ScrollReveal delay={50}>
          <NewsPreview />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <WhyFishopt />
        </ScrollReveal>

        {/* Founder section */}
        <ScrollReveal delay={60}>
          <section className="py-16 px-4 bg-gradient-to-br from-[#0c4a6e] to-[#0369a1] text-white text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
                <span aria-hidden="true">🎉</span>
                Сейчас бесплатно — в конце года станет платным
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Станьте основателем{" "}
                <span className="text-amber-400">Fishopt</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Мы строим лучший рыбный B2B-портал России. Поддержите нас сейчас —
                и никогда не платите за то, что делаете бесплатно сегодня.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={siteConfig.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-base transition-colors shadow-lg shadow-amber-900/30"
                >
                  <span aria-hidden="true">❤️</span>
                  Поддержать проект
                </a>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-base transition-colors"
                >
                  Узнать подробнее →
                </Link>
              </div>
              <p className="text-white/40 text-xs mt-6">
                Основатели получают бесплатный доступ навсегда — независимо от будущих тарифов
              </p>
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
