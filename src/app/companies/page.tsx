import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CompanyFilters, MobileFiltersDrawer } from "@/widgets/catalog-filters";
import { CompanyCard } from "@/entities/company";
import { apiGetCompanies } from "@/shared/lib/api";
import { REGIONS } from "@/shared/config/site";

type Props = {
  searchParams: Promise<{ q?: string; region?: string; activity?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const regionLabel = params.region
    ? REGIONS.find((r) => r.slug === params.region)?.label
    : null;

  const title = regionLabel
    ? `Поставщики рыбы в ${regionLabel} — каталог компаний`
    : "Каталог поставщиков рыбы и морепродуктов";

  return {
    title,
    description:
      "Найдите проверенных поставщиков рыбы и морепродуктов по всей России. Фильтрация по региону, виду рыбы и деятельности.",
    alternates: {
      canonical: `https://fishopt.pro/companies`,
    },
  };
}

async function CompaniesContent({
  q,
  region,
  activity,
}: {
  q?: string;
  region?: string;
  activity?: string;
}) {
  const result = await apiGetCompanies({ q, region, activity }).catch(() => ({ data: [], total: 0, page: 1, limit: 20 }));
  const companies = result.data;

  return (
    <div className="flex-1">
      {/* Results header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          {companies.length > 0 ? (
            <>
              Найдено <span className="font-semibold text-foreground">{companies.length}</span>{" "}
              {companies.length === 1 ? "компания" : companies.length < 5 ? "компании" : "компаний"}
            </>
          ) : (
            "Компании не найдены"
          )}
        </p>

        {/* Sort — placeholder */}
        <select
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          defaultValue="date"
          aria-label="Сортировка"
        >
          <option value="date">По дате добавления</option>
          <option value="name">По названию</option>
          <option value="verified">Сначала проверенные</option>
        </select>
      </div>

      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4" aria-hidden="true">🐟</div>
          <h3 className="font-semibold text-foreground mb-2">Компании не найдены</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </div>
      )}
    </div>
  );
}

export default async function CompaniesPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Навигация">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Главная
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">
                  Компании
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile: top bar with filter button */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">Каталог компаний</h1>
            <Suspense fallback={null}>
              <MobileFiltersDrawer totalCount={0} />
            </Suspense>
          </div>

          <div className="flex gap-6">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-56 lg:w-64 shrink-0">
              <div className="sticky top-20">
                <h1 className="text-lg font-bold text-foreground mb-5">Каталог компаний</h1>
                <Suspense fallback={null}>
                  <CompanyFilters />
                </Suspense>
              </div>
            </aside>

            {/* Companies list */}
            <Suspense
              fallback={
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-40 rounded-xl bg-border/50 animate-pulse"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              }
            >
              <CompaniesContent
                q={params.q}
                region={params.region}
                activity={params.activity}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
