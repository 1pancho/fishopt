"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FISH_CATEGORIES, REGIONS } from "@/shared/config/site";

export function AdFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams?.get("category") ?? "";
  const activeRegion = searchParams?.get("region") ?? "";
  const currentQuery = searchParams?.get("q") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/ads?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <aside className="w-full" aria-label="Фильтры объявлений">
      {/* Search */}
      <div className="mb-5">
        <label htmlFor="ad-search" className="block text-sm font-semibold text-foreground mb-2">
          Поиск
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <form onSubmit={(e) => { e.preventDefault(); const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value; updateParam("q", q); }}>
            <input
              id="ad-search"
              name="q"
              type="search"
              defaultValue={currentQuery}
              placeholder="Поиск по объявлениям..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            />
          </form>
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Вид продукции</h3>
        <select
          value={activeCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          aria-label="Фильтр по категории"
        >
          <option value="">Все виды</option>
          {FISH_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.label}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Регион</h3>
        <select
          value={activeRegion}
          onChange={(e) => updateParam("region", e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          aria-label="Фильтр по региону"
        >
          <option value="">Все регионы</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Post ad CTA */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
        <p className="text-sm font-medium text-foreground mb-1">Есть товар или нужен поставщик?</p>
        <p className="text-xs text-muted-foreground mb-3">Подайте объявление бесплатно</p>
        <a
          href="/register"
          className="block text-center py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Подать объявление
        </a>
      </div>
    </aside>
  );
}
