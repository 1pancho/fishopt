"use client";

const PRICES = [
  { name: "Горбуша с/м", price: "185 ₽/кг", trend: "up" },
  { name: "Треска б/г", price: "310 ₽/кг", trend: "down" },
  { name: "Кета н/р", price: "240 ₽/кг", trend: "up" },
  { name: "Краб стригун", price: "1 850 ₽/кг", trend: "up" },
  { name: "Сёмга охл.", price: "720 ₽/кг", trend: "down" },
  { name: "Минтай б/г", price: "115 ₽/кг", trend: "neutral" },
  { name: "Икра горбуши", price: "3 200 ₽/кг", trend: "up" },
  { name: "Палтус с/м", price: "580 ₽/кг", trend: "down" },
  { name: "Гребешок", price: "1 100 ₽/кг", trend: "up" },
  { name: "Кижуч с/м", price: "420 ₽/кг", trend: "neutral" },
  { name: "Форель охл.", price: "650 ₽/кг", trend: "up" },
  { name: "Кальмар б/г", price: "195 ₽/кг", trend: "down" },
];

const trendIcon = (trend: string) => {
  if (trend === "up") return <span className="text-emerald-400">▲</span>;
  if (trend === "down") return <span className="text-red-400">▼</span>;
  return <span className="text-white/40">—</span>;
};

export function PriceTicker() {
  const items = [...PRICES, ...PRICES]; // duplicate for seamless loop

  return (
    <div className="ticker-bar bg-[#0c3a52] border-b border-white/10 text-white/80 text-xs py-1.5 overflow-hidden select-none">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="ticker-item inline-flex items-center gap-1.5 px-5">
            <span className="font-medium text-white/60">{item.name}</span>
            <span className="font-semibold">{item.price}</span>
            {trendIcon(item.trend)}
            <span className="text-white/20 ml-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
