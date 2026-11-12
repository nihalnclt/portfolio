import OppamFooter from "@/components/oppam/OppamFooter";
import OppamHeader from "@/components/oppam/OppamHeader";

// Oppam has its own look instead of the portfolio shell.
export default function OppamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="oppam flex min-h-screen flex-col antialiased">
      <OppamHeader />
      <main className="flex-1">{children}</main>
      <OppamFooter />
    </div>
  );
}
