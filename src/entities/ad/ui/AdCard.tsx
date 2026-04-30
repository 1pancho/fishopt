import Link from "next/link";
import type { Ad } from "@/shared/types";

type Props = {
  ad: Ad;
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function getDaysLeft(expiresAt?: string): number | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function AdCard({ ad }: Props) {
  const daysLeft = getDaysLeft(ad.expiresAt);
  const isSell = ad.type === "sell";

  return (
    <article className="bg-white rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isSell
                  ? "bg-primary/10 text-primary"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {isSell ? "Продам" : "Куплю"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground text-xs">
              {ad.category}
            </span>
            <span className="text-xs text-muted-foreground">{ad.region}</span>
          </div>

          <h2 className="font-semibold text-foreground leading-snug mb-2 text-base">
            {ad.title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {ad.description}
          </p>

          {/* Details row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {ad.quantity && (
              <span>
                <span className="font-medium text-foreground">
                  {ad.quantity >= 1000
                    ? `${ad.quantity / 1000} т`
                    : `${ad.quantity} кг`}
                </span>{" "}
                {isSell ? "в наличии" : "требуется"}
              </span>
            )}
            {ad.companyId ? (
              <Link
                href={`/company/${ad.companyId === "1" ? "dalrybopostavka" : ad.companyId === "2" ? "murman-fish" : ad.companyId === "3" ? "sakhalin-seafood" : ad.companyId === "5" ? "kamchatka-premium" : ad.companyId === "8" ? "dalnevostochnaya-ryba" : ""}`}
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {ad.contactName}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{ad.contactName}</span>
            )}
            <span>{formatDate(ad.publishedAt)}</span>
            {daysLeft !== null && daysLeft <= 7 && (
              <span className="text-amber-600 font-medium">
                {daysLeft === 0 ? "Истекает сегодня" : `Осталось ${daysLeft} дн.`}
              </span>
            )}
          </div>
        </div>

        {/* Price + contact */}
        <div className="sm:text-right shrink-0">
          {ad.price ? (
            <div className="mb-3">
              <div className="text-2xl font-bold text-foreground">
                {ad.price.toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-xs text-muted-foreground">за кг</div>
            </div>
          ) : (
            <div className="mb-3">
              <div className="text-sm font-medium text-muted-foreground">Цена по запросу</div>
            </div>
          )}

          {ad.phone ? (
            <a
              href={`tel:${ad.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Позвонить
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
            >
              Написать
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
