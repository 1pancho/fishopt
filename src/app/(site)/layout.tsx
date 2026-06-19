import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
