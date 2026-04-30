"use client";

import { useEffect, useRef } from "react";

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.parentElement;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(56,189,248,0.10) 0%, transparent 65%)`;
      el.style.opacity = "1";
    };

    const onLeave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none z-[6] opacity-0"
      style={{ transition: "opacity 0.4s ease" }}
      aria-hidden="true"
    />
  );
}
