"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { FISH_CATEGORIES, REGIONS } from "@/shared/config/site";

const activityOptions = [
  { value: "wholesale", label: "Оптовая торговля" },
  { value: "processing", label: "Переработка" },
  { value: "aquaculture", label: "Аквакультура" },
  { value: "fishing", label: "Рыбодобыча" },
  { value: "logistics", label: "Логистика" },
];

type Props = {
  activeCategory?: string;
};

export function CompanyFilters({ activeCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeRegion = searchParams?.get("region") ?? "";
  const activeActivity = searchParams?.get("activity") ?? "";
  const currentQuery = searchParams?.get("q") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // При смене фильтра сбрасываем на первую страницу
      params.delete("page");
      router.push(`/companies?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <aside className="w-full" aria-label="Фильтры компаний">
      {/* Поиск */}
      <div className="mb-5">
        <label htmlFor="company-search" className="block text-sm font-semibold text-foreground mb-2">
          Поиск
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
              updateParam("q", q);
            }}
          >
            <input
              id="company-search"
              name="q"
              type="search"
              defaultValue={currentQuery}
              placeholder="Название компании..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            />
          </form>
        </div>
      </div>

      {/* Вид рыбы */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Вид продукции</h3>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => router.push("/companies" + (searchParams?.toString() ? `?${searchParams.toString()}` : ""), { scroll: false })}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeCategory
                ? "bg-primary text-white font-medium"
                : "text-foreground/70 hover:bg-secondary hover:text-foreground"
            }`}
          >
            Все виды
          </button>
          {FISH_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => router.push(`/companies/${cat.slug}`, { scroll: false })}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === cat.slug
                  ? "bg-primary text-white font-medium"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Регион */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Регион</h3>
        <select
          value={activeRegion}
          onChange={(e) => updateParam("region", e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          aria-label="Фильтр по региону"
        >
          <option value="">Все регионы</option>
          {REGIONS.map((region) => (
            <option key={region.slug} value={region.slug}>
              {region.label}
            </option>
          ))}
        </select>
      </div>

      {/* Вид деятельности */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Деятельность</h3>
        <div className="flex flex-col gap-1">
          {activityOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors"
            >
              <input
                type="radio"
                name="activity"
                value={opt.value}
                checked={activeActivity === opt.value}
                onChange={() =>
                  updateParam("activity", activeActivity === opt.value ? "" : opt.value)
                }
                className="accent-primary"
              />
              <span className="text-sm text-foreground/80">{opt.label}</span>
            </label>
          ))}
          {activeActivity && (
            <button
              type="button"
              onClick={() => updateParam("activity", "")}
              className="text-left px-3 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
