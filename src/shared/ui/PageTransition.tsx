"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const el = ref.current;
    if (!el) return;

    // instant hide, then fade in — no translateY to avoid content jump
    el.style.transition = "none";
    el.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.28s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
      });
    });
  }, [pathname]);

  return (
    <div ref={ref} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
