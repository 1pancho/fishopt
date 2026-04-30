import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { apiGetAds } from "@/shared/lib/api";
import { AdCard } from "@/entities/ad";
import { AdFilters } from "@/widgets/ad-board";

export const metadata: Metadata = {
  title: "Объявления — купля и продажа рыбы оптом",
  description:
    "Доска объявлений для оптовой торговли рыбой и морепродуктами. Купля и продажа лосося, краба, трески, минтая и других видов рыбы по всей России.",
  alternates: { canonical: "https://fishopt.pro/ads" },
};

type Props = {
  searchParams: Promise<{
    type?: "buy" | "sell";
    category?: string;
    region?: string;
    q?: string;
  }>;
};

async function AdsContent({
  type,
  category,
  region,
  q,
}: {
  type?: "buy" | "sell";
  category?: string;
  region?: string;
  q?: string;
}) {
  const [ads, sellAds, buyAds] = await Promise.all([
    apiGetAds({ type, category, region, q }).catch(() => []),
    apiGetAds({ type: "sell" }).catch(() => []),
    apiGetAds({ type: "buy" }).catch(() => []),
  ]);
  const sellCount = sellAds.length;
  const buyCount = buyAds.length;

  return (
    <>
      {/* Type tabs */}
      <div className="flex items-center gap-2 mb-5">
        <Link
          href="/ads"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !type ? "bg-primary text-white" : "bg-white border border-border hover:bg-secondary"
          }`}
        >
          Все
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${!type ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
            {sellCount + buyCount}
          </span>
        </Link>
        <Link
          href="/ads?type=sell"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === "sell" ? "bg-primary text-white" : "bg-white border border-border hover:bg-secondary"
          }`}
        >
          Продам
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${type === "sell" ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
            {sellCount}
          </span>
        </Link>
        <Link
          href="/ads?type=buy"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === "buy" ? "bg-emerald-600 text-white" : "bg-white border border-border hover:bg-secondary"
          }`}
        >
          Куплю
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${type === "buy" ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
            {buyCount}
          </span>
        </Link>

        <div className="ml-auto">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Подать объявление</span>
            <span className="sm:hidden">Добавить</span>
          </Link>
        </div>
      </div>

      {/* Results info */}
      <p className="text-sm text-muted-foreground mb-4">
        {ads.length > 0 ? (
          <>Найдено <span className="font-semibold text-foreground">{ads.length}</span>{" "}
          {ads.length === 1 ? "объявление" : ads.length < 5 ? "объявления" : "объявлений"}</>
        ) : "Объявления не найдены"}
      </p>

      {ads.length > 0 ? (
        <div className="flex flex-col gap-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4" aria-hidden="true">📋</div>
          <h3 className="font-semibold text-foreground mb-2">Объявления не найдены</h3>
          <p className="text-muted-foreground text-sm">Попробуйте изменить фильтры</p>
        </div>
      )}
    </>
  );
}

export default async function AdsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <nav aria-label="Навигация" className="mb-3">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground transition-colors">Главная</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">Объявления</li>
              </ol>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Доска объявлений
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Купля и продажа рыбы и морепродуктов оптом по всей России
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden md:block w-56 lg:w-64 shrink-0">
              <div className="sticky top-20">
                <Suspense fallback={null}>
                  <AdFilters />
                </Suspense>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <Suspense fallback={
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-36 rounded-xl bg-border/50 animate-pulse" aria-hidden="true" />
                  ))}
                </div>
              }>
                <AdsContent
                  type={params.type}
                  category={params.category}
                  region={params.region}
                  q={params.q}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
