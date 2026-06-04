import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <p className="text-8xl font-black text-primary/20 leading-none select-none">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Страница не найдена</h1>
          <p className="mt-3 text-gray-500">
            Такой страницы не существует или она была удалена.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              На главную
            </Link>
            <Link
              href="/companies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Каталог компаний
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
