import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { apiGetNews } from "@/shared/lib/api";
import { NEWS_CATEGORIES, categoryLabels } from "@/shared/lib/news";

export const metadata: Metadata = {
  title: "Новости рыбной отрасли России",
  description:
    "Актуальные новости рынка рыбы и морепродуктов: цены, промысел, аквакультура, регуляторика. Ежедневные обзоры для профессионалов отрасли.",
  alternates: { canonical: "https://fishopt.pro/news" },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const news = await apiGetNews({ category }).catch(() => []);
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <nav aria-label="Навигация" className="mb-3">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground transition-colors">Главная</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">Новости</li>
              </ol>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Новости рыбной отрасли
            </h1>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {NEWS_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "all" ? "/news" : `/news?category=${cat.slug}`}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    (cat.slug === "all" && !category) || cat.slug === category
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-border"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4" aria-hidden="true">📰</div>
              <h3 className="font-semibold text-foreground mb-2">Новостей не найдено</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main column */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Featured */}
                {featured && (
                  <Link
                    href={`/news/${featured.slug}`}
                    className="group block bg-white rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {categoryLabels[featured.category]}
                      </span>
                      <span className="text-muted-foreground text-xs ml-auto">
                        {formatDate(featured.publishedAt)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-4 text-sm font-medium text-primary">
                      Читать далее →
                    </div>
                  </Link>
                )}

                {/* Rest */}
                {rest.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group flex gap-4 bg-white rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground text-xs font-medium">
                          {categoryLabels[article.category]}
                        </span>
                        <span className="text-muted-foreground text-xs ml-auto">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-4">
                {/* Subscribe block */}
                <div className="bg-gradient-to-br from-[#0c4a6e] to-[#0369a1] rounded-xl p-5 text-white">
                  <h3 className="font-bold text-lg mb-2">Новости на почту</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Еженедельный дайджест рынка рыбы и морепродуктов
                  </p>
                  <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder="ваш@email.ru"
                      className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                    />
                    <button
                      type="submit"
                      className="py-2.5 rounded-lg bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors"
                    >
                      Подписаться
                    </button>
                  </form>
                </div>

                {/* Categories list */}
                <div className="bg-white rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3">Рубрики</h3>
                  <div className="flex flex-col gap-1">
                    {NEWS_CATEGORIES.filter((c) => c.slug !== "all").map((cat) => {
                      return (
                        <Link
                          key={cat.slug}
                          href={`/news?category=${cat.slug}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            cat.slug === category
                              ? "bg-primary text-white font-medium"
                              : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <span>{cat.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3">Быстрые ссылки</h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/prices" className="text-primary hover:text-primary/80 transition-colors">
                      → Прайс-листы поставщиков
                    </Link>
                    <Link href="/companies" className="text-primary hover:text-primary/80 transition-colors">
                      → Каталог компаний
                    </Link>
                    <Link href="/ads" className="text-primary hover:text-primary/80 transition-colors">
                      → Доска объявлений
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
