import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/pushup-buddy/support", label: "Support" },
  { href: "/pushup-buddy/privacy", label: "Privacy" },
  { href: "/pushup-buddy/terms", label: "Terms" },
];

export default function PushupHeader() {
  return (
    <header id="top" className="relative z-10">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/pushup-buddy" className="flex items-center gap-2.5" aria-label="Pushup Buddy home">
          <Image
            src="/images/projects/pushup-buddy.png"
            alt=""
            width={64}
            height={64}
            className="size-8 rounded-[22%]"
            priority
          />
          <span className="pb-heading text-[20px]">
            <span className="text-pb-faint">Pushup</span>
            <span className="text-pb-ink">Buddy</span>
          </span>
        </Link>
        <div className="flex items-center gap-3 text-[14px] text-pb-muted sm:gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden transition-colors hover:text-pb-ink sm:inline">
              {l.label}
            </Link>
          ))}
          <ThemeToggle look="border border-pb-line text-pb-muted transition-colors hover:text-pb-ink" />
        </div>
      </nav>
    </header>
  );
}
