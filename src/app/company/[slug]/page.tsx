import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { apiGetCompanies, apiGetCompany } from "@/shared/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

const activityLabels: Record<string, string> = {
  wholesale: "Оптовая торговля",
  retail: "Розничная торговля",
  processing: "Переработка рыбы",
  aquaculture: "Аквакультура / рыбоводство",
  fishing: "Промышленное рыболовство",
  logistics: "Логистика / хранение",
  customs: "Таможенное оформление",
};

export async function generateStaticParams() {
  try {
    const result = await apiGetCompanies({ limit: 100 });
    return result.data.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await apiGetCompany(slug).catch(() => null);

  if (!company) return { title: "Компания не найдена" };

  return {
    title: `${company.name} — поставщик рыбы оптом`,
    description:
      company.description ??
      `${company.name} — оптовые поставки рыбы и морепродуктов. ${company.city}, ${company.region}.`,
    alternates: {
      canonical: `https://fishopt.pro/company/${slug}`,
    },
    openGraph: {
      title: `${company.name} на Fishopt`,
      description: company.description ?? undefined,
      type: "profile",
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await apiGetCompany(slug).catch(() => null);
  if (!company) notFound();

  const priceList = company.priceLists?.[0] ?? null;

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
                <li><Link href="/companies" className="hover:text-foreground transition-colors">Компании</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                  {company.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Company header card */}
              <div className="bg-white rounded-xl border border-border p-6 mb-4">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
                    {company.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      company.name.charAt(0)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                          {company.name}
                        </h1>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          {company.city ? `${company.city}, ` : ""}{company.region}
                        </p>
                      </div>
                      {company.isVerified && (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Проверена
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {company.activityTypes.map((type) => (
                        <span key={type} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                          {activityLabels[type]}
                        </span>
                      ))}
                      {company.categories.map((cat) => (
                        <span key={cat} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {company.description && (
                <div className="bg-white rounded-xl border border-border p-6 mb-4">
                  <h2 className="font-semibold text-foreground mb-3">О компании</h2>
                  <p className="text-foreground/80 leading-relaxed">{company.description}</p>
                </div>
              )}

              {/* Products */}
              <div className="bg-white rounded-xl border border-border p-6 mb-4">
                <h2 className="font-semibold text-foreground mb-4">Продукция</h2>
                <div className="flex flex-wrap gap-2">
                  {company.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/companies?q=${encodeURIComponent(cat)}`}
                      className="px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price list */}
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Прайс-лист</h2>
                  {priceList && (
                    <span className="text-xs text-muted-foreground">
                      Обновлено{" "}
                      {new Date(priceList.updatedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  )}
                </div>

                {priceList ? (
                  <>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <table className="w-full text-sm min-w-[480px]">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left pb-2 font-semibold text-foreground/70">Наименование</th>
                            <th className="text-left pb-2 font-semibold text-foreground/70">Обработка</th>
                            <th className="text-right pb-2 font-semibold text-foreground/70">Цена, ₽/кг</th>
                            <th className="text-right pb-2 font-semibold text-foreground/70">Мин. партия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {priceList.items.map((item) => (
                            <tr
                              key={item.id}
                              className={`${!item.inStock ? "opacity-50" : ""}`}
                            >
                              <td className="py-2.5 pr-3">
                                <div className="font-medium text-foreground leading-tight">
                                  {item.name}
                                </div>
                                {!item.inStock && (
                                  <span className="text-xs text-destructive">нет в наличии</span>
                                )}
                              </td>
                              <td className="py-2.5 pr-3 text-muted-foreground">{item.processingType}</td>
                              <td className="py-2.5 text-right font-bold text-foreground">
                                {item.price.toLocaleString("ru-RU")}
                              </td>
                              <td className="py-2.5 text-right text-muted-foreground">
                                {item.minOrder ? `${item.minOrder} кг` : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg bg-muted/50 border border-dashed border-border p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Компания ещё не добавила прайс-лист
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0">
              {/* Contact card */}
              <div className="bg-white rounded-xl border border-border p-5 sticky top-20">
                <h2 className="font-semibold text-foreground mb-4">Контакты</h2>

                {company.phone ? (
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors mb-3 text-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {company.phone}
                  </a>
                ) : (
                  <div className="py-2.5 px-4 rounded-lg bg-primary text-white font-medium mb-3 text-center cursor-default opacity-60">
                    Телефон скрыт
                  </div>
                )}

                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors text-center"
                >
                  Написать сообщение
                </button>

                {company.inn && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      ИНН: <span className="font-mono font-medium text-foreground">{company.inn}</span>
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  На Fishopt с {new Date(company.createdAt).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
