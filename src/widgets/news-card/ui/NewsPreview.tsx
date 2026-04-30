import Link from "next/link";
import { apiGetNews } from "@/shared/lib/api";

const categoryLabels: Record<string, string> = {
  market: "Рынок",
  companies: "Компании",
  fishing: "Промысел",
  aquaculture: "Аквакультура",
  regulation: "Регуляторика",
  analytics: "Аналитика",
  events: "События",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function NewsPreview() {
  const news = await apiGetNews().catch(() => []);
  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="news-heading" className="text-2xl md:text-3xl font-bold text-foreground">
              Новости отрасли
            </h2>
            <p className="text-muted-foreground mt-1">
              Актуальные события рыбного рынка России
            </p>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Все новости →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.slice(0, 3).map((article, i) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className={`group block p-5 rounded-xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all ${
                i === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {categoryLabels[article.category]}
                </span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/news"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Все новости →
          </Link>
        </div>
      </div>
    </section>
  );
}
