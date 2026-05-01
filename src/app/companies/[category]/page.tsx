import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CompanyFilters, MobileFiltersDrawer } from "@/widgets/catalog-filters";
import { CompanyCard } from "@/entities/company";
import { apiGetCompanies } from "@/shared/lib/api";
import { FISH_CATEGORIES } from "@/shared/config/site";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ region?: string; activity?: string }>;
};

export async function generateStaticParams() {
  return FISH_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = FISH_CATEGORIES.find((c) => c.slug === category);

  if (!cat) return { title: "Не найдено" };

  return {
    title: `${cat.label} оптом — поставщики и прайс-листы`,
    description: `Найдите поставщиков ${cat.label.toLowerCase()} оптом по всей России. Актуальные прайс-листы, проверенные компании, оптовые партии.`,
    alternates: {
      canonical: `https://fishopt.pro/companies/${category}`,
    },
    openGraph: {
      title: `${cat.label} оптом — Fishopt`,
      description: `Поставщики ${cat.label.toLowerCase()} оптом по всей России`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;

  const cat = FISH_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const result = await apiGetCompanies({
    category: cat.label,
    region: sp.region,
    activity: sp.activity,
  }).catch(() => ({ data: [], total: 0, page: 1, limit: 20 }));
  const companies = result.data;
  const total = result.total;

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Category hero */}
        <div className="bg-gradient-to-r from-[#0c4a6e] to-[#0369a1] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <nav aria-label="Навигация" className="mb-4">
              <ol className="flex items-center gap-1.5 text-sm text-white/60">
                <li>
                  <a href="/" className="hover:text-white transition-colors">Главная</a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/companies" className="hover:text-white transition-colors">Компании</a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white" aria-current="page">{cat.label}</li>
              </ol>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden="true">{cat.icon}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {cat.label} оптом
                </h1>
                <p className="text-white/70 mt-1">
                  {total} поставщик{total === 1 ? "" : total < 5 ? "а" : "ов"} по всей России
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground font-medium">
              Найдено: {companies.length}
            </p>
            <Suspense fallback={null}>
              <MobileFiltersDrawer activeCategory={category} totalCount={companies.length} />
            </Suspense>
          </div>

          <div className="flex gap-6">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-56 lg:w-64 shrink-0">
              <div className="sticky top-20">
                <Suspense fallback={null}>
                  <CompanyFilters activeCategory={category} />
                </Suspense>
              </div>
            </aside>

            {/* Companies */}
            <div className="flex-1">
              {companies.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-muted-foreground">
                      Найдено <span className="font-semibold text-foreground">{companies.length}</span>{" "}
                      {companies.length === 1 ? "компания" : companies.length < 5 ? "компании" : "компаний"}
                    </p>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {companies.map((company) => (
                      <CompanyCard key={company.id} company={company as any} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4" aria-hidden="true">{cat.icon}</div>
                  <h2 className="font-semibold text-foreground mb-2">
                    Поставщики {cat.label.toLowerCase()} пока не добавлены
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                    Вы поставляете {cat.label.toLowerCase()}? Разместите свою компанию бесплатно.
                  </p>
                  <a href="/register" className="btn-cta px-6 py-3">
                    Разместить компанию
                    <svg className="btn-arrow w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
