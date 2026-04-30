import Link from "next/link";
import { FISH_CATEGORIES } from "@/shared/config/site";

export function CategoriesGrid() {
  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="categories-heading" className="text-2xl md:text-3xl font-bold text-foreground">
              Виды продукции
            </h2>
            <p className="text-muted-foreground mt-1">
              Найдите поставщиков по категории
            </p>
          </div>
          <Link
            href="/companies"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Все компании →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {FISH_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/companies/${cat.slug}`}
              className="stagger-fade group flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 card-glow text-center"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <span
                className="emoji-hover text-3xl md:text-4xl block"
                role="img"
                aria-label={cat.label}
              >
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile "all" link */}
        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/companies"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Все компании →
          </Link>
        </div>
      </div>
    </section>
  );
}
