import type { Metadata } from "next";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Hero, WhyFishopt } from "@/widgets/hero";
import { CategoriesGrid } from "@/widgets/catalog-filters";
import { RecentCompanies } from "@/widgets/company-card";
import { NewsPreview } from "@/widgets/news-card";

export const metadata: Metadata = {
  title: "Fishopt — Оптовая торговля рыбой и морепродуктами в России",
  description:
    "Найдите поставщиков рыбы и морепродуктов по всей России. Актуальные прайс-листы, каталог компаний, доска объявлений и новости рыбной отрасли.",
  alternates: {
    canonical: "https://fishopt.pro",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CategoriesGrid />
        <RecentCompanies />
        <NewsPreview />
        <WhyFishopt />
      </main>
      <Footer />
    </>
  );
}
