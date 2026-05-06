const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "API error");
  }

  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export function apiLogin(email: string, password: string) {
  return apiFetch<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function apiRegister(data: {
  name: string;
  email: string;
  password: string;
  region: string;
  inn?: string;
  city?: string;
  activityTypes?: string[];
  categories?: string[];
  phone?: string;
  website?: string;
  description?: string;
}) {
  return apiFetch<{ access_token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function apiGetMe(token: string) {
  return apiFetch<{ id: string; email: string; role: string; company: { slug: string; name: string } | null }>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Companies ─────────────────────────────────────────────────────────────────

export type ApiCompany = {
  id: string;
  inn: string | null;
  slug: string;
  name: string;
  region: string;
  city: string | null;
  activityTypes: string[];
  categories: string[];
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  logoUrl: string | null;
  isVerified: boolean;
  priceLists: ApiPriceList[];
  createdAt: string;
};

export type ApiPriceList = {
  id: string;
  inn: string | null;
  updatedAt: string;
  items: ApiPriceItem[];
};

export type ApiPriceItem = {
  id: string;
  inn: string | null;
  name: string;
  category: string;
  processingType: string;
  price: number;
  currency: string;
  unit: string;
  minOrder: number | null;
  inStock: boolean;
};

export type ApiAd = {
  id: string;
  inn: string | null;
  type: "sell" | "buy";
  title: string;
  description: string | null;
  category: string;
  region: string;
  price: number | null;
  priceUnit: string;
  quantity: number | null;
  contactName: string | null;
  phone: string | null;
  publishedAt: string;
  expiresAt: string;
  companyId: string;
  company?: { slug: string; name: string };
};

export type ApiNewsArticle = {
  id: string;
  inn: string | null;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string | null;
  author: string;
  readTime: number;
  publishedAt: string;
};

export async function apiGetCompanies(params: {
  q?: string;
  region?: string;
  activity?: string;
  category?: string;
  page?: number;
  limit?: number;
} = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.region) qs.set("region", params.region);
  if (params.activity) qs.set("activity", params.activity);
  if (params.category) qs.set("category", params.category);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const query = qs.toString();
  return apiFetch<{ data: ApiCompany[]; total: number; page: number; limit: number }>(
    `/companies${query ? `?${query}` : ""}`,
    { next: { revalidate: 60 } },
  );
}

export async function apiGetCompany(slug: string) {
  return apiFetch<ApiCompany & { ads: ApiAd[] }>(`/companies/${slug}`, {
    next: { revalidate: 300 },
  });
}

export async function apiUploadLogo(token: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload/logo`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Ошибка загрузки");
  }
  return res.json() as Promise<{ logoUrl: string }>;
}

export async function apiImportPrices(token: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload/prices`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Ошибка импорта");
  }
  return res.json() as Promise<{ imported: number; message: string }>;
}

export function apiUpdateCompany(token: string, id: string, data: {
  name?: string;
  inn?: string;
  region?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  activityTypes?: string[];
  categories?: string[];
}) {
  return apiFetch<ApiCompany>(`/companies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Prices ────────────────────────────────────────────────────────────────────

export type FlatApiPriceItem = ApiPriceItem & {
  companySlug: string;
  companyName: string;
  region: string;
  updatedAt: string;
};

export async function apiGetPrices(params: {
  q?: string;
  category?: string;
  processingType?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
} = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.processingType) qs.set("processingType", params.processingType);
  if (params.inStock !== undefined) qs.set("inStock", String(params.inStock));
  if (params.minPrice !== undefined) qs.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) qs.set("maxPrice", String(params.maxPrice));
  const query = qs.toString();
  return apiFetch<FlatApiPriceItem[]>(
    `/prices${query ? `?${query}` : ""}`,
    { next: { revalidate: 60 } },
  );
}

export async function apiGetCompanyPrices(slug: string) {
  return apiFetch<ApiPriceList & { items: ApiPriceItem[] } | null>(`/prices/company/${slug}`, {
    next: { revalidate: 60 },
  });
}

export function apiSaveMyPrices(token: string, items: Omit<ApiPriceItem, "id" | "currency" | "unit">[]) {
  return apiFetch("/prices/my", {
    method: "POST",
    body: JSON.stringify(items),
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Ads ───────────────────────────────────────────────────────────────────────

export async function apiGetAds(params: {
  type?: string;
  category?: string;
  region?: string;
  q?: string;
} = {}) {
  const qs = new URLSearchParams();
  if (params.type) qs.set("type", params.type);
  if (params.category) qs.set("category", params.category);
  if (params.region) qs.set("region", params.region);
  if (params.q) qs.set("q", params.q);
  const query = qs.toString();
  return apiFetch<ApiAd[]>(
    `/ads${query ? `?${query}` : ""}`,
    { next: { revalidate: 30 } },
  );
}

export function apiGetMyAds(token: string) {
  return apiFetch<ApiAd[]>("/ads/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function apiCreateAd(token: string, data: Partial<ApiAd>) {
  return apiFetch<ApiAd>("/ads", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function apiDeleteAd(token: string, id: string) {
  return apiFetch(`/ads/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── News ──────────────────────────────────────────────────────────────────────

export async function apiGetNews(params: { category?: string; q?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.q) qs.set("q", params.q);
  const query = qs.toString();
  return apiFetch<ApiNewsArticle[]>(
    `/news${query ? `?${query}` : ""}`,
    { next: { revalidate: 300 } },
  );
}

export async function apiGetArticle(slug: string) {
  return apiFetch<ApiNewsArticle>(`/news/${slug}`, {
    next: { revalidate: 300 },
  });
}
