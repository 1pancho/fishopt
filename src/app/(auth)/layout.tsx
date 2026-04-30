import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c4a6e] via-[#075985] to-[#0369a1] flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2 group" aria-label="На главную">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-primary font-bold text-sm">
            F
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Fishopt</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} Fishopt ·
          <Link href="/privacy" className="hover:text-white/60 ml-1 transition-colors">Политика конфиденциальности</Link>
        </p>
      </div>
    </div>
  );
}
