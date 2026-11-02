import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";
import ThemeToggle from "@/components/ThemeToggle";
import Wordmark from "@/components/Wordmark";
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
          className="flex items-center whitespace-nowrap text-heading"
        >
          <Wordmark text={siteConfig.name.toLowerCase().replace(/\s+/g, "-")} />
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
