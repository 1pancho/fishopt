"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../_components/auth-provider";
import { apiGetCompany, apiUpdateCompany, apiUploadLogo, type ApiCompany } from "@/shared/lib/api";
import { FISH_CATEGORIES, REGIONS } from "@/shared/config/site";

const ACTIVITY_OPTIONS = [
  { value: "wholesale", label: "Оптовая торговля" },
  { value: "processing", label: "Переработка рыбы" },
  { value: "fishing", label: "Промышленное рыболовство" },
  { value: "aquaculture", label: "Аквакультура / рыбоводство" },
  { value: "logistics", label: "Логистика / хранение" },
  { value: "retail", label: "Розничная торговля" },
];

type FormState = {
  name: string;
  inn: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  activityTypes: string[];
  categories: string[];
};

export default function DashboardSettingsPage() {
  const { token, user } = useAuth();
  const [company, setCompany] = useState<ApiCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", inn: "", city: "", region: "",
    phone: "", email: "", website: "", description: "",
    activityTypes: [], categories: [],
  });

  useEffect(() => {
    if (!user.company?.slug) { setLoading(false); return; }
    apiGetCompany(user.company.slug)
      .then((c) => {
        setCompany(c);
        setLogoUrl(c.logoUrl);
        setForm({
          name: c.name ?? "",
          inn: c.inn ?? "",
          city: c.city ?? "",
          region: c.region ?? "",
          phone: c.phone ?? "",
          email: c.email ?? "",
          website: c.website ?? "",
          description: c.description ?? "",
          activityTypes: c.activityTypes ?? [],
          categories: c.categories ?? [],
        });
      })
      .catch(() => setError("Не удалось загрузить данные компании"))
      .finally(() => setLoading(false));
  }, [user]);

  const toggleMulti = (field: "activityTypes" | "categories", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    setError(null);
    try {
      const res = await apiUploadLogo(token, file);
      setLogoUrl(`http://localhost:3001${res.logoUrl}`);
    } catch (err: any) {
      setError(err.message ?? "Ошибка загрузки лого");
    } finally {
      setLogoUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!company) return;
    setSaving(true);
    setError(null);
    try {
      await apiUpdateCompany(token, company.id, {
        name: form.name || undefined,
        inn: form.inn || undefined,
        city: form.city || undefined,
        region: form.region || undefined,
        phone: form.phone || undefined,
        email: form.email || undefined,
        website: form.website || undefined,
        description: form.description || undefined,
        activityTypes: form.activityTypes,
        categories: form.categories,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) {
      setError(e.message ?? "Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user.company) {
    return (
      <div className="p-4 md:p-8 max-w-2xl">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="font-semibold text-amber-800">У вас ещё нет компании</p>
          <p className="text-sm text-amber-700 mt-1">Зарегистрируйте компанию, чтобы управлять профилем</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Профиль компании</h1>
          <p className="text-muted-foreground text-sm mt-1">Эти данные видят покупатели на вашей странице</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-primary text-white hover:bg-primary/90 disabled:opacity-60"
          }`}
        >
          {saved ? "✓ Сохранено" : saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Logo upload */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6 flex items-center gap-6">
        <div className="shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Логотип компании"
              className="w-20 h-20 rounded-xl object-contain border border-border bg-muted/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground border border-border">
              {form.name.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm mb-1">Логотип компании</p>
          <p className="text-xs text-muted-foreground mb-3">JPG, PNG, WebP, SVG — до 5 МБ</p>
          <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            logoUploading
              ? "bg-muted text-muted-foreground cursor-wait"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {logoUploading ? "Загрузка..." : "Загрузить лого"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={logoUploading}
              onChange={handleLogoUpload}
            />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 flex flex-col gap-5">
        {/* Название */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Название компании <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ИНН */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">ИНН</label>
            <input
              type="text"
              value={form.inn}
              onChange={(e) => setForm((p) => ({ ...p, inn: e.target.value.replace(/\D/g, "").slice(0, 12) }))}
              placeholder="1234567890"
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm font-mono"
            />
          </div>

          {/* Город */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Город</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Владивосток"
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>

          {/* Регион */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Регион</label>
            <select
              value={form.region}
              onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-sm"
            >
              <option value="">Выберите регион</option>
              {REGIONS.map((r) => (
                <option key={r.slug} value={r.slug}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Телефон</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+7 (xxx) xxx-xx-xx"
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="company@example.ru"
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>

          {/* Сайт */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Сайт</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              placeholder="https://example.ru"
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Описание */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Описание</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Чем занимается ваша компания..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">{form.description.length}/500</p>
        </div>

        {/* Вид деятельности */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Вид деятельности</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ACTIVITY_OPTIONS.map((opt) => {
              const checked = form.activityTypes.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleMulti("activityTypes", opt.value)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Виды продукции */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Виды продукции</p>
          <div className="flex flex-wrap gap-2">
            {FISH_CATEGORIES.map((cat) => {
              const checked = form.categories.includes(cat.label);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => toggleMulti("categories", cat.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                    checked
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:border-primary/40 text-foreground/70"
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
