"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FISH_CATEGORIES, REGIONS, PROCESSING_TYPES } from "@/shared/config/site";

export function PriceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams?.get("category") ?? "";
  const activeRegion = searchParams?.get("region") ?? "";
  const activeProcessing = searchParams?.get("processing") ?? "";
  const activeInStock = searchParams?.get("inStock") === "1";
  const currentQuery = searchParams?.get("q") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/prices?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleInStock = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (activeInStock) {
      params.delete("inStock");
    } else {
      params.set("inStock", "1");
    }
    router.push(`/prices?${params.toString()}`, { scroll: false });
  }, [router, searchParams, activeInStock]);

  return (
    <aside className="w-full" aria-label="Фильтры прайс-листов">
      {/* Search */}
      <div className="mb-5">
        <label htmlFor="price-search" className="block text-sm font-semibold text-foreground mb-2">
          Поиск по товарам
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <form onSubmit={(e) => { e.preventDefault(); const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value; updateParam("q", q); }}>
            <input
              id="price-search"
              name="q"
              type="search"
              defaultValue={currentQuery}
              placeholder="Горбуша, треска, краб..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            />
          </form>
        </div>
      </div>

      {/* In stock toggle */}
      <div className="mb-5">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={toggleInStock}
            className={`relative w-10 h-6 rounded-full transition-colors ${activeInStock ? "bg-primary" : "bg-border"}`}
            role="switch"
            aria-checked={activeInStock}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleInStock()}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${activeInStock ? "translate-x-4" : ""}`} />
          </div>
          <span className="text-sm font-medium text-foreground">Только в наличии</span>
        </label>
      </div>

      {/* Category */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Вид продукции</h3>
        <select
          value={activeCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          aria-label="Фильтр по виду продукции"
        >
          <option value="">Все виды</option>
          {FISH_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.label}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Processing type */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Тип обработки</h3>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => updateParam("processing", "")}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${!activeProcessing ? "bg-primary text-white font-medium" : "text-foreground/70 hover:bg-secondary"}`}
          >
            Все виды
          </button>
          {PROCESSING_TYPES.map((pt) => (
            <button
              key={pt.slug}
              type="button"
              onClick={() => updateParam("processing", activeProcessing === pt.label ? "" : pt.label)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeProcessing === pt.label ? "bg-primary text-white font-medium" : "text-foreground/70 hover:bg-secondary"}`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Регион поставки</h3>
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
    </aside>
  );
}
