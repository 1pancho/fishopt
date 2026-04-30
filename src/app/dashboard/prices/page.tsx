"use client";

import { useState } from "react";
import { getPriceListByCompany } from "@/shared/lib/prices";
import { FISH_CATEGORIES, PROCESSING_TYPES } from "@/shared/config/site";

type NewItem = {
  name: string;
  category: string;
  processingType: string;
  price: string;
  minOrder: string;
  inStock: boolean;
};

const emptyItem: NewItem = {
  name: "",
  category: "",
  processingType: "",
  price: "",
  minOrder: "",
  inStock: true,
};

export default function DashboardPricesPage() {
  const priceList = getPriceListByCompany("dalrybopostavka");
  const [items, setItems] = useState(priceList?.items ?? []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<NewItem>(emptyItem);
  const [saved, setSaved] = useState(false);

  const handleAdd = () => {
    if (!newItem.name || !newItem.price) return;
    setItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        name: newItem.name,
        category: newItem.category || "Прочее",
        processingType: newItem.processingType || "Мороженая",
        price: Number(newItem.price),
        currency: "RUB" as const,
        unit: "kg" as const,
        minOrder: newItem.minOrder ? Number(newItem.minOrder) : undefined,
        inStock: newItem.inStock,
      },
    ]);
    setNewItem(emptyItem);
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleStock = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, inStock: !i.inStock } : i))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Прайс-лист</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Управляйте ценами — покупатели увидят их в реальном времени
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {saved ? "✓ Сохранено" : "Сохранить"}
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-sm text-foreground/80">
          Прайс-лист отображается на вашей странице компании и в общем каталоге цен.
          Обновляйте его регулярно — покупатели ищут актуальные предложения.
        </p>
      </div>

      {/* Price table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-4">
        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground/70">Наименование</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground/70 hidden sm:table-cell">Обработка</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground/70">₽/кг</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground/70">Наличие</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className={`${!item.inStock ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {item.processingType}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-foreground">
                      {item.price.toLocaleString("ru-RU")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStock(item.id)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${item.inStock ? "bg-primary" : "bg-border"}`}
                        aria-label={item.inStock ? "В наличии" : "Нет в наличии"}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.inStock ? "translate-x-4" : ""}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Удалить позицию"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3" aria-hidden="true">📋</div>
            <p className="font-medium text-foreground">Прайс-лист пуст</p>
            <p className="text-sm mt-1">Добавьте первую позицию</p>
          </div>
        )}
      </div>

      {/* Add form */}
      {showAddForm ? (
        <div className="bg-white rounded-xl border border-primary/30 p-6 mb-4">
          <h3 className="font-semibold text-foreground mb-4">Новая позиция</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Наименование <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
                placeholder="Горбуша б/г мороженая, 1с"
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Вид рыбы</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-sm"
              >
                <option value="">Выберите...</option>
                {FISH_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.label}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Тип обработки</label>
              <select
                value={newItem.processingType}
                onChange={(e) => setNewItem((p) => ({ ...p, processingType: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-sm"
              >
                <option value="">Выберите...</option>
                {PROCESSING_TYPES.map((pt) => (
                  <option key={pt.slug} value={pt.label}>{pt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Цена, ₽/кг <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))}
                placeholder="145"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Минимальная партия, кг
              </label>
              <input
                type="number"
                value={newItem.minOrder}
                onChange={(e) => setNewItem((p) => ({ ...p, minOrder: e.target.value }))}
                placeholder="500"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
          </div>
          <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={newItem.inStock}
              onChange={(e) => setNewItem((p) => ({ ...p, inStock: e.target.checked }))}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm font-medium text-foreground">Есть в наличии</span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setNewItem(emptyItem); }}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newItem.name || !newItem.price}
              className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              Добавить позицию
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary text-sm font-medium transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить позицию
        </button>
      )}
    </div>
  );
}
