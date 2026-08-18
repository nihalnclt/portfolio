"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm">
      {navLinks.map(({ name, link }) => {
        const isActive = pathname === link || pathname.startsWith(`${link}/`);

        return (
          <Link
            href={link}
            key={link}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-2 py-1 font-medium transition-colors hover:bg-heading/5 hover:text-heading ${
              isActive ? "bg-heading/5 text-heading" : "text-faint"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
