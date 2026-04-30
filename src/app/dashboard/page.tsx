import type { Metadata } from "next";
import Link from "next/link";
import { getPriceListByCompany } from "@/shared/lib/prices";
import { mockAds } from "@/shared/lib/ads";

export const metadata: Metadata = {
  title: "Личный кабинет — Fishopt",
  robots: { index: false, follow: false },
};

const stats = [
  { label: "Просмотров профиля", value: "248", change: "+12%", period: "за 7 дней" },
  { label: "Запросов контактов", value: "14", change: "+3", period: "за 7 дней" },
  { label: "Позиций в прайсе", value: "5", change: null, period: "актуально" },
  { label: "Объявлений", value: "1", change: null, period: "активных" },
];

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
  {
    href: "/company/dalrybopostavka",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    label: "Посмотреть профиль",
    desc: "Как видят покупатели",
    color: "bg-violet-100 text-violet-700",
  },
];

export default function DashboardPage() {
  const priceList = getPriceListByCompany("dalrybopostavka");
  const myAds = mockAds.filter((a) => a.companyId === "1");

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Добрый день, Дальрыбпоставка</h1>
        <p className="text-muted-foreground mt-1">
          Вот что происходит с вашим профилем на Fishopt
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-border p-5"
          >
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              {stat.change && (
                <span className="text-sm text-emerald-600 font-medium mb-0.5">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
      </div>

      {/* Profile completeness */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Заполненность профиля</h2>
          <span className="text-sm font-bold text-primary">70%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-4">
          <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }} />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { done: true, label: "Название и регион" },
            { done: true, label: "Виды деятельности" },
            { done: true, label: "Контактные данные" },
            { done: false, label: "Добавьте логотип компании" },
            { done: false, label: "Загрузите прайс-лист" },
            { done: false, label: "Опишите компанию подробнее" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-primary" : "bg-border"}`}>
                {item.done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price list preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Прайс-лист</h2>
            <Link href="/dashboard/prices" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Управлять →
            </Link>
          </div>
          {priceList ? (
            <div className="flex flex-col gap-2">
              {priceList.items.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground truncate mr-3">{item.name}</span>
                  <span className="text-sm font-bold text-foreground shrink-0">
                    {item.price.toLocaleString("ru-RU")} ₽/кг
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-1">
                Обновлено {new Date(priceList.updatedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
              </p>
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
          {myAds.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myAds.map((ad) => (
                <div key={ad.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${ad.type === "sell" ? "bg-primary/10 text-primary" : "bg-emerald-100 text-emerald-700"}`}>
                    {ad.type === "sell" ? "Продам" : "Куплю"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug truncate">
                      {ad.title}
                    </p>
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
