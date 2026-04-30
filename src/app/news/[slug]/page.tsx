import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { categoryLabels } from "@/shared/lib/news";
import { apiGetNews, apiGetArticle } from "@/shared/lib/api";
import { ShareButtons } from "@/widgets/news-card/ui/ShareButtons";
import { NewsSubscribeForm } from "@/widgets/news-card/ui/NewsSubscribeForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const articles = await apiGetNews();
    return articles.map((n) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await apiGetArticle(slug).catch(() => null);
  if (!article) return { title: "Не найдено" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://fishopt.pro/news/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await apiGetArticle(slug).catch(() => null);
  if (!article) notFound();

  const allArticles = await apiGetNews({ category: article.category }).catch(() => []);
  const related = allArticles.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Навигация">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
                <li><Link href="/" className="hover:text-foreground transition-colors">Главная</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/news" className="hover:text-foreground transition-colors">Новости</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-border p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href={`/news?category=${article.category}`}
                    className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    {categoryLabels[article.category]}
                  </Link>
                  <time
                    dateTime={article.publishedAt}
                    className="text-muted-foreground text-sm ml-auto"
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
                  {article.title}
                </h1>

                {/* Content */}
                <div className="prose prose-sm md:prose max-w-none text-foreground/90 leading-relaxed">
                  <p className="text-lg text-foreground/80 mb-4 leading-relaxed font-medium">
                    {article.excerpt}
                  </p>
                  {article.content && (
                    <div className="text-foreground/80 leading-relaxed space-y-4">
                      {article.content.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <ShareButtons title={article.title} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-4">
              {/* Related */}
              {related.length > 0 && (
                <div className="bg-white rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3">Похожие материалы</h3>
                  <div className="flex flex-col gap-3">
                    {related.map((n) => (
                      <Link
                        key={n.id}
                        href={`/news/${n.slug}`}
                        className="group"
                      >
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                          {n.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(n.publishedAt)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscribe */}
              <div className="bg-gradient-to-br from-[#0c4a6e] to-[#0369a1] rounded-xl p-5 text-white">
                <h3 className="font-bold mb-2">Новости на почту</h3>
                <p className="text-white/70 text-sm mb-4">Еженедельный дайджест рынка</p>
                <NewsSubscribeForm />
              </div>

              {/* CTA */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">Ваша компания на Fishopt</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Разместите прайс-лист и получайте заявки
                </p>
                <Link
                  href="/register"
                  className="block text-center py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Разместить бесплатно
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
