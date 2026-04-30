import Link from "next/link";
import type { FlatPriceItem } from "@/shared/lib/prices";

type Props = {
  items: FlatPriceItem[];
};

function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU");
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
}

export function PriceTable({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4" aria-hidden="true">📋</div>
        <h3 className="font-semibold text-foreground mb-2">Позиции не найдены</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Попробуйте изменить фильтры или поисковый запрос
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-semibold text-foreground/80 w-[35%]">Наименование</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground/80">Обработка</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground/80">Размер</th>
              <th className="text-right px-4 py-3 font-semibold text-foreground/80">Цена, ₽/кг</th>
              <th className="text-right px-4 py-3 font-semibold text-foreground/80">Мин. партия</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground/80">Компания</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground/80">Обновлено</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr
                key={item.itemId}
                className={`group hover:bg-primary/5 transition-colors ${!item.inStock ? "opacity-60" : ""}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.itemName}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                        {item.grade && (
                          <span className="text-xs px-1.5 py-0 rounded bg-secondary text-muted-foreground">
                            {item.grade}
                          </span>
                        )}
                        {!item.inStock && (
                          <span className="text-xs text-destructive">нет в наличии</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{item.processingType}</td>
                <td className="px-4 py-3 text-muted-foreground">{item.size || "—"}</td>
                <td className="px-4 py-3 text-right">
                  <span className="font-bold text-foreground text-base">
                    {formatPrice(item.price)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">
                  {item.minOrder ? `${item.minOrder} кг` : "—"}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/company/${item.companySlug}`}
                    className="text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap"
                  >
                    {item.companyName}
                  </Link>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.region}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                  {formatDate(item.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.itemId}
            className={`bg-white rounded-xl border border-border p-4 ${!item.inStock ? "opacity-70" : ""}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground leading-tight text-sm">
                  {item.itemName}
                </h3>
                <div className="flex items-center flex-wrap gap-1.5 mt-1">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">{item.category}</span>
                  <span className="text-xs text-muted-foreground">{item.processingType}</span>
                  {item.grade && <span className="text-xs text-muted-foreground">· {item.grade}</span>}
                  {!item.inStock && <span className="text-xs text-destructive font-medium">нет в наличии</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-foreground">
                  {formatPrice(item.price)} ₽
                </div>
                <div className="text-xs text-muted-foreground">за кг</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
              {item.size && (
                <div>
                  <span className="font-medium text-foreground/60">Размер:</span>{" "}
                  {item.size}
                </div>
              )}
              {item.minOrder && (
                <div>
                  <span className="font-medium text-foreground/60">Мин. партия:</span>{" "}
                  {item.minOrder} кг
                </div>
              )}
            </div>

            {/* Company */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <Link
                  href={`/company/${item.companySlug}`}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {item.companyName}
                </Link>
                <div className="text-xs text-muted-foreground">{item.region}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(item.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
