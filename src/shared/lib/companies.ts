import type { Company, ActivityType } from "@/shared/types";

export const allCompanies: Company[] = [
  {
    id: "1",
    slug: "dalrybopostavka",
    name: "Дальрыбпоставка",
    description: "Оптовые поставки лосося, горбуши, кеты и других тихоокеанских рыб. Прямые контракты с рыбодобытчиками Дальнего Востока.",
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
    description: "Треска, пикша, палтус — свежемороженая рыба Баренцева моря. Доставка по всей России.",
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
    description: "Морепродукты высшего качества: краб, морской ёж, гребешок, устрица. Прямые поставки с Сахалина.",
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
    description: "Рыба Азово-Черноморского бассейна: сельдь, кефаль, судак, лещ. Оптовые партии от 1 тонны.",
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
    description: "Нерка, кижуч, чавыча камчатского происхождения. Сертифицированная продукция, экспорт и внутренний рынок.",
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
    description: "Аквакультура и рыбоводство. Карп, форель, осётр, стерлядь. Живая и охлаждённая рыба.",
    region: "Астраханская область",
    city: "Астрахань",
    categories: ["Осётр", "Форель", "Карп"],
    activityTypes: ["aquaculture", "wholesale"],
    verified: false,
    createdAt: "2024-04-10",
  },
  {
    id: "7",
    slug: "arctic-fish",
    name: "Арктик Фиш",
    description: "Семга атлантическая, форель радужная, палтус. Норвежские и российские поставщики.",
    region: "Санкт-Петербург",
    city: "Санкт-Петербург",
    categories: ["Лосось", "Форель", "Палтус"],
    activityTypes: ["wholesale"],
    verified: true,
    createdAt: "2024-04-15",
  },
  {
    id: "8",
    slug: "dalnevostochnaya-ryba",
    name: "Дальневосточная Рыба",
    description: "Оптовые поставки минтая, наваги, трески дальневосточной. Прямые контракты с добытчиками.",
    region: "Хабаровский край",
    city: "Хабаровск",
    categories: ["Минтай", "Треска", "Навага"],
    activityTypes: ["wholesale", "fishing"],
    verified: true,
    createdAt: "2024-04-20",
  },
  {
    id: "9",
    slug: "ikra-premium",
    name: "Икра Премиум",
    description: "Красная и чёрная икра оптом. Икра лосося, осетровых. Собственное производство, ХАССП.",
    region: "Приморский край",
    city: "Владивосток",
    categories: ["Икра"],
    activityTypes: ["processing", "wholesale"],
    verified: true,
    createdAt: "2024-05-01",
  },
  {
    id: "10",
    slug: "ryblogistik",
    name: "РыбЛогистик",
    description: "Перевозка рыбы и морепродуктов в рефрижераторных контейнерах по всей России. Хранение на складах класса А.",
    region: "Москва",
    city: "Москва",
    categories: ["Лосось", "Треска", "Краб"],
    activityTypes: ["logistics"],
    verified: false,
    createdAt: "2024-05-10",
  },
  {
    id: "11",
    slug: "primorsk-krevetka",
    name: "Примоская Креветка",
    description: "Тигровая, королевская и дальневосточная креветка. Охлаждённая и мороженая. Минимальная партия 100 кг.",
    region: "Приморский край",
    city: "Находка",
    categories: ["Креветка"],
    activityTypes: ["wholesale", "fishing"],
    verified: true,
    createdAt: "2024-05-15",
  },
  {
    id: "12",
    slug: "severnaya-seldi",
    name: "Северная Сельдь",
    description: "Атлантическая сельдь свежемороженая и солёная. Поставки из Мурманска и Архангельска.",
    region: "Архангельская область",
    city: "Архангельск",
    categories: ["Сельдь"],
    activityTypes: ["wholesale", "processing"],
    verified: false,
    createdAt: "2024-05-20",
  },
];

type FilterParams = {
  q?: string;
  region?: string;
  activity?: string;
  category?: string;
};

export function filterCompanies(params: FilterParams): Company[] {
  let result = [...allCompanies];

  if (params.category) {
    const catLabel = params.category.toLowerCase();
    result = result.filter((c) =>
      c.categories.some((cat) => cat.toLowerCase().includes(catLabel)) ||
      c.slug.includes(catLabel)
    );
  }

  if (params.region) {
    result = result.filter((c) => {
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
      return c.region === regionMap[params.region!];
    });
  }

  if (params.activity) {
    result = result.filter((c) =>
      c.activityTypes.includes(params.activity as ActivityType)
    );
  }

  if (params.q) {
    const query = params.q.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.categories.some((cat) => cat.toLowerCase().includes(query))
    );
  }

  return result;
}
