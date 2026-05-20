import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export const metadata: Metadata = {
  title: "Условия использования — Fishopt",
  description: "Условия использования B2B-сервиса Fishopt для оптовой торговли рыбой и морепродуктами.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://fishopt.pro/terms" },
};

const UPDATED = "20 мая 2026 г.";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Условия использования</span>
          </nav>

          <div className="bg-white rounded-xl border border-border p-6 md:p-10 prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <h1 className="text-2xl font-bold text-foreground mb-1">Условия использования</h1>
            <p className="text-xs text-muted-foreground mb-8">Редакция от {UPDATED}</p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">1. Общие положения</h2>
            <p>
              Настоящие Условия использования (далее — Условия) регулируют отношения между
              пользователем и оператором сервиса <strong>Fishopt</strong> (fishopt.pro) —
              ООО «ДАЛЬРЫБПОСТАВКА» (ИНН 7725618527) — в связи с использованием сервиса.
            </p>
            <p className="mt-3">
              Регистрируясь на сервисе или используя его, пользователь принимает настоящие Условия
              в полном объёме. Если вы не согласны с Условиями, воздержитесь от использования сервиса.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">2. Описание сервиса</h2>
            <p>
              Fishopt — информационный B2B-сервис для участников рынка оптовой торговли рыбой и
              морепродуктами. Сервис обеспечивает размещение и поиск информации о компаниях,
              прайс-листах и торговых объявлениях. Сервис не является торговой площадкой и не
              выступает стороной сделок между пользователями.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">3. Регистрация и учётная запись</h2>
            <p>
              Для размещения информации о компании необходима регистрация. Пользователь обязан
              предоставить достоверные сведения о себе и своей организации. Пользователь несёт
              ответственность за сохранность данных доступа к учётной записи.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">4. Правила размещения информации</h2>
            <p>Пользователь обязуется не размещать на сервисе:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Недостоверную или вводящую в заблуждение информацию</li>
              <li>Информацию, нарушающую права третьих лиц</li>
              <li>Материалы, запрещённые законодательством Российской Федерации</li>
              <li>Спам, рекламу сторонних сервисов без согласования</li>
            </ul>
            <p className="mt-3">
              Оператор вправе без предупреждения удалить материалы, нарушающие настоящие Условия,
              а также заблокировать учётную запись нарушителя.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">5. Интеллектуальная собственность</h2>
            <p>
              Все права на программное обеспечение, дизайн и контент сервиса принадлежат оператору.
              Пользователь сохраняет права на информацию, которую он самостоятельно размещает на сервисе,
              предоставляя оператору неисключительную лицензию на её хранение и отображение.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">6. Ограничение ответственности</h2>
            <p>
              Сервис предоставляется «как есть». Оператор не гарантирует непрерывную и безошибочную
              работу сервиса. Оператор не несёт ответственности за убытки, возникшие в результате
              использования или невозможности использования сервиса, а также за достоверность
              информации, размещённой пользователями.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">7. Стоимость и тарифы</h2>
            <p>
              На текущий момент базовые функции сервиса предоставляются бесплатно. Оператор вправе
              ввести платные тарифы, уведомив пользователей не менее чем за 30 дней.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">8. Применимое право</h2>
            <p>
              Настоящие Условия регулируются законодательством Российской Федерации. Споры
              разрешаются в судебном порядке по месту нахождения оператора.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">9. Изменение Условий</h2>
            <p>
              Оператор вправе изменять настоящие Условия. Актуальная версия всегда доступна на
              странице fishopt.pro/terms. Продолжение использования сервиса после вступления
              изменений в силу означает согласие с новой редакцией.
            </p>

            <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
              По вопросам, связанным с условиями использования, обращайтесь:{" "}
              <a href="mailto:info@fishopt.pro" className="text-primary hover:underline">
                info@fishopt.pro
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
