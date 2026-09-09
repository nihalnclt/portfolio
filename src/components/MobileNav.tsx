"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Close, Menu } from "@/components/icons";
import { navLinks } from "@/data/navLinks";

// Hamburger button + dropdown panel. Rendered only below md (parent hides it).
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-faint transition-colors hover:border-line-strong hover:text-heading"
      >
        {open ? <Close /> : <Menu />}
      </button>

      {open && (
        <>
          {/* Backdrop: tap outside to close */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-6 top-full z-50 mt-1 overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
          >
            <ul className="flex flex-col p-1.5">
              {navLinks.map(({ name, link }) => {
                const isActive = pathname === link || pathname.startsWith(`${link}/`);
                return (
                  <li key={link}>
                    <Link
                      href={link}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-heading/5 hover:text-heading ${
                        isActive ? "bg-heading/5 text-heading" : "text-faint"
                      }`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
