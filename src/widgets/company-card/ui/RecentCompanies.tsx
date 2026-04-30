import Link from "next/link";
import { CompanyCard } from "@/entities/company";
import { apiGetCompanies } from "@/shared/lib/api";

export async function RecentCompanies() {
  const result = await apiGetCompanies({ limit: 6 }).catch(() => ({ data: [] }));
  return (
    <section className="py-12 md:py-16 bg-muted/50" aria-labelledby="companies-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="companies-heading" className="text-2xl md:text-3xl font-bold text-foreground">
              Компании на Fishopt
            </h2>
            <p className="text-muted-foreground mt-1">
              Проверенные поставщики рыбы и морепродуктов
            </p>
          </div>
          <Link
            href="/companies"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Все компании →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.data.map((company, i) => (
            <div key={company.id} className="stagger-fade" style={{ animationDelay: `${i * 80}ms` }}>
              <CompanyCard company={company as any} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/companies"
            className="inline-flex px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
          >
            Смотреть все компании
          </Link>
        </div>

        <div className="mt-8 hidden sm:flex justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Разместить свою компанию бесплатно
          </Link>
        </div>
      </div>
    </section>
  );
}
