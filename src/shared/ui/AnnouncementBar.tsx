"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "fishopt_announce_v1";

const HIDDEN_PATHS = ["/dashboard", "/login", "/register"];

export function AnnouncementBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage недоступен
    }
  }, []);

  const isHidden = HIDDEN_PATHS.some((p) => (pathname ?? "").startsWith(p));
  if (!visible || isHidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div className="relative z-50 bg-amber-50 border-b border-amber-200 text-amber-900 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0 text-sm">
          <span className="text-base shrink-0" aria-hidden="true">🎉</span>
          <p className="leading-snug">
            <strong>Сейчас бесплатно</strong>
            <span className="hidden sm:inline"> — в конце года сервис станет платным.</span>
            <span className="sm:hidden">.</span>
            {" "}
            <Link
              href="/support"
              className="underline underline-offset-2 font-semibold hover:text-amber-700 transition-colors"
            >
              Поддержите сейчас
            </Link>
            {" "}
            <span className="hidden sm:inline">и пользуйтесь бесплатно навсегда.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/support"
            className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors whitespace-nowrap"
          >
            Стать основателем
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Закрыть"
            className="p-1.5 rounded text-amber-600 hover:text-amber-900 hover:bg-amber-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
