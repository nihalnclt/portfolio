import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function MajlisHeader() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/majlisunnoor" className="flex items-center gap-2.5" aria-label="Majlisunnoor home">
          <Image
            src="/images/projects/majlisunnoor.png"
            alt=""
            width={64}
            height={64}
            className="size-8 rounded-[22%]"
            priority
          />
          <span className="mj-heading text-[18px] text-mj-ink">Majlisunnoor</span>
        </Link>
        <div className="flex items-center gap-5 text-[14px] text-mj-muted">
          <Link href="/majlisunnoor/support" className="transition-colors hover:text-mj-green">
            Support
          </Link>
          <Link href="/majlisunnoor/privacy" className="transition-colors hover:text-mj-green">
            Privacy
          </Link>
          <ThemeToggle look="border border-mj-line text-mj-muted transition-colors hover:border-mj-gold hover:text-mj-green" />
        </div>
      </nav>
    </header>
  );
}
