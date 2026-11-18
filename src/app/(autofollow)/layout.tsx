import Link from "next/link";
import { siteConfig } from "@/data/site";

const links = [
  { href: "/x-autofollow/terms", label: "Terms" },
  { href: "/x-autofollow/privacy", label: "Privacy" },
];

// Auto Follow has its own dark look, matching the extension, instead of the portfolio shell.
export default function AutofollowLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-[#e7e9ea] antialiased">
      <header>
        <nav className="mx-auto flex h-20 max-w-3xl items-center justify-between gap-4 px-4">
          <Link href="/x-autofollow" className="text-[20px] font-extrabold tracking-tight text-white">
            Auto Follow
          </Link>
          <div className="flex items-center gap-4 text-[14px] text-[#71767b] sm:gap-5">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mx-auto mt-20 w-full max-w-3xl px-4 pb-10 md:mt-28">
        <div className="flex flex-col gap-4 border-t border-[#2f3336] pt-6 text-[14px] text-[#71767b] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026{" "}
            <Link href="/" className="hover:text-white">
              {siteConfig.name}
            </Link>
            . Not affiliated with X Corp.
          </p>
          <div className="flex gap-5">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <a href="mailto:nihalnclt@gmail.com" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
