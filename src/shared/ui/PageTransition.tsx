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

    // instant hide, then animate in
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, [pathname]);

  return (
    <div ref={ref} style={{ opacity: 1, transform: "translateY(0)" }}>
      {children}
    </div>
  );
}
