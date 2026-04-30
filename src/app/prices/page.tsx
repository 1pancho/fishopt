import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { PriceFilters, PriceTable } from "@/widgets/price-table";
import { apiGetPrices } from "@/shared/lib/api";

export const metadata: Metadata = {
  title: "Прайс-листы на рыбу оптом — актуальные цены поставщиков",
  description:
    "Актуальные оптовые цены на рыбу и морепродукты от проверенных поставщиков России. Лосось, треска, краб, икра и другие виды. Обновляется ежедневно.",
  alternates: {
    canonical: "https://fishopt.pro/prices",
  },
};

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    region?: string;
    processing?: string;
    inStock?: string;
  }>;
};

async function PricesContent({
  q,
  category,
  processing,
  inStock,
}: {
  q?: string;
  category?: string;
  region?: string;
  processing?: string;
  inStock?: string;
}) {
  const items = await apiGetPrices({
    q,
    category,
    processingType: processing,
    inStock: inStock === "1" ? true : undefined,
  }).catch(() => []);

  const hasFilters = !!(q || category || processing || inStock);

  return (
    <div className="flex-1 min-w-0">
      {/* Results bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {items.length > 0 ? (
              <>
                Найдено{" "}
                <span className="font-semibold text-foreground">{items.length}</span>{" "}
                {items.length === 1 ? "позиция" : items.length < 5 ? "позиции" : "позиций"}
              </>
            ) : (
              "Позиции не найдены"
            )}
          </p>
          {hasFilters && (
            <Link
              href="/prices"
              className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
            >
              Сбросить фильтры
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            defaultValue="price-asc"
            aria-label="Сортировка"
          >
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="date">По дате обновления</option>
          </select>
        </div>
      </div>

      <PriceTable items={items as any} />
    </div>
  );
}

export default async function PricesPage({ searchParams }: Props) {
  const params = await searchParams;
  const lastUpdated = new Date().toISOString();

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Page header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <nav aria-label="Навигация" className="mb-3">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground transition-colors">Главная</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">Прайс-листы</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Прайс-листы на рыбу оптом
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Актуальные цены от проверенных поставщиков ·{" "}
                  <span className="text-green-600 font-medium">
                    Обновлено {new Date(lastUpdated).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                  </span>
                </p>
              </div>

              <Link
                href="/register"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Добавить свои цены
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-56 lg:w-64 shrink-0">
              <div className="sticky top-20">
                <Suspense fallback={null}>
                  <PriceFilters />
                </Suspense>
              </div>
            </aside>

            {/* Price table */}
            <Suspense
              fallback={
                <div className="flex-1 flex flex-col gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-border/50 animate-pulse" aria-hidden="true" />
                  ))}
                </div>
              }
            >
              <PricesContent
                q={params.q}
                category={params.category}
                region={params.region}
                processing={params.processing}
                inStock={params.inStock}
              />
            </Suspense>
          </div>
        </div>

        {/* Mobile filters bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border px-4 py-3">
          <Suspense fallback={null}>
            <MobileFilterBar />
          </Suspense>
        </div>
        {/* Spacer for fixed mobile bar */}
        <div className="md:hidden h-16" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}

function MobileFilterBar() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/prices"
        className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-center hover:bg-secondary transition-colors"
      >
        Сбросить
      </Link>
      <button
        type="button"
        className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold"
        aria-label="Открыть фильтры"
      >
        Фильтры
      </button>
    </div>
  );
}
