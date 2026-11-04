import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/pushup-buddy/support", label: "Support" },
  { href: "/pushup-buddy/privacy", label: "Privacy" },
  { href: "/pushup-buddy/terms", label: "Terms" },
];

export default function PushupHeader() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/pushup-buddy/support" className="flex items-center gap-2.5" aria-label="Pushup Buddy support">
          <span aria-hidden className="grid size-8 place-items-center rounded-[22%] bg-pb-accent-fill text-white">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 15l6-6 6 6" />
            </svg>
          </span>
          <span className="pb-heading text-[18px] text-pb-ink">Pushup Buddy</span>
        </Link>
        <div className="flex items-center gap-4 text-[14px] text-pb-muted sm:gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-pb-accent">
              {l.label}
            </Link>
          ))}
          <ThemeToggle look="border border-pb-line text-pb-muted transition-colors hover:border-pb-accent hover:text-pb-accent" />
        </div>
      </nav>
    </header>
  );
}
