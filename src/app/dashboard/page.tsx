"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./_components/auth-provider";
import { apiGetCompanyPrices, apiGetMyAds, type ApiPriceItem, type ApiAd } from "@/shared/lib/api";

const quickActions = [
  {
    href: "/dashboard/prices",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
    label: "Обновить прайс-лист",
    desc: "Добавить или изменить цены",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/dashboard/ads",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    label: "Подать объявление",
    desc: "Купля или продажа",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [priceItems, setPriceItems] = useState<ApiPriceItem[]>([]);
  const [ads, setAds] = useState<ApiAd[]>([]);
  const [priceUpdatedAt, setPriceUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!user.company) return;
    apiGetCompanyPrices(user.company.slug).then((pl) => {
      if (pl) {
        setPriceItems(pl.items);
        setPriceUpdatedAt(pl.updatedAt);
      }
    }).catch(() => {});
    apiGetMyAds(token).then(setAds).catch(() => {});
  }, [token, user]);

  const companyName = user.company?.name ?? user.email;
  const companySlug = user.company?.slug;

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Добрый день, {companyName}</h1>
        <p className="text-muted-foreground mt-1">
          Вот что происходит с вашим профилем на Fishopt
        </p>
      </div>

      {/* Founder CTA banner */}
      <Link
        href="/support"
        className="group flex items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 rounded-xl p-4 mb-8 hover:border-amber-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl shrink-0" aria-hidden="true">⭐</div>
          <div>
            <p className="font-semibold text-amber-900 text-sm">Сейчас сервис бесплатный</p>
            <p className="text-amber-700 text-xs mt-0.5">
              В конце года появятся платные тарифы. Поддержите нас сейчас — и пользуйтесь бесплатно навсегда.
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs font-bold text-amber-700 bg-amber-200 group-hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
          Стать спонсором →
        </span>
      </Link>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Позиций в прайсе", value: String(priceItems.length), period: "актуально" },
          { label: "Объявлений", value: String(ads.length), period: "активных" },
          { label: "В наличии", value: String(priceItems.filter((i) => i.inStock).length), period: "позиций" },
          { label: "Не в наличии", value: String(priceItems.filter((i) => !i.inStock).length), period: "позиций" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
              {action.icon}
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                {action.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
            </div>
          </Link>
        ))}
        {companySlug && (
          <Link
            href={`/company/${companySlug}`}
            className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-violet-100 text-violet-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                Посмотреть профиль
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Как видят покупатели</p>
            </div>
          </Link>
        )}
      </div>

      {/* Price list + Ads preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Прайс-лист</h2>
            <Link href="/dashboard/prices" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Управлять →
            </Link>
          </div>
          {priceItems.length > 0 ? (
            <div className="flex flex-col gap-2">
              {priceItems.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground truncate mr-3">{item.name}</span>
                  <span className="text-sm font-bold text-foreground shrink-0">
                    {item.price.toLocaleString("ru-RU")} ₽/кг
                  </span>
                </div>
              ))}
              {priceUpdatedAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Обновлено {new Date(priceUpdatedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-3">Прайс-лист не загружен</p>
              <Link href="/dashboard/prices" className="text-sm font-medium text-primary hover:text-primary/80">
                Добавить прайс →
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Мои объявления</h2>
            <Link href="/dashboard/ads" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Управлять →
            </Link>
          </div>
          {ads.length > 0 ? (
            <div className="flex flex-col gap-3">
              {ads.map((ad) => (
                <div key={ad.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${ad.type === "sell" ? "bg-primary/10 text-primary" : "bg-emerald-100 text-emerald-700"}`}>
                    {ad.type === "sell" ? "Продам" : "Куплю"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug truncate">{ad.title}</p>
                    {ad.price && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {ad.price.toLocaleString("ru-RU")} ₽/кг
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-3">Нет активных объявлений</p>
              <Link href="/dashboard/ads" className="text-sm font-medium text-primary hover:text-primary/80">
                Подать объявление →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
