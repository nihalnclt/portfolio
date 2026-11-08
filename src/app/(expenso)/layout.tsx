import ExpensoFooter from "@/components/expenso/ExpensoFooter";
import ExpensoHeader from "@/components/expenso/ExpensoHeader";

// Expenso has its own look instead of the portfolio shell.
export default function ExpensoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="expenso flex min-h-screen flex-col antialiased">
      <ExpensoHeader />
      <main className="flex-1">{children}</main>
      <ExpensoFooter />
    </div>
  );
}
