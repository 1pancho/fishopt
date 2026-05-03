"use client";

import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function CTAButton({ label, href, onClick, className = "" }: Props) {
  const cls = `cta-glow-btn ${className}`.trim();
  if (href) return <Link href={href} className={cls}>{label}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{label}</button>;
}
