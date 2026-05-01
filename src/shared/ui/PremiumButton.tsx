"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "kd-btn-sm",
  md: "",
  lg: "kd-btn-lg",
};

export function PremiumButton({ label, href, onClick, className = "", size = "md" }: Props) {
  const style = { "--kd-content": `'${label}'` } as CSSProperties;
  const cls = `kd-btn ${sizes[size]} ${className}`.trim();

  const inner = (
    <>
      <span className="kd-left" />
      {label}
      <span className="kd-right" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}
