import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Fishopt",
  description: "Политика конфиденциальности и обработки персональных данных сервиса Fishopt.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://fishopt.pro/privacy" },
};

const UPDATED = "20 мая 2026 г.";

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-1 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Политика конфиденциальности</span>
          </nav>

          <div className="bg-white rounded-xl border border-border p-6 md:p-10 prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <h1 className="text-2xl font-bold text-foreground mb-1">Политика конфиденциальности</h1>
            <p className="text-xs text-muted-foreground mb-8">Редакция от {UPDATED}</p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">1. Оператор персональных данных</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки
              персональных данных пользователей интернет-сервиса <strong>Fishopt</strong> (fishopt.pro).
            </p>
            <p className="mt-3">
              Оператором персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
              «О персональных данных» является:
            </p>
            <div className="mt-3 bg-muted/50 rounded-lg p-4 text-sm font-medium text-foreground">
              <p>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ДАЛЬРЫБПОСТАВКА»</p>
              <p className="text-muted-foreground font-normal mt-1">
                ИНН: 7725618527 &nbsp;·&nbsp; КПП: 772501001
              </p>
              <p className="text-muted-foreground font-normal">
                E-mail: <a href="mailto:info@fishopt.pro" className="text-primary hover:underline">info@fishopt.pro</a>
              </p>
            </div>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">2. Какие данные мы собираем</h2>
            <p>При использовании сервиса могут обрабатываться следующие персональные данные:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Адрес электронной почты (e-mail)</li>
              <li>Номер телефона</li>
              <li>Наименование и реквизиты организации (ИНН, наименование, регион)</li>
              <li>Контактная информация (имя, должность)</li>
              <li>Технические данные: IP-адрес, тип браузера, данные об устройстве, файлы cookie</li>
            </ul>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">3. Цели обработки данных</h2>
            <p>Персональные данные обрабатываются в целях:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Регистрации и идентификации пользователя на сервисе</li>
              <li>Обеспечения работы личного кабинета и размещения карточки компании</li>
              <li>Обратной связи: ответа на запросы, обработки обращений</li>
              <li>Улучшения работы сервиса и анализа посещаемости</li>
              <li>Направления уведомлений, связанных с работой сервиса (не реклама без согласия)</li>
            </ul>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">4. Основания обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании согласия пользователя,
              выраженного при регистрации путём акцепта настоящей Политики, а также в иных случаях,
              предусмотренных законодательством Российской Федерации.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">5. Передача данных третьим лицам</h2>
            <p>
              Персональные данные не продаются и не передаются третьим лицам без согласия пользователя,
              за исключением случаев, установленных федеральным законодательством.
              Данные могут передаваться техническим провайдерам (хостинг, аналитика) исключительно
              в объёме, необходимом для обеспечения работы сервиса, на основании договоров с условием
              обеспечения конфиденциальности.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">6. Сроки хранения</h2>
            <p>
              Персональные данные хранятся в течение срока действия учётной записи пользователя и
              в течение 3 лет после её удаления, если иное не предусмотрено законодательством.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">7. Файлы cookie</h2>
            <p>
              Сервис использует файлы cookie для обеспечения функционирования сайта
              (сессионные cookie) и анализа посещаемости. Пользователь может отключить cookie в
              настройках браузера, однако это может повлиять на работоспособность сервиса.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">8. Права пользователя</h2>
            <p>В соответствии с Федеральным законом № 152-ФЗ пользователь вправе:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Получить информацию об обработке своих персональных данных</li>
              <li>Потребовать уточнения, блокировки или уничтожения данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обратиться с жалобой в Роскомнадзор</li>
            </ul>
            <p className="mt-3">
              Для реализации своих прав направьте запрос на:{" "}
              <a href="mailto:info@fishopt.pro" className="text-primary hover:underline">
                info@fishopt.pro
              </a>
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">9. Защита данных</h2>
            <p>
              Оператор принимает необходимые организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
              Передача данных осуществляется по зашифрованному каналу (HTTPS).
            </p>

            <h2 className="text-base font-semibold text-foreground mt-8 mb-3">10. Изменение Политики</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу
              с момента её публикации на странице fishopt.pro/privacy. Продолжение использования
              сервиса после публикации изменений означает согласие пользователя с новой редакцией.
            </p>

            <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
              По вопросам, связанным с обработкой персональных данных, обращайтесь:{" "}
              <a href="mailto:info@fishopt.pro" className="text-primary hover:underline">
                info@fishopt.pro
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
