import Link from "next/link";
import Image from "next/image";
import { siteConfig, FISH_CATEGORIES, REGIONS } from "@/shared/config/site";

const topCategories = FISH_CATEGORIES.slice(0, 6);
const topRegions = REGIONS.slice(0, 6);

export function Footer() {
  return (
    <footer className="bg-[#0c4a6e] text-white mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="Fishopt" width={100} height={34} className="h-8 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Современный B2B портал оптовой торговли рыбой и морепродуктами по всей России.
            </p>
            <div className="mt-4 text-sm text-white/60">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Виды рыбы
            </h3>
            <ul className="space-y-2">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/companies/${cat.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/companies" className="text-accent text-sm hover:text-accent/80 transition-colors">
                  Все категории →
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Регионы
            </h3>
            <ul className="space-y-2">
              {topRegions.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/companies?region=${region.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Сервисы
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/companies", label: "Каталог компаний" },
                { href: "/prices", label: "Прайс-листы" },
                { href: "/ads", label: "Объявления" },
                { href: "/news", label: "Новости отрасли" },
                { href: "/register", label: "Разместить компанию" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Fishopt. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
