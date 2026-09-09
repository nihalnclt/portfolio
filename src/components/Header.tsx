import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";
import ThemeToggle from "@/components/ThemeToggle";
import { siteConfig } from "@/data/site";

export default function Header() {
  return (
    <header className="container">
      {/* Single row on every size. Below md the nav links collapse into a
          hamburger menu (MobileNav); the theme toggle stays visible. */}
      <nav className="relative flex items-center justify-between gap-4 py-6 md:py-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} - home`}
          className="group flex items-center gap-2.5 whitespace-nowrap text-heading"
        >
          <span
            className="relative inline-flex size-2 shrink-0 rounded-full bg-emerald-500/80"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50"></span>
          </span>
          <span className="font-medium tracking-tight">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
