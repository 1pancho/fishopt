import type { PriceList } from "@/shared/types";

export const mockPriceLists: PriceList[] = [
  {
    id: "pl-1",
    companyId: "1",
    companyName: "Дальрыбпоставка",
    companySlug: "dalrybopostavka",
    region: "Приморский край",
    updatedAt: "2025-04-28",
    validUntil: "2025-05-12",
    items: [
      { id: "i1", name: "Горбуша б/г мороженая", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "0.3–0.6 кг", price: 145, currency: "RUB", unit: "kg", minOrder: 500, inStock: true },
      { id: "i2", name: "Кета б/г мороженая", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "2–4 кг", price: 210, currency: "RUB", unit: "kg", minOrder: 500, inStock: true },
      { id: "i3", name: "Нерка б/г мороженая", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "1.5–3 кг", price: 390, currency: "RUB", unit: "kg", minOrder: 200, inStock: true },
      { id: "i4", name: "Горбуша филе мороженое", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "0.2–0.4 кг", price: 285, currency: "RUB", unit: "kg", minOrder: 100, inStock: false },
      { id: "i5", name: "Икра горбуши пробойная", category: "Икра", processingType: "Солёная", grade: "1с", size: "", price: 2800, currency: "RUB", unit: "kg", minOrder: 10, inStock: true },
    ],
  },
  {
    id: "pl-2",
    companyId: "2",
    companyName: "Мурман-Фиш",
    companySlug: "murman-fish",
    region: "Мурманская область",
    updatedAt: "2025-04-27",
    validUntil: "2025-05-10",
    items: [
      { id: "i6", name: "Треска б/г мороженая", category: "Треска", processingType: "Мороженая", grade: "1с", size: "1–3 кг", price: 185, currency: "RUB", unit: "kg", minOrder: 1000, inStock: true },
      { id: "i7", name: "Треска филе мороженое", category: "Треска", processingType: "Мороженая", grade: "1с", size: "0.2–0.5 кг", price: 340, currency: "RUB", unit: "kg", minOrder: 200, inStock: true },
      { id: "i8", name: "Пикша б/г мороженая", category: "Треска", processingType: "Мороженая", grade: "1с", size: "0.5–1.5 кг", price: 165, currency: "RUB", unit: "kg", minOrder: 500, inStock: true },
      { id: "i9", name: "Палтус чёрный мороженый", category: "Палтус", processingType: "Мороженая", grade: "1с", size: "2–5 кг", price: 520, currency: "RUB", unit: "kg", minOrder: 100, inStock: true },
      { id: "i10", name: "Палтус белый мороженый", category: "Палтус", processingType: "Мороженая", grade: "1с", size: "3–8 кг", price: 680, currency: "RUB", unit: "kg", minOrder: 100, inStock: false },
    ],
  },
  {
    id: "pl-3",
    companyId: "3",
    companyName: "Сахалин Сифуд",
    companySlug: "sakhalin-seafood",
    region: "Сахалинская область",
    updatedAt: "2025-04-29",
    items: [
      { id: "i11", name: "Краб камчатский варёно-мороженый", category: "Краб", processingType: "Мороженая", grade: "1с", size: "1.5–3 кг", price: 1850, currency: "RUB", unit: "kg", minOrder: 50, inStock: true },
      { id: "i12", name: "Краб стригун опилио", category: "Краб", processingType: "Мороженая", grade: "1с", size: "0.5–1 кг", price: 950, currency: "RUB", unit: "kg", minOrder: 100, inStock: true },
      { id: "i13", name: "Гребешок мороженый", category: "Гребешок", processingType: "Мороженая", grade: "1с", size: "20–30 г", price: 720, currency: "RUB", unit: "kg", minOrder: 50, inStock: true },
      { id: "i14", name: "Икра морского ежа", category: "Икра", processingType: "Свежая", grade: "1с", size: "", price: 4500, currency: "RUB", unit: "kg", minOrder: 5, inStock: true },
      { id: "i15", name: "Икра лосося зернистая", category: "Икра", processingType: "Солёная", grade: "1с", size: "", price: 3200, currency: "RUB", unit: "kg", minOrder: 10, inStock: true },
    ],
  },
  {
    id: "pl-4",
    companyId: "8",
    companyName: "Дальневосточная Рыба",
    companySlug: "dalnevostochnaya-ryba",
    region: "Хабаровский край",
    updatedAt: "2025-04-26",
    validUntil: "2025-05-09",
    items: [
      { id: "i16", name: "Минтай б/г мороженый", category: "Минтай", processingType: "Мороженая", grade: "1с", size: "0.3–0.8 кг", price: 85, currency: "RUB", unit: "kg", minOrder: 2000, inStock: true },
      { id: "i17", name: "Минтай филе мороженое (блок)", category: "Минтай", processingType: "Мороженая", grade: "А", size: "", price: 185, currency: "RUB", unit: "kg", minOrder: 500, inStock: true },
      { id: "i18", name: "Минтай спинка мороженая", category: "Минтай", processingType: "Мороженая", grade: "1с", size: "", price: 135, currency: "RUB", unit: "kg", minOrder: 500, inStock: true },
      { id: "i19", name: "Треска дальневосточная б/г", category: "Треска", processingType: "Мороженая", grade: "1с", size: "0.5–2 кг", price: 195, currency: "RUB", unit: "kg", minOrder: 500, inStock: false },
      { id: "i20", name: "Навага мороженая", category: "Треска", processingType: "Мороженая", grade: "1с", size: "0.2–0.5 кг", price: 95, currency: "RUB", unit: "kg", minOrder: 1000, inStock: true },
    ],
  },
  {
    id: "pl-5",
    companyId: "5",
    companyName: "Камчатка Премиум",
    companySlug: "kamchatka-premium",
    region: "Камчатский край",
    updatedAt: "2025-04-25",
    items: [
      { id: "i21", name: "Чавыча б/г мороженая", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "4–10 кг", price: 750, currency: "RUB", unit: "kg", minOrder: 100, inStock: true },
      { id: "i22", name: "Нерка б/г мороженая", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "1.5–3 кг", price: 420, currency: "RUB", unit: "kg", minOrder: 200, inStock: true },
      { id: "i23", name: "Кижуч б/г мороженый", category: "Лосось", processingType: "Мороженая", grade: "1с", size: "2–4 кг", price: 380, currency: "RUB", unit: "kg", minOrder: 200, inStock: true },
      { id: "i24", name: "Семга (форель) слабосолёная", category: "Лосось", processingType: "Солёная", grade: "1с", size: "3–5 кг", price: 890, currency: "RUB", unit: "kg", minOrder: 50, inStock: true },
    ],
  },
];

export type FlatPriceItem = {
  itemId: string;
  itemName: string;
  category: string;
  processingType: string;
  grade?: string;
  size?: string;
  price: number;
  unit: "kg" | "ton";
  minOrder?: number;
  inStock: boolean;
  companyId: string;
  companyName: string;
  companySlug: string;
  region: string;
  updatedAt: string;
  priceListId: string;
};

export function getAllPriceItems(): FlatPriceItem[] {
  return mockPriceLists.flatMap((pl) =>
    pl.items.map((item) => ({
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      processingType: item.processingType,
      grade: item.grade,
      size: item.size,
      price: item.price,
      unit: item.unit,
      minOrder: item.minOrder,
      inStock: item.inStock,
      companyId: pl.companyId,
      companyName: pl.companyName,
      companySlug: pl.companySlug,
      region: pl.region,
      updatedAt: pl.updatedAt,
      priceListId: pl.id,
    }))
  );
}

type PriceFilterParams = {
  category?: string;
  region?: string;
  processing?: string;
  inStock?: boolean;
  q?: string;
};

export function filterPriceItems(params: PriceFilterParams): FlatPriceItem[] {
  let result = getAllPriceItems();

  if (params.category) {
    const cat = params.category.toLowerCase();
    result = result.filter((i) => i.category.toLowerCase().includes(cat));
  }

  if (params.region) {
    const regionMap: Record<string, string> = {
      primorsky: "Приморский край",
      sakhalin: "Сахалинская область",
      kamchatka: "Камчатский край",
      murmansk: "Мурманская область",
      moscow: "Москва",
      spb: "Санкт-Петербург",
      astrakhan: "Астраханская область",
      arkhangelsk: "Архангельская область",
      khabarovsk: "Хабаровский край",
      rostov: "Ростовская область",
    };
    result = result.filter((i) => i.region === regionMap[params.region!]);
  }

  if (params.processing) {
    result = result.filter((i) =>
      i.processingType.toLowerCase().includes(params.processing!.toLowerCase())
    );
  }

  if (params.inStock) {
    result = result.filter((i) => i.inStock);
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (i) =>
        i.itemName.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.companyName.toLowerCase().includes(q)
    );
  }

  return result;
}

export function getPriceListByCompany(companySlug: string): PriceList | undefined {
  return mockPriceLists.find((pl) => pl.companySlug === companySlug);
}
