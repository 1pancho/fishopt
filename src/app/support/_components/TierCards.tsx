"use client";

import { useState, useRef, useCallback } from "react";

type Tier = {
  amountLabel: string;
  amountSub: string;
  label: string;
  badge: string;
  highlight: string | null;
  perks: string[];
  cta: string;
  featured: boolean;
};

const CONFIG = {
  "Спонсор": {
    wrapperClass: "bg-slate-200/60",
    innerBorder: "",
    cta: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
    check: "text-emerald-500",
    glow: "rgba(100,116,139,0.18)",
    highlightClass: "",
  },
  "Основатель": {
    wrapperClass: "sp-gradient-border",
    innerBorder: "",
    cta: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white",
    check: "text-amber-500",
    glow: "rgba(245,158,11,0.5)",
    highlightClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "Партнёр": {
    wrapperClass: "sp-gradient-border-blue",
    innerBorder: "",
    cta: "bg-gradient-to-r from-[#0369a1] to-sky-500 hover:from-[#0369a1]/90 hover:to-sky-400 text-white",
    check: "text-sky-500",
    glow: "rgba(3,105,161,0.35)",
    highlightClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
} as const;

function TierCard({ tier, donateUrl }: { tier: Tier; donateUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cfg = CONFIG[tier.label as keyof typeof CONFIG] ?? CONFIG["Спонсор"];

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: -((e.clientY - r.top) / r.height - 0.5) * 16,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const scale = hovered ? 1.05 : tier.featured ? 1.02 : 1;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      className={`p-px rounded-2xl ${cfg.wrapperClass}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${scale})`,
        transition: hovered ? "transform 0.08s ease, box-shadow 0.2s ease" : "transform 0.5s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 30px 70px -12px ${cfg.glow}, 0 8px 24px -4px rgba(0,0,0,0.12)`
          : tier.featured ? `0 12px 40px -6px ${cfg.glow}` : "0 1px 4px rgba(0,0,0,0.05)",
        willChange: "transform",
      }}
    >
      {/* Inner card */}
      <div className="relative flex flex-col h-full bg-white rounded-[calc(1rem-1px)] p-6 overflow-hidden">
        {/* Shimmer on featured */}
        {tier.featured && (
          <div className="tier-shimmer pointer-events-none absolute inset-0 rounded-[calc(1rem-1px)]" aria-hidden="true" />
        )}

        {/* Shine from mouse */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(1rem-1px)]"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,${hovered ? 0.2 : 0}) 0%, transparent 60%)`,
            transition: "background 0.08s ease",
          }}
          aria-hidden="true"
        />

        {/* Popular badge */}
        {tier.featured && (
          <div className="absolute -top-px left-0 right-0 flex justify-center">
            <span className="tier-badge-float px-4 py-1 rounded-b-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-300/40 whitespace-nowrap">
              ⭐ Популярный выбор
            </span>
          </div>
        )}

        <div className={`${tier.featured ? "mt-5" : ""} text-4xl mb-3 transition-all duration-300`}
          style={{ filter: hovered ? "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" : "none" }}>
          {tier.badge}
        </div>

        <p className="text-xs font-bold text-muted-foreground/70 uppercase tracking-widest mb-2">
          {tier.label}
        </p>

        {tier.highlight && (
          <span className={`tier-badge-float self-start inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold mb-3 border ${cfg.highlightClass}`}>
            {tier.highlight}
          </span>
        )}

        <div className="mb-5">
          <div className="text-2xl font-extrabold text-foreground leading-tight">{tier.amountLabel}</div>
          <p className="text-xs text-muted-foreground mt-0.5">{tier.amountSub}</p>
        </div>

        <ul className="flex flex-col gap-2.5 mb-6 flex-1">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-sm text-foreground/75">
              <svg className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.check}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {perk}
            </li>
          ))}
        </ul>

        <a
          href={donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${cfg.cta}`}
        >
          {tier.cta}
        </a>
      </div>
    </div>
  );
}

export function TierCards({ tiers, donateUrl }: { tiers: Tier[]; donateUrl: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {tiers.map((tier) => (
        <TierCard key={tier.label} tier={tier} donateUrl={donateUrl} />
      ))}
    </div>
  );
}
