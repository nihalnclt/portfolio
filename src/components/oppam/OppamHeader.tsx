import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/oppam/support", label: "Support" },
  { href: "/oppam/privacy", label: "Privacy" },
  { href: "/oppam/terms", label: "Terms" },
];

// No landing page or app icon yet, so the wordmark is text beside the app's coral-to-magenta gradient.
export default function OppamHeader() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex h-20 max-w-3xl items-center justify-between gap-4 px-4">
        <span className="op-heading flex items-center gap-2 text-[20px] text-op-ink">
          <span aria-hidden="true" className="size-6 rounded-[30%] bg-gradient-to-br from-[#ff7568] via-[#f4516c] to-[#c84267]" />
          oppam
        </span>
        <div className="flex items-center gap-4 text-[14px] text-op-muted sm:gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-op-ink">
              {l.label}
            </Link>
          ))}
          <ThemeToggle look="border border-op-line text-op-muted transition-colors hover:text-op-ink" />
        </div>
      </nav>
    </header>
  );
}
