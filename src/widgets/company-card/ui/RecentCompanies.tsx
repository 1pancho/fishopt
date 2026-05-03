import Link from "next/link";
import { CompanyCard } from "@/entities/company";
import { apiGetCompanies } from "@/shared/lib/api";
import { TiltCard } from "@/shared/ui/TiltCard";
import { CTAButton } from "@/shared/ui/CTAButton";

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
            <TiltCard key={company.id} className="stagger-fade" style={{ animationDelay: `${i * 80}ms` }}>
              <CompanyCard company={company as any} />
            </TiltCard>
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

        <div className="mt-10 hidden sm:flex justify-center">
          <CTAButton href="/register" label="Разместить свою компанию бесплатно" />
        </div>
      </div>
    </section>
  );
}
