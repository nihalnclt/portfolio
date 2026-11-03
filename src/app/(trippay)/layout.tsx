import { Archivo } from "next/font/google";
import TrippayFooter from "@/components/trippay/TrippayFooter";
import TrippayHeader from "@/components/trippay/TrippayHeader";

// Wide, heavy display face for Trippay headings (variable width axis).
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-tp-display",
  display: "swap",
});

// Trippay has its own look instead of the portfolio shell.
export default function TrippayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`trippay ${display.variable} flex min-h-screen flex-col antialiased`}>
      <TrippayHeader />
      <main className="flex-1">{children}</main>
      <TrippayFooter />
    </div>
  );
}
