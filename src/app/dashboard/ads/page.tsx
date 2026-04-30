"use client";

import { useState } from "react";
import { mockAds } from "@/shared/lib/ads";
import { FISH_CATEGORIES, REGIONS } from "@/shared/config/site";

type NewAd = {
  type: "sell" | "buy";
  title: string;
  description: string;
  category: string;
  region: string;
  price: string;
  quantity: string;
};

const emptyAd: NewAd = {
  type: "sell",
  title: "",
  description: "",
  category: "",
  region: "",
  price: "",
  quantity: "",
};

export default function DashboardAdsPage() {
  const myAds = mockAds.filter((a) => a.companyId === "1");
  const [ads, setAds] = useState(myAds);
  const [showForm, setShowForm] = useState(false);
  const [newAd, setNewAd] = useState<NewAd>(emptyAd);
  const [saved, setSaved] = useState(false);

  const handleAdd = () => {
    if (!newAd.title || !newAd.category) return;
    setAds((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        type: newAd.type,
        title: newAd.title,
        description: newAd.description,
        category: newAd.category,
        region: newAd.region || "Приморский край",
        price: newAd.price ? Number(newAd.price) : undefined,
        priceUnit: "kg" as const,
        quantity: newAd.quantity ? Number(newAd.quantity) : undefined,
        contactName: "Дальрыбпоставка",
        phone: "+7 (423) 222-33-44",
        companyId: "1",
        publishedAt: new Date().toISOString().split("T")[0],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    ]);
    setNewAd(emptyAd);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => setAds((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Мои объявления</h1>
          <p className="text-muted-foreground text-sm mt-1">Купля и продажа рыбы и морепродуктов</p>
        </div>
        {saved && (
          <span className="text-sm text-emerald-600 font-medium">✓ Объявление добавлено</span>
        )}
      </div>

      {/* Existing ads */}
      {ads.length > 0 ? (
        <div className="flex flex-col gap-3 mb-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-white rounded-xl border border-border p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ad.type === "sell" ? "bg-primary/10 text-primary" : "bg-emerald-100 text-emerald-700"}`}>
                    {ad.type === "sell" ? "Продам" : "Куплю"}
                  </span>
                  <span className="text-xs text-muted-foreground">{ad.category}</span>
                  <span className="text-xs text-muted-foreground">· {ad.region}</span>
                </div>
                <h3 className="font-semibold text-foreground leading-snug mb-1 text-sm">
                  {ad.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {ad.price && <span className="font-medium text-foreground">{ad.price.toLocaleString("ru-RU")} ₽/кг</span>}
                  {ad.quantity && <span>{ad.quantity >= 1000 ? `${ad.quantity / 1000} т` : `${ad.quantity} кг`}</span>}
                  {ad.expiresAt && (
                    <span>
                      до {new Date(ad.expiresAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(ad.id)}
                className="shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                aria-label="Удалить объявление"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border text-center py-12 mb-4">
          <div className="text-4xl mb-3" aria-hidden="true">📢</div>
          <p className="font-medium text-foreground">Нет активных объявлений</p>
          <p className="text-sm text-muted-foreground mt-1">Подайте первое объявление о продаже</p>
        </div>
      )}

      {/* Add form */}
      {showForm ? (
        <div className="bg-white rounded-xl border border-primary/30 p-6">
          <h3 className="font-semibold text-foreground mb-4">Новое объявление</h3>

          {/* Type toggle */}
          <div className="flex gap-2 mb-4">
            {(["sell", "buy"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setNewAd((p) => ({ ...p, type: t }))}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  newAd.type === t
                    ? t === "sell" ? "bg-primary text-white" : "bg-emerald-600 text-white"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {t === "sell" ? "Продам" : "Куплю"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Заголовок <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={newAd.title}
                onChange={(e) => setNewAd((p) => ({ ...p, title: e.target.value }))}
                placeholder="Горбуша б/г мороженая, 1с, 20 тонн"
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Описание</label>
              <textarea
                value={newAd.description}
                onChange={(e) => setNewAd((p) => ({ ...p, description: e.target.value }))}
                placeholder="Подробнее о товаре, условиях поставки..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Вид рыбы <span className="text-destructive">*</span>
                </label>
                <select
                  value={newAd.category}
                  onChange={(e) => setNewAd((p) => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-sm"
                >
                  <option value="">Выберите...</option>
                  {FISH_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.label}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Регион</label>
                <select
                  value={newAd.region}
                  onChange={(e) => setNewAd((p) => ({ ...p, region: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-sm"
                >
                  <option value="">Выберите...</option>
                  {REGIONS.map((r) => (
                    <option key={r.slug} value={r.label}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Цена, ₽/кг</label>
                <input
                  type="number"
                  value={newAd.price}
                  onChange={(e) => setNewAd((p) => ({ ...p, price: e.target.value }))}
                  placeholder="145"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Объём, кг</label>
                <input
                  type="number"
                  value={newAd.quantity}
                  onChange={(e) => setNewAd((p) => ({ ...p, quantity: e.target.value }))}
                  placeholder="20000"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={() => { setShowForm(false); setNewAd(emptyAd); }}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newAd.title || !newAd.category}
              className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              Опубликовать
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary text-sm font-medium transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Подать новое объявление
        </button>
      )}
    </div>
  );
}
