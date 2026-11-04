import { Noto_Sans_Malayalam, Plus_Jakarta_Sans } from "next/font/google";
import MajlisFooter from "@/components/majlisunnoor/MajlisFooter";
import MajlisHeader from "@/components/majlisunnoor/MajlisHeader";

// One family for headings and body on the Majlisunnoor pages.
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-mj-sans",
  display: "swap",
});

// Malayalam text on the landing page.
const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-mj-ml",
  display: "swap",
});

// Majlisunnoor has its own look instead of the portfolio shell.
export default function MajlisunnoorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`majlis ${sans.variable} ${malayalam.variable} flex min-h-screen flex-col antialiased`}>
      <MajlisHeader />
      <main className="flex-1">{children}</main>
      <MajlisFooter />
    </div>
  );
}
