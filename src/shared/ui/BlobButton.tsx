"use client";

import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function BlobButton({ label, href, onClick, className = "" }: Props) {
  const inner = (
    <>
      {label}
      <span className="blob-btn__inner">
        <span className="blob-btn__blobs">
          <span className="blob-btn__blob" />
          <span className="blob-btn__blob" />
          <span className="blob-btn__blob" />
          <span className="blob-btn__blob" />
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`blob-btn ${className}`}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`blob-btn ${className}`}>
      {inner}
    </button>
  );
}
