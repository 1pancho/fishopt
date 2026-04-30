import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Проверенные компании",
    desc: "Мы верифицируем поставщиков по ИНН и проверяем реальность их деятельности.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    title: "Актуальные прайс-листы",
    desc: "Цены обновляются ежедневно. Фильтрация по виду рыбы, региону и типу обработки.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-6.375-3.75H6m3.75 3.75H6" />
      </svg>
    ),
    title: "Удобно на мобильном",
    desc: "Сайт разработан с приоритетом мобильных устройств. Работает на любом смартфоне.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Аналитика рынка",
    desc: "Еженедельные обзоры цен, прогнозы и новости рыбной отрасли от экспертов.",
  },
];

export function WhyFishopt() {
  return (
    <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="why-heading" className="text-2xl md:text-3xl font-bold text-foreground">
            Почему выбирают Fishopt
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Мы создали современный инструмент для профессионалов рыбной отрасли
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 p-6 rounded-xl bg-white border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#0c4a6e] to-[#0369a1] p-8 md:p-10 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Разместите свою компанию на Fishopt
            </h3>
            <p className="text-white/70 max-w-lg">
              Бесплатное размещение в каталоге. Получайте заявки от покупателей по всей России уже сегодня.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-colors text-base"
          >
            Разместить бесплатно
          </Link>
        </div>
      </div>
    </section>
  );
}
