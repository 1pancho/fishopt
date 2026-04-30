"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value }: { value: string }) {
  const numMatch = value.match(/^([\d\s]+)/);
  if (!numMatch) return <>{value}</>;

  const num = parseInt(numMatch[1].replace(/\s/g, ""), 10);
  const suffix = value.slice(numMatch[1].length);

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = 0;
          const duration = 1800;
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * num));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
