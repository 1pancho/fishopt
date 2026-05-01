import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c4a6e] via-[#075985] to-[#0369a1] flex flex-col relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="auth-orb-1 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="auth-orb-2 absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-400/8 blur-3xl" />
        <div className="auth-orb-3 absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-300/5 blur-2xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-0 group" aria-label="На главную">
          <Image
            src="/logo.png"
            alt="Fishopt"
            width={100}
            height={36}
            className="h-8 w-auto rounded-lg"
            priority
          />
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="auth-card-in w-full flex justify-center">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 py-4 text-center">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Fishopt ·{" "}
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Политика конфиденциальности</Link>
        </p>
      </div>
    </div>
  );
}
