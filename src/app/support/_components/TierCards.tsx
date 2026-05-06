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

const STYLES: Record<string, { border: string; glow: string; cta: string; check: string }> = {
  "Спонсор": {
    border: "border-slate-200",
    glow: "rgba(100,116,139,0.2)",
    cta: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200",
    check: "text-emerald-500",
  },
  "Основатель": {
    border: "border-amber-300",
    glow: "rgba(245,158,11,0.4)",
    cta: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-200",
    check: "text-amber-500",
  },
  "Партнёр": {
    border: "border-sky-200",
    glow: "rgba(3,105,161,0.3)",
    cta: "bg-gradient-to-r from-[#0369a1] to-sky-500 hover:from-[#0369a1]/90 hover:to-sky-400 text-white shadow-lg shadow-sky-200",
    check: "text-sky-600",
  },
};

function TierCard({ tier, donateUrl }: { tier: Tier; donateUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const s = STYLES[tier.label] ?? STYLES["Спонсор"];

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: -((e.clientY - r.top) / r.height - 0.5) * 14,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const baseScale = tier.featured ? 1.02 : 1;
  const scale = hovered ? 1.045 : baseScale;

  const boxShadow = hovered
    ? `0 28px 65px -10px ${s.glow}, 0 8px 20px -4px rgba(0,0,0,0.1)`
    : tier.featured
      ? `0 10px 36px -6px ${s.glow}`
      : "0 1px 4px rgba(0,0,0,0.06)";

  const shineX = 50 + tilt.x * 2.5;
  const shineY = 50 - tilt.y * 2.5;
  const shineOpacity = hovered ? 0.16 : 0;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      className={`relative flex flex-col rounded-2xl border p-6 bg-white overflow-hidden ${s.border}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${scale})`,
        transition: hovered
          ? "transform 0.08s ease, box-shadow 0.25s ease"
          : "transform 0.5s ease, box-shadow 0.4s ease",
        boxShadow,
        willChange: "transform",
      }}
    >
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,${shineOpacity}) 0%, transparent 65%)`,
          transition: "background 0.08s ease",
        }}
        aria-hidden="true"
      />

      {/* Shimmer stripe (featured only) */}
      {tier.featured && (
        <div
          className="tier-shimmer pointer-events-none absolute inset-0 rounded-2xl"
          aria-hidden="true"
        />
      )}

      {/* Top badge */}
      {tier.featured && (
        <div className="tier-badge-float absolute -top-px left-0 right-0 flex justify-center">
          <span className="px-4 py-1 rounded-b-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-md shadow-amber-200 whitespace-nowrap">
            Популярный выбор
          </span>
        </div>
      )}

      <div className={`${tier.featured ? "mt-5" : ""} text-4xl mb-3`}>{tier.badge}</div>

      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
        {tier.label}
      </p>

      {tier.highlight && (
        <span
          className={`tier-badge-float self-start inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold mb-3 border ${
            tier.label === "Партнёр"
              ? "bg-sky-50 text-sky-700 border-sky-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          {tier.highlight}
        </span>
      )}

      <div className="mb-5">
        <div className="text-2xl font-extrabold text-foreground">{tier.amountLabel}</div>
        <p className="text-xs text-muted-foreground mt-0.5">{tier.amountSub}</p>
      </div>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-foreground/80">
            <svg
              className={`w-4 h-4 shrink-0 mt-0.5 ${s.check}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
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
        className={`relative z-10 w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${s.cta}`}
      >
        {tier.cta}
      </a>
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
