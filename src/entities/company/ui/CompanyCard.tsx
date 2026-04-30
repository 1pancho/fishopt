import Link from "next/link";
import type { Company } from "@/shared/types";

const activityLabels: Record<string, string> = {
  wholesale: "Оптовая торговля",
  retail: "Розничная торговля",
  processing: "Переработка",
  aquaculture: "Аквакультура",
  fishing: "Рыбодобыча",
  logistics: "Логистика",
  customs: "Таможня",
};

type Props = {
  company: Company;
};

export function CompanyCard({ company }: Props) {
  return (
    <Link
      href={`/company/${company.slug}`}
      className="card-glow group block p-5 rounded-xl border border-border bg-white transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 group-hover:bg-primary/15 transition-colors">
          {company.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            company.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
            {company.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {company.city ? `${company.city}, ` : ""}
            {company.region}
          </p>
        </div>
        {company.verified && (
          <div
            className="verified-pulse shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center ml-auto"
            title="Проверенная компания"
            aria-label="Проверенная компания"
          >
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Description */}
      {company.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {company.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {company.activityTypes.slice(0, 2).map((type) => (
          <span
            key={type}
            className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
          >
            {activityLabels[type] || type}
          </span>
        ))}
        {company.categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
          >
            {cat}
          </span>
        ))}
      </div>
    </Link>
  );
}
