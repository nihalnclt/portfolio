import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { siteConfig } from "@/data/site";

export default function Header() {
  return (
    <header className="container">
      <nav className="flex items-center justify-between gap-4 py-8 pr-10 md:pr-0">
        <Link
          href="/"
          aria-label={`${siteConfig.name} - home`}
          className="group flex items-center gap-2.5 text-heading"
        >
          <span
            className="relative inline-flex size-2 shrink-0 rounded-full bg-emerald-500/80"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50"></span>
          </span>
          <span className="font-medium tracking-tight">{siteConfig.name}</span>
        </Link>

        <NavLinks />
      </nav>
    </header>
  );
}
