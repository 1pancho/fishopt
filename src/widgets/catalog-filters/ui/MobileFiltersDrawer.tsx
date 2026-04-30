"use client";

import { useState } from "react";
import { CompanyFilters } from "./CompanyFilters";

type Props = {
  activeCategory?: string;
  totalCount: number;
};

export function MobileFiltersDrawer({ activeCategory, totalCount }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium hover:bg-secondary transition-colors"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
        </svg>
        Фильтры
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Фильтры"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] bg-white shadow-xl transition-transform duration-300 md:hidden flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Фильтры</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            aria-label="Закрыть фильтры"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <CompanyFilters activeCategory={activeCategory} />
        </div>

        {/* Apply button */}
        <div className="px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Показать компании ({totalCount})
          </button>
        </div>
      </div>
    </>
  );
}
