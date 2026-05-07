import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/shared/ui/PageTransition";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fishopt.pro"),
  title: {
    default: "Fishopt — Оптовая торговля рыбой и морепродуктами",
    template: "%s | Fishopt",
  },
  description:
    "Fishopt — современный B2B портал оптовой торговли рыбой и морепродуктами по всей России. Найдите поставщиков, сравните прайс-листы, разместите объявление.",
  keywords: [
    "рыба оптом",
    "морепродукты оптом",
    "рыба купить оптом",
    "поставщики рыбы",
    "рыбная торговля",
    "оптовая рыба",
    "прайс рыба",
    "рыба Россия опт",
  ],
  authors: [{ name: "Fishopt" }],
  creator: "Fishopt",
  publisher: "Fishopt",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://fishopt.pro",
    siteName: "Fishopt",
    title: "Fishopt — Оптовая торговля рыбой и морепродуктами",
    description:
      "Современный B2B портал для оптовой торговли рыбой и морепродуктами по всей России.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fishopt — Оптовая торговля рыбой",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishopt — Оптовая торговля рыбой и морепродуктами",
    description:
      "Современный B2B портал для оптовой торговли рыбой и морепродуктами по всей России.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://fishopt.pro",
  },
  icons: {
    apple: [{ url: "/logo.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
