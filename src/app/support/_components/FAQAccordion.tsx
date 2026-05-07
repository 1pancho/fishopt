"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen ? "border-amber-300 shadow-md shadow-amber-50" : "border-border bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-amber-50/50 transition-colors"
            >
              <span className={`font-semibold text-sm leading-snug transition-colors ${isOpen ? "text-amber-700" : "text-foreground"}`}>
                {item.q}
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-amber-500 text-white rotate-45" : "bg-muted text-muted-foreground"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? "200px" : "0px" }}
            >
              <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-amber-100 pt-4">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
