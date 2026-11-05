import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Icon, StoreButtons } from "@/components/pushup-buddy/art";

const email = "nihalnclt@gmail.com";
const line = "Push-ups every day";

const columns = [
  {
    title: "App",
    links: [
      { href: "/pushup-buddy#features", label: "Features" },
      { href: "/pushup-buddy#adapts", label: "How it adapts" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/pushup-buddy/support", label: "Support" },
      { href: `mailto:${email}`, label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/pushup-buddy/privacy", label: "Privacy" },
      { href: "/pushup-buddy/terms", label: "Terms" },
    ],
  },
];

// Dark rounded footer with a scrolling headline.
export default function PushupFooter() {
  return (
    <footer className="mx-auto mt-20 w-full min-w-0 max-w-6xl px-4 pb-4 md:mt-28">
      <div className="overflow-hidden rounded-[36px] bg-pb-panel text-white">
        <div aria-hidden="true" className="overflow-hidden py-12 md:py-16">
          <div className="pb-marquee flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="pb-heading flex items-center whitespace-nowrap pr-10 text-[64px] font-medium leading-none md:pr-16 md:text-[120px]">
                    {line}
                    <span className="ml-10 inline-block size-3 rounded-full bg-pb-accent-fill md:ml-16 md:size-4" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-6 border-t border-white/10 md:mx-12" />

        <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.4fr_2fr] md:px-12">
          <div>
            <p className="text-[26px] font-medium leading-tight">
              One small target
              <br />
              every training day.
            </p>
            <p className="mt-2 text-[14px] text-white/55">Free, offline, no account needed.</p>
            <StoreButtons tone="light" align="start" className="mt-6" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-[15px]">{c.title}</p>
                <ul className="mt-3 space-y-2 text-[14px] text-white/55">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-6 pb-8 text-[13px] text-white/45 md:px-12">
          <p>
            © 2026{" "}
            <Link href="/" className="hover:text-white">
              {siteConfig.name}
            </Link>
          </p>
          <a href="#top" aria-label="Back to top" className="text-white/80 transition-colors hover:text-white">
            {Icon.arrowUp}
          </a>
        </div>
      </div>
    </footer>
  );
}
