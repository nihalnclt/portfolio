import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/trippay#how", label: "How it works", wide: true },
  { href: "/trippay#features", label: "Features", wide: true },
  { href: "/trippay#pricing", label: "Pricing", wide: true },
  { href: "/trippay#faq", label: "FAQ", wide: true },
  { href: "/trippay/support", label: "Support", wide: false },
];

export default function TrippayHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-tp-line bg-[color-mix(in_srgb,var(--tp-page)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/trippay" className="flex items-center gap-2" aria-label="Trippay home">
          <Image
            src="/images/projects/trippay.png"
            alt=""
            width={64}
            height={64}
            className="size-8 rounded-[22%]"
            priority
          />
          <span className="tp-display text-[22px] text-tp-ink">trippay</span>
        </Link>
        <div className="flex items-center gap-1 text-[15px] font-medium text-tp-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 transition-colors hover:bg-tp-accent-tint hover:text-tp-accent ${l.wide ? "hidden sm:inline-block" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle
            className="ml-2"
            look="bg-tp-accent-tint text-tp-accent transition-opacity hover:opacity-80"
          />
        </div>
      </nav>
    </header>
  );
}
