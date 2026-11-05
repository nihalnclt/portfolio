import Image from "next/image";
import type { ReactNode } from "react";

// Set these once the app is live; until then each button renders disabled with a "Coming soon" hint.
export const appStoreUrl: string | undefined = undefined;
export const playStoreUrl: string | undefined = undefined;

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 512 512" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

function StoreButton({ href, logo, label, colours }: { href?: string; logo: ReactNode; label: string; colours: string }) {
  const base = `inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ${colours}`;
  return href ? (
    <a href={href} className={`${base} transition-transform hover:-translate-y-0.5`}>
      {logo}
      {label}
    </a>
  ) : (
    <span title="Coming soon" className={`${base} cursor-default opacity-80`}>
      {logo}
      {label}
    </span>
  );
}

// App Store and Google Play pills. `tone` picks dark-on-light or light-on-dark.
export function StoreButtons({
  tone = "dark",
  align = "center",
  className = "",
}: {
  tone?: "dark" | "light";
  align?: "center" | "start" | "responsive";
  className?: string;
}) {
  const colours = tone === "dark" ? "bg-pb-ink text-pb-page" : "bg-white text-[#141416]";
  // "responsive" is centred on phones and left-aligned from md up.
  const justify = { center: "justify-center", start: "justify-start", responsive: "justify-center md:justify-start" }[align];
  const textAlign = { center: "text-center", start: "text-left", responsive: "text-center md:text-left" }[align];
  const live = appStoreUrl || playStoreUrl;
  return (
    <div className={className}>
      <div className={`flex flex-wrap items-center gap-3 ${justify}`}>
        <StoreButton href={appStoreUrl} logo={<AppleLogo />} label="App Store" colours={colours} />
        <StoreButton href={playStoreUrl} logo={<PlayLogo />} label="Google Play" colours={colours} />
      </div>
      {!live && (
        <p className={`mt-3 text-[13px] ${tone === "dark" ? "text-pb-muted" : "text-white/55"} ${textAlign}`}>
          Coming soon to iPhone and Android
        </p>
      )}
    </div>
  );
}

export function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
        dark ? "bg-white/10 text-white/85" : "bg-pb-soft text-pb-ink"
      }`}
    >
      {children}
    </span>
  );
}

// iPhone frame around a real app screen. The parent decides how much of it shows.
export function Phone({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`rounded-[44px] bg-[#0e0e10] p-[9px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={640}
        height={1360}
        sizes="(min-width: 768px) 290px, 240px"
        priority={priority}
        className="w-full rounded-[36px]"
      />
    </div>
  );
}

// Small floating card used around the phones.
export function FloatCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[22px] border border-pb-line bg-pb-surface p-3.5 text-left shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)] dark:bg-pb-soft ${className}`}
    >
      {children}
    </div>
  );
}

export function IconTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-pb-soft text-pb-accent ${className}`}>
      {children}
    </span>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icon = {
  flame: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.5 1 2.5 2 3 0-3.5-.5-6 1-8.5z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6" />
    </svg>
  ),
  timer: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M10 2h4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="size-4" {...stroke} strokeWidth={2.4} aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
  hold: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M5 9h14M5 15h14" />
    </svg>
  ),
  down: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  restart: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 21h4" />
    </svg>
  ),
  snow: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 4l3 2 3-2M9 20l3-2 3 2" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke} aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24" className="size-6" {...stroke} strokeWidth={1.6} aria-hidden="true">
      <path d="M12 20V4M5 11l7-7 7 7" />
    </svg>
  ),
};
