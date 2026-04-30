import type { Ad } from "@/shared/types";

export const mockAds: Ad[] = [
  {
    id: "ad-1",
    type: "sell",
    title: "Горбуша б/г мороженая, 1с, 20 тонн",
    description: "Реализуем горбушу б/г мороженую, сорт 1с, размер 0.3–0.6 кг. Упаковка: картонный ящик 22 кг. Наличие на складе во Владивостоке. Отгрузка от 5 тонн. Возможна доставка транспортной компанией.",
    category: "Лосось",
    region: "Приморский край",
    price: 148,
    priceUnit: "kg",
    quantity: 20000,
    contactName: "Дальрыбпоставка",
    phone: "+7 (423) 222-33-44",
    companyId: "1",
    publishedAt: "2025-04-28",
    expiresAt: "2025-05-28",
  },
  {
    id: "ad-2",
    type: "buy",
    title: "Куплю треску мороженую, от 50 тонн",
    description: "Закупаем треску мороженую б/г, сорт 1с–2с, размер от 1 кг. Рассмотрим предложения из Мурманска, Архангельска. Оплата по факту или предоплата 50%. Самовывоз или с доставкой до Москвы.",
    category: "Треска",
    region: "Москва",
    quantity: 50000,
    contactName: "РыбТорг МСК",
    phone: "+7 (495) 111-22-33",
    publishedAt: "2025-04-27",
    expiresAt: "2025-05-27",
  },
  {
    id: "ad-3",
    type: "sell",
    title: "Краб камчатский варёно-мороженый, партия 3 тонны",
    description: "Предлагаем краба камчатского варёно-мороженого, 1с, ноги/клешни, средний размер 1.5–2.5 кг. Производитель: Сахалинская область. Сертификаты ХАССП, MSC. Экспорт и внутренний рынок.",
    category: "Краб",
    region: "Сахалинская область",
    price: 1900,
    priceUnit: "kg",
    quantity: 3000,
    contactName: "Сахалин Сифуд",
    phone: "+7 (4242) 55-66-77",
    companyId: "3",
    publishedAt: "2025-04-26",
    expiresAt: "2025-05-26",
  },
  {
    id: "ad-4",
    type: "sell",
    title: "Минтай б/г мороженый оптом, от 100 тонн",
    description: "Реализуем минтай б/г мороженый, 1с, 0.3–0.8 кг, производство Хабаровский край. Цена от объёма. При покупке от 100 т — скидка 5 ₽/кг. Холодильник в Хабаровске, возможна отгрузка в рефконтейнерах.",
    category: "Минтай",
    region: "Хабаровский край",
    price: 87,
    priceUnit: "kg",
    quantity: 100000,
    contactName: "Дальневосточная Рыба",
    phone: "+7 (4212) 88-99-00",
    companyId: "8",
    publishedAt: "2025-04-25",
    expiresAt: "2025-05-25",
  },
  {
    id: "ad-5",
    type: "buy",
    title: "Куплю икру горбуши пробойную, 500 кг",
    description: "Приобрету икру горбуши пробойную, сорт 1с, в бочках или ведрах. Рассмотрю предложения из Дальнего Востока и Камчатки. Возможна предоплата. Самовывоз или доставка за счёт поставщика.",
    category: "Икра",
    region: "Санкт-Петербург",
    quantity: 500,
    contactName: "ИП Смирнов А.В.",
    phone: "+7 (812) 333-44-55",
    publishedAt: "2025-04-24",
    expiresAt: "2025-05-24",
  },
  {
    id: "ad-6",
    type: "sell",
    title: "Атлантическая сельдь жирная, 40 тонн",
    description: "Предлагаем сельдь атлантическую мороженую, жирная, 1с, размер 300+ г. Производство Норвегия / Исландия. Наличие в порту Мурманск. Поставка рефсекцией или авто по России.",
    category: "Сельдь",
    region: "Мурманская область",
    price: 112,
    priceUnit: "kg",
    quantity: 40000,
    contactName: "Мурман-Фиш",
    phone: "+7 (8152) 22-33-44",
    companyId: "2",
    publishedAt: "2025-04-23",
    expiresAt: "2025-05-23",
  },
  {
    id: "ad-7",
    type: "sell",
    title: "Чавыча дикая мороженая, ограниченная партия",
    description: "Реализуем чавычу б/г мороженую камчатскую, 1с, крупная от 5 кг. Уникальный продукт, ограниченная партия 2 тонны. Возможна нарезка по требованию покупателя.",
    category: "Лосось",
    region: "Камчатский край",
    price: 780,
    priceUnit: "kg",
    quantity: 2000,
    contactName: "Камчатка Премиум",
    phone: "+7 (4152) 66-77-88",
    companyId: "5",
    publishedAt: "2025-04-22",
    expiresAt: "2025-05-22",
  },
  {
    id: "ad-8",
    type: "buy",
    title: "Закупаем форель охлаждённую, еженедельно",
    description: "Сеть ресторанов закупает форель радужную охлаждённую, тушка потрошёная, 1–2 кг, еженедельно от 500 кг. Нужен постоянный поставщик. Рассмотрим аквафермы Ленинградской, Карелии, Мурманска.",
    category: "Форель",
    region: "Санкт-Петербург",
    quantity: 500,
    contactName: "Ресторанная группа «Атлантик»",
    phone: "+7 (812) 777-88-99",
    publishedAt: "2025-04-21",
    expiresAt: "2025-05-21",
  },
];

type AdFilter = {
  type?: "buy" | "sell";
  category?: string;
  region?: string;
  q?: string;
};

export function filterAds(params: AdFilter): Ad[] {
  let result = [...mockAds];

  if (params.type) {
    result = result.filter((a) => a.type === params.type);
  }

  if (params.category) {
    result = result.filter((a) =>
      a.category.toLowerCase().includes(params.category!.toLowerCase())
    );
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
    result = result.filter((a) => a.region === regionMap[params.region!]);
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  return result;
}
