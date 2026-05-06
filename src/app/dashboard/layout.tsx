import { AuthProvider } from "./_components/auth-provider";
import { DashboardSidebar } from "./_components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-muted/30 flex">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 md:overflow-auto">
          <div className="md:hidden h-14" aria-hidden="true" />
          {children}
          <div className="md:hidden h-16" aria-hidden="true" />
        </main>
      </div>
    </AuthProvider>
  );
}
