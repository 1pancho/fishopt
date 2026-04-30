import Link from "next/link";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Проверенные компании",
    desc: "Верифицируем поставщиков по ИНН и проверяем реальность деятельности перед публикацией.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    title: "Актуальные прайс-листы",
    desc: "Цены обновляются в реальном времени. Фильтрация по виду рыбы, региону и типу обработки.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    title: "Доска объявлений",
    desc: "Разместите объявление о покупке или продаже рыбы. Прямой контакт без посредников.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Аналитика рынка",
    desc: "Еженедельные обзоры цен, прогнозы и новости рыбной отрасли от отраслевых экспертов.",
  },
];

function ShineCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="shine-card">
      <span className="s-icon">{icon}</span>
      <p className="s-title">{title}</p>
      <p className="s-desc">{desc}</p>
      <div className="s-shine" />
      <div className="s-bg">
        <div className="s-tiles">
          <div className="s-tile s-tile-1" />
          <div className="s-tile s-tile-2 d6" />
          <div className="s-tile s-tile-3 d4" />
          <div className="s-tile s-tile-4 d2" />
          <div className="s-tile s-tile-5 d4" />
          <div className="s-tile s-tile-6 d2" />
          <div className="s-tile s-tile-7" />
          <div className="s-tile s-tile-8 d4" />
          <div className="s-tile s-tile-9 d6" />
          <div className="s-tile s-tile-10 d2" />
        </div>
        <div className="s-line s-line-1" />
        <div className="s-line s-line-2" />
        <div className="s-line s-line-3" />
      </div>
    </div>
  );
}

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
          {features.map((f) => (
            <ShineCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
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
