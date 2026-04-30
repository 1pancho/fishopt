import type { Company, NewsArticle } from "@/shared/types";

export const mockCompanies: Company[] = [
  {
    id: "1",
    slug: "dalrybopostavka",
    name: "Дальрыбпоставка",
    description:
      "Оптовые поставки лосося, горбуши, кеты и других тихоокеанских рыб. Прямые контракты с рыбодобытчиками Дальнего Востока.",
    region: "Приморский край",
    city: "Владивосток",
    categories: ["Лосось", "Горбуша", "Кета"],
    activityTypes: ["wholesale", "fishing"],
    verified: true,
    inn: "2540123456",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    slug: "murman-fish",
    name: "Мурман-Фиш",
    description:
      "Треска, пикша, палтус — свежемороженая рыба Баренцева моря. Доставка по всей России.",
    region: "Мурманская область",
    city: "Мурманск",
    categories: ["Треска", "Палтус", "Пикша"],
    activityTypes: ["wholesale", "processing"],
    verified: true,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    slug: "sakhalin-seafood",
    name: "Сахалин Сифуд",
    description:
      "Морепродукты высшего качества: краб, морской ёж, гребешок, устрица. Прямые поставки с Сахалина.",
    region: "Сахалинская область",
    city: "Южно-Сахалинск",
    categories: ["Краб", "Гребешок", "Икра"],
    activityTypes: ["wholesale", "aquaculture"],
    verified: true,
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    slug: "azov-rybprom",
    name: "Азов Рыбпром",
    description:
      "Рыба Азово-Черноморского бассейна: сельдь, кефаль, судак, лещ. Оптовые партии от 1 тонны.",
    region: "Ростовская область",
    city: "Ростов-на-Дону",
    categories: ["Сельдь", "Судак", "Кефаль"],
    activityTypes: ["wholesale", "processing"],
    verified: false,
    createdAt: "2024-03-20",
  },
  {
    id: "5",
    slug: "kamchatka-premium",
    name: "Камчатка Премиум",
    description:
      "Нерка, кижуч, чавыча камчатского происхождения. Сертифицированная продукция, экспорт и внутренний рынок.",
    region: "Камчатский край",
    city: "Петропавловск-Камчатский",
    categories: ["Лосось", "Нерка", "Чавыча"],
    activityTypes: ["fishing", "wholesale"],
    verified: true,
    createdAt: "2024-04-01",
  },
  {
    id: "6",
    slug: "volga-ribhoz",
    name: "Волга Рыбхоз",
    description:
      "Аквакультура и рыбоводство. Карп, форель, осётр, стерлядь. Живая и охлаждённая рыба.",
    region: "Астраханская область",
    city: "Астрахань",
    categories: ["Осётр", "Форель", "Карп"],
    activityTypes: ["aquaculture", "wholesale"],
    verified: false,
    createdAt: "2024-04-10",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    slug: "ikra-tseny-2025",
    title: "Цены на красную икру в 2025 году: прогноз рынка",
    excerpt:
      "Эксперты отрасли дают умеренно-оптимистичный прогноз: ожидается стабилизация цен на икру лососёвых во втором полугодии.",
    category: "market",
    publishedAt: "2025-04-25",
    isPremium: false,
  },
  {
    id: "2",
    slug: "krab-eksport-rekord",
    title: "Экспорт краба достиг рекордных показателей",
    excerpt:
      "По итогам первого квартала 2025 года объём экспорта крабовой продукции вырос на 18% по сравнению с аналогичным периодом прошлого года.",
    category: "fishing",
    publishedAt: "2025-04-22",
    isPremium: false,
  },
  {
    id: "3",
    slug: "dalnevostochny-losos-sezon",
    title: "Открытие лососёвой путины на Дальнем Востоке",
    excerpt:
      "Рыбохозяйственный совет утвердил лимиты вылова на предстоящий сезон. Общий ОДУ лососёвых составит 450 тысяч тонн.",
    category: "fishing",
    publishedAt: "2025-04-18",
    isPremium: false,
  },
];
