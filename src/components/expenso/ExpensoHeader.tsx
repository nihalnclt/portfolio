import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/expenso/support", label: "Support" },
  { href: "/expenso/privacy", label: "Privacy" },
];

// No landing page or app icon yet, so the wordmark is text in the app's violet.
export default function ExpensoHeader() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex h-20 max-w-3xl items-center justify-between gap-4 px-4">
        <span className="ex-heading flex items-center gap-2 text-[20px] text-ex-ink">
          <span aria-hidden="true" className="size-6 rounded-[30%] bg-gradient-to-br from-[#c9b8ff] via-[#9d86ff] to-[#7c5cfc]" />
          expenso
        </span>
        <div className="flex items-center gap-4 text-[14px] text-ex-muted sm:gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ex-ink">
              {l.label}
            </Link>
          ))}
          <ThemeToggle look="border border-ex-line text-ex-muted transition-colors hover:text-ex-ink" />
        </div>
      </nav>
    </header>
  );
}
