"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/shared/config/site";
import { BlobButton } from "@/shared/ui/BlobButton";

const ANNOUNCE_KEY = "fishopt_announce_v1";

function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(ANNOUNCE_KEY)) setVisible(false);
    } catch { /* ignore */ }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try { localStorage.setItem(ANNOUNCE_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  };

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0 text-sm">
          <span aria-hidden="true" className="shrink-0">🎉</span>
          <p className="leading-snug">
            <strong>Сейчас бесплатно</strong>
            <span className="hidden sm:inline"> — в конце года сервис станет платным.</span>
            {" "}
            <Link href="/support" className="underline underline-offset-2 font-semibold hover:text-amber-700 transition-colors">
              Стать спонсором
            </Link>
            <span className="hidden sm:inline"> — и пользуйтесь бесплатно навсегда.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/support"
            className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors whitespace-nowrap"
          >
            Стать спонсором
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

const navLinks = [
  { href: "/companies", label: "Компании" },
  { href: "/prices", label: "Прайс-листы" },
  { href: "/ads", label: "Объявления" },
  { href: "/news", label: "Новости" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("fishopt_token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fishopt_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <AnnouncementBar />
      <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Fishopt — на главную"
          >
            <Image
              src="/logo.png"
              alt="Fishopt"
              width={100}
              height={36}
              className="h-9 w-auto logo-dark"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Личный кабинет
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Войти
                </Link>
                <BlobButton href="/register" label="Разместить компанию" />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l12 12M4 16L16 4" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            )}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-4 pt-2 pb-4 flex flex-col gap-1" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 rounded-lg text-base font-medium text-foreground/70 hover:bg-secondary transition-colors text-center"
                  >
                    Личный кабинет
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="px-3 py-3 rounded-lg text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-colors text-center"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 rounded-lg text-base font-medium text-foreground/70 hover:bg-secondary transition-colors text-center"
                  >
                    Войти
                  </Link>
                  <BlobButton href="/register" label="Разместить компанию" className="w-full" />
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
