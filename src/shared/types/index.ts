export type FishCategory = {
  id: string;
  slug: string;
  label: string;
  icon?: string;
};

export type Region = {
  id: string;
  slug: string;
  label: string;
};

export type Company = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  region: string;
  city?: string;
  categories: string[];
  activityTypes: ActivityType[];
  logoUrl?: string;
  verified: boolean;
  inn?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: string;
};

export type ActivityType =
  | "wholesale"
  | "retail"
  | "processing"
  | "aquaculture"
  | "fishing"
  | "logistics"
  | "customs";

export type PriceList = {
  id: string;
  companyId: string;
  companyName: string;
  companySlug: string;
  items: PriceItem[];
  region: string;
  updatedAt: string;
  validUntil?: string;
};

export type PriceItem = {
  id: string;
  name: string;
  category: string;
  processingType: string;
  grade?: string;
  size?: string;
  price: number;
  currency: "RUB";
  unit: "kg" | "ton";
  minOrder?: number;
  inStock: boolean;
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: NewsCategory;
  imageUrl?: string;
  source?: string;
  publishedAt: string;
  isPremium: boolean;
};

export type NewsCategory =
  | "market"
  | "companies"
  | "fishing"
  | "aquaculture"
  | "regulation"
  | "analytics"
  | "events";

export type Ad = {
  id: string;
  type: "buy" | "sell";
  title: string;
  description: string;
  category: string;
  region: string;
  price?: number;
  priceUnit?: "kg" | "ton";
  quantity?: number;
  contactName: string;
  phone?: string;
  email?: string;
  companyId?: string;
  publishedAt: string;
  expiresAt?: string;
};
