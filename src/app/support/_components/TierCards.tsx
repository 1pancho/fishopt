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

const CARD_STYLES: Record<string, { border: string; glow: string; ctaClass: string; checkColor: string }> = {
  Спонсор: {
    border: "border-slate-200",
    glow: "rgba(100,116,139,0.25)",
    ctaClass: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200",
    checkColor: "text-emerald-500",
  },
  Основатель: {
    border: "border-amber-400",
    glow: "rgba(245,158,11,0.45)",
    ctaClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-200",
    checkColor: "text-amber-500",
  },
  Партнёр: {
    border: "border-primary/40",
    glow: "rgba(3,105,161,0.35)",
    ctaClass: "bg-gradient-to-r from-primary to-sky-600 hover:from-primary/90 hover:to-sky-500 text-white shadow-lg shadow-primary/20",
    checkColor: "text-primary",
  },
};

function TierCard({ tier, donateUrl }: { tier: Tier; donateUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const style = CARD_STYLES[tier.label] ?? CARD_STYLES["Спонсор"];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = -((e.clientY - top) / height - 0.5) * 14;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const scale = hovered ? 1.04 : tier.featured ? 1.02 : 1;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className={`relative flex flex-col rounded-2xl border p-6 bg-white overflow-hidden select-none ${style.border}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${scale})`,
        transition: hovered ? "transform 0.08s ease, box-shadow 0.3s ease" : "transform 0.5s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 30px 70px -12px ${style.glow}, 0 8px 24px -4px rgba(0,0,0,0.12)`
          : tier.featured
            ? `0 12px 40px -6px ${style.glow}`
            : "0 1px 4px rgba(0,0,0,0.06)",
        willChange: "transform",
      }}
    >
      {/* Shine overlay — follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 3}% ${50 - tilt.y * 3}%, rgba(255,255,255,${hovered ? "0.18" : "0"}) 0%, transparent 70%)`,
          transition: "background 0.1s ease",
        }}
        aria-hidden="true"
      />

      {/* Animated shimmer stripe for featured */}
      {tier.featured && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "tier-shimmer 3s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Popular badge */}
      {tier.featured && (
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 px-5 py-1 rounded-b-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold whitespace-nowrap shadow-md shadow-amber-200"
          style={{ animation: "tier-badge-float 3s ease-in-out infinite" }}
        >
          ⭐ Популярный выбор
        </div>
      )}

      <div className="mt-4 mb-3 text-4xl" style={{ transition: "filter 0.3s", filter: hovered ? "drop-shadow(0 6px 10px rgba(0,0,0,0.2))" : "none" }}>
        {tier.badge}
      </div>

      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
        {tier.label}
      </p>

      {tier.highlight && (
        <div
          className={`self-start inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold mb-3 border ${
            tier.label === "Партнёр"
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-amber-100 text-amber-700 border-amber-200"
          }`}
          style={{ animation: "tier-badge-float 4s ease-in-out infinite" }}
        >
          {tier.highlight}
        </div>
      )}

      <div className="mb-5">
        <div className="text-2xl font-extrabold text-foreground leading-tight">{tier.amountLabel}</div>
        <p className="text-xs text-muted-foreground mt-0.5">{tier.amountSub}</p>
      </div>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-foreground/80">
            <svg className={`w-4 h-4 shrink-0 mt-0.5 ${style.checkColor}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
        className={`relative z-10 w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${style.ctaClass}`}
      >
        {tier.cta}
      </a>

      <style>{`
        @keyframes tier-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes tier-badge-float {
          0%, 100% { transform: translateY(0px) translateX(-50%); }
          50% { transform: translateY(-3px) translateX(-50%); }
        }
      `}</style>
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
