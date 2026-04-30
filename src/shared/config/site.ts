export const siteConfig = {
  name: "Fishopt",
  fullName: "Fishopt — Оптовая торговля рыбой",
  url: "https://fishopt.pro",
  description:
    "Современный B2B портал оптовой торговли рыбой и морепродуктами по всей России",
  phone: "",
  email: "info@fishopt.pro",
  socials: {
    telegram: "",
    vk: "",
  },
} as const;

export const FISH_CATEGORIES = [
  { slug: "losos", label: "Лосось", icon: "🐟" },
  { slug: "treska", label: "Треска", icon: "🐠" },
  { slug: "krab", label: "Краб", icon: "🦀" },
  { slug: "krevetka", label: "Креветка", icon: "🦐" },
  { slug: "muksun", label: "Муксун", icon: "🐡" },
  { slug: "gorbusha", label: "Горбуша", icon: "🐟" },
  { slug: "mintaj", label: "Минтай", icon: "🐠" },
  { slug: "ikra", label: "Икра", icon: "🟠" },
  { slug: "kalmar", label: "Кальмар", icon: "🦑" },
  { slug: "seld", label: "Сельдь", icon: "🐟" },
  { slug: "osetr", label: "Осётр", icon: "🐠" },
  { slug: "tunets", label: "Тунец", icon: "🐡" },
] as const;

export const REGIONS = [
  { slug: "primorsky", label: "Приморский край" },
  { slug: "sakhalin", label: "Сахалинская область" },
  { slug: "kamchatka", label: "Камчатский край" },
  { slug: "murmansk", label: "Мурманская область" },
  { slug: "moscow", label: "Москва" },
  { slug: "spb", label: "Санкт-Петербург" },
  { slug: "astrakhan", label: "Астраханская область" },
  { slug: "arkhangelsk", label: "Архангельская область" },
  { slug: "khabarovsk", label: "Хабаровский край" },
  { slug: "rostov", label: "Ростовская область" },
] as const;

export const PROCESSING_TYPES = [
  { slug: "morozhenaya", label: "Мороженая" },
  { slug: "okhlazhyonnaya", label: "Охлаждённая" },
  { slug: "sоlyonaya", label: "Солёная" },
  { slug: "kopchyonaya", label: "Копчёная" },
  { slug: "sushyonaya", label: "Сушёная" },
  { slug: "konservy", label: "Консервы" },
] as const;
