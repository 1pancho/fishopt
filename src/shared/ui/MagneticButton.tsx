"use client";

import { useRef, ReactNode } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {children}
    </div>
  );
}
