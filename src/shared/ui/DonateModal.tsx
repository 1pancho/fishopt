"use client";

import { useState } from "react";

interface Props {
  defaultAmount?: number;
  label?: string;
  className?: string;
}

export function DonateModal({ defaultAmount = 500, label = "Поддержать проект", className }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const presets = [500, 1000, 3000, 5000];
  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!finalAmount || finalAmount < 10) {
      setError("Минимальная сумма — 10 ₽");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.fishopt.pro"}/payments/donate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalAmount, donorName, donorEmail }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Ошибка");
      window.location.href = data.paymentUrl;
    } catch (err: any) {
      setError(err.message ?? "Что-то пошло не так");
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Поддержать Fishopt</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Amount presets */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Сумма</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setAmount(p); setCustomAmount(""); }}
                      className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        amount === p && !customAmount
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {p.toLocaleString("ru")} ₽
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="10"
                  placeholder="Своя сумма, ₽"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                  className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Donor info (optional) */}
              <input
                type="text"
                placeholder="Ваше имя (необязательно)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="email"
                placeholder="Email (необязательно)"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? "Переход к оплате..." : `Оплатить ${finalAmount ? finalAmount.toLocaleString("ru") + " ₽" : ""}`}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Оплата через ЮКасса · Защищено SSL
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
