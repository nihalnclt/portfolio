import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Blob, CheckIcon, Flower, PlusIcon } from "@/components/trippay/art";

const title = "Trippay: Split Trip Expenses";
const description =
  "Trippay is a group trip expense splitter for iPhone and Android. Add bills as you go, see who owes whom, and settle up in as few payments as possible.";

// Set these once the app is live; until then each download button renders disabled.
const appStoreUrl: string | undefined = undefined;
const playStoreUrl: string | undefined = undefined;

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/trippay" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/images/projects/trippay.png", width: 256, height: 256 }],
  },
};

/* ---------- Store buttons ---------- */

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

// One store button. Without a URL it renders disabled, with a "Coming soon" hint.
function StoreButton({ href, logo, label }: { href?: string; logo: ReactNode; label: string }) {
  const base =
    "inline-flex items-center gap-2 rounded-full bg-tp-ink px-4 py-2.5 text-[14px] font-semibold text-tp-page";
  return href ? (
    <a href={href} className={`${base} hover:opacity-85`}>
      {logo}
      {label}
    </a>
  ) : (
    <button type="button" disabled title="Coming soon" className={`${base} cursor-not-allowed opacity-40`}>
      {logo}
      {label}
    </button>
  );
}

function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <StoreButton href={appStoreUrl} logo={<AppleLogo />} label="Download on the App Store" />
      <StoreButton href={playStoreUrl} logo={<PlayLogo />} label="Get it on Google Play" />
    </div>
  );
}

/* ---------- Shared pieces ---------- */

const phoneFade = "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-tp-accent-tint px-3 py-1 text-[13px] font-semibold text-tp-accent">
      <span className="size-1.5 rounded-full bg-tp-accent" />
      {children}
    </span>
  );
}

function Heading({
  eyebrow,
  lines,
  text,
  center = false,
}: {
  eyebrow: string;
  lines: [string, string];
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="tp-display mt-4 text-[34px] text-tp-ink sm:text-[44px]">
        {lines[0]}
        <br />
        <span className="text-tp-accent">{lines[1]}</span>
      </h2>
      {text && <p className="mt-4 text-[17px] leading-relaxed text-tp-muted">{text}</p>}
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-8 md:grid-cols-[1.05fr_1fr] md:gap-6 md:pt-16">
      <div>
        <Eyebrow>Group trip expense splitter</Eyebrow>
        <h1 className="tp-display mt-5 text-[42px] text-tp-ink sm:text-[56px] lg:text-[64px]">
          Travel together.
          <br />
          <span className="text-tp-accent">Split it fairly.</span>
        </h1>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-tp-muted">
          Add every bill as it happens, see who owes whom at a glance, and settle up in as few
          payments as possible when the trip ends.
        </p>
        <StoreButtons className="mt-7" />
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-tp-muted">
          {["No ads", "No subscription", "iPhone and Android"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckIcon className="size-4 text-tp-accent" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto h-[400px] w-full max-w-[440px] sm:h-[480px]">
        <Flower
          fill="var(--tp-accent-tint)"
          className="absolute left-1/2 top-1/2 w-[105%] max-w-[480px] -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src="/images/trippay/phone-02-balances.webp"
          alt="Balances for each person in the trip"
          width={600}
          height={1225}
          sizes="200px"
          className={`absolute left-[6%] top-[70px] w-[40%] max-w-[190px] -rotate-[8deg] drop-shadow-xl ${phoneFade}`}
          priority
        />
        <Image
          src="/images/trippay/phone-01-trip.webp"
          alt="A trip screen showing the group total and what you get back"
          width={600}
          height={1225}
          sizes="230px"
          className={`absolute right-[8%] top-[18px] w-[47%] max-w-[225px] rotate-[4deg] drop-shadow-2xl ${phoneFade}`}
          priority
        />

        <div className="absolute right-0 top-[44%] w-[190px] rotate-[3deg] rounded-2xl bg-tp-surface p-3 shadow-xl ring-1 ring-tp-line sm:-right-4">
          <p className="text-[12px] text-tp-muted">You get back</p>
          <p className="text-[20px] font-bold tabular-nums text-[#1f8a3a] dark:text-[#30d158]">₹10,816.66</p>
        </div>
        <div className="absolute bottom-6 left-0 flex w-[264px] -rotate-[3deg] items-center gap-2.5 rounded-2xl bg-tp-surface p-3 shadow-xl ring-1 ring-tp-line sm:-left-4">
          <span className="flex -space-x-2">
            <span className="grid size-7 place-items-center rounded-full bg-blue-700 text-[11px] font-bold text-white ring-2 ring-tp-surface">P</span>
            <span className="grid size-7 place-items-center rounded-full bg-teal-600 text-[11px] font-bold text-white ring-2 ring-tp-surface">R</span>
          </span>
          <span className="flex-1 whitespace-nowrap text-[14px] font-semibold text-tp-ink">Priya pays You</span>
          <span className="text-[14px] font-bold tabular-nums text-tp-ink">₹8,583.33</span>
        </div>

        <Blob fill="var(--tp-yellow-mid)" className="absolute left-[2%] top-2 w-12 -rotate-12" />
        <Blob fill="var(--tp-pink-mid)" className="absolute bottom-[22%] right-[4%] w-9 rotate-12" />
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

const steps = [
  {
    n: "01",
    title: "Start a trip",
    text: "Name it, add where and when, and add the people going.",
    phone: "phone-07-trips",
    alt: "A list of active, upcoming and completed trips",
  },
  {
    n: "02",
    title: "Add bills as you go",
    text: "Who paid, how much, and how to split it: equally, by amount, percent or shares.",
    phone: "phone-03-split",
    alt: "Splitting a new expense equally between four people",
  },
  {
    n: "03",
    title: "Settle up",
    text: "Trippay suggests the fewest payments that clear every balance. Mark each one as paid.",
    phone: "phone-04-settle",
    alt: "Suggested payments to settle every balance",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="mx-auto mt-24 max-w-5xl scroll-mt-24 px-4 md:mt-28">
      <Heading center eyebrow="How it works" lines={["Three steps.", "Zero spreadsheets."]} />
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="flex flex-col overflow-hidden rounded-[28px] bg-tp-soft ring-1 ring-tp-line">
            <div className="p-6 pb-0">
              <p className="tp-display text-[40px] text-tp-accent">{s.n}</p>
              <h3 className="tp-display mt-2 text-[22px] text-tp-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-tp-muted">{s.text}</p>
            </div>
            <div className="relative mt-6 h-[260px]">
              <Image
                src={`/images/trippay/${s.phone}.webp`}
                alt={s.alt}
                width={600}
                height={1225}
                sizes="220px"
                className={`absolute left-1/2 top-0 w-[68%] max-w-[220px] -translate-x-1/2 drop-shadow-xl ${phoneFade}`}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Features ---------- */

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const features = [
  {
    title: "Split any way you like",
    text: "Equally, by exact amounts, by percentage or by shares.",
    icon: "M12 3v9l6.4 6.4M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z",
  },
  {
    title: "Know who owes whom",
    text: "Balances update the moment anyone in the trip adds a bill.",
    icon: "M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8",
  },
  {
    title: "Fewer payments",
    text: "Trippay works out the fewest transfers that clear every balance.",
    icon: "M4 7h13l-3-3M20 17H7l3 3",
  },
  {
    title: "Advances and part payments",
    text: "Record money handed over early, or a payment that covers part of a debt.",
    icon: "M3 9h18v10H3zM3 9l3-5h12l3 5M12 13v2",
  },
  {
    title: "See where it went",
    text: "Spending by category, by person and by day.",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  },
  {
    title: "Share the summary",
    text: "A clean final report of the trip, ready as PDF or CSV.",
    icon: "M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto mt-28 max-w-5xl scroll-mt-24 px-4 md:mt-36">
      <Heading
        eyebrow="Features"
        lines={["Built for messy", "group money."]}
        text="Someone pays for the hotel, someone covers dinner, someone hands over cash for fuel. Trippay keeps it all straight."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="rounded-[24px] bg-tp-surface p-6 ring-1 ring-tp-line">
            <span className="grid size-11 place-items-center rounded-2xl bg-tp-accent-tint text-tp-accent">
              <Icon d={f.icon} />
            </span>
            <h3 className="mt-5 text-[17px] font-bold text-tp-ink">{f.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-tp-muted">{f.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Screens strip ---------- */

const screens = [
  ["phone-01-trip", "Every bill in one place"],
  ["phone-02-balances", "Know who owes whom"],
  ["phone-03-split", "Split any way you like"],
  ["phone-04-settle", "Settle up in fewer payments"],
  ["phone-05-analytics", "See where the money went"],
  ["phone-06-summary", "Share the trip summary"],
  ["phone-07-trips", "Every trip, one app"],
];

function Screens() {
  return (
    <section aria-label="App screens" className="mx-auto mt-28 max-w-5xl px-4 md:mt-36">
      <div className="relative overflow-hidden rounded-[32px] bg-tp-accent-tint py-12 md:py-16">
        <Blob fill="var(--tp-yellow-mid)" className="absolute right-6 top-6 w-12 rotate-12 md:right-12" />
        <div className="px-6 md:px-12">
          <Heading eyebrow="A closer look" lines={["Made for the trip,", "not the office."]} />
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-12 [scrollbar-width:thin]">
          {screens.map(([src, caption]) => (
            <li key={src} className="w-[200px] shrink-0 snap-start sm:w-[220px]">
              <Image
                src={`/images/trippay/${src}.webp`}
                alt={caption}
                width={600}
                height={1225}
                sizes="220px"
                className={`w-full drop-shadow-xl ${phoneFade}`}
              />
              <p className="mt-3 text-[14px] font-semibold text-tp-ink">{caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Pricing ticket ---------- */

const unlocks = [
  "Multiple currencies",
  "Receipt photos",
  "Analytics",
  "PDF and CSV export",
  "For everyone in the trip",
  "On iPhone and Android",
];

function Pricing() {
  return (
    <section id="pricing" className="mx-auto mt-28 max-w-5xl scroll-mt-24 px-4 md:mt-36">
      <Heading center eyebrow="Pricing" lines={["One trip, one unlock.", "No subscription."]} />
      <div className="relative mx-auto mt-12 flex max-w-3xl flex-col overflow-hidden rounded-[28px] shadow-xl ring-1 ring-tp-line md:flex-row">
        {/* Ticket stub */}
        <div className="relative bg-tp-band px-7 py-8 text-white md:w-[260px] md:shrink-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-white/70">Trip unlock</p>
          <p className="tp-display mt-3 text-[36px]">One-time</p>
          <p className="mt-1 text-[15px] text-white/80">per trip, for the whole group</p>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-white/60">Admit everyone</p>
        </div>
        {/* Perforation, with notches cut where the stub tears off */}
        <div className="relative h-0 border-t-2 border-dashed border-tp-line md:h-auto md:w-0 md:border-l-2 md:border-t-0">
          <span className="absolute -left-3 -top-3 size-6 rounded-full bg-tp-page md:-left-3 md:-top-3" />
          <span className="absolute -right-3 -top-3 size-6 rounded-full bg-tp-page md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />
        </div>
        <div className="flex-1 bg-tp-surface px-7 py-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {unlocks.map((u) => (
              <li key={u} className="flex items-center gap-2.5 text-[15px] font-medium text-tp-ink">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tp-accent-tint text-tp-accent">
                  <CheckIcon className="size-3.5" />
                </span>
                {u}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-dashed border-tp-line pt-5 text-[14px] leading-relaxed text-tp-muted">
            Bought on one phone, it unlocks the trip for every member. Refunds go through Apple or
            Google as usual.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is Trippay?",
    a: "An app for recording and splitting the costs of a group trip. Everyone in the trip adds what they paid, and Trippay shows who owes whom and the fewest payments to settle up.",
  },
  {
    q: "How can I split a bill?",
    a: "Equally, by exact amounts, by percentage or by shares. You can also record advances and payments that only cover part of what someone owes.",
  },
  {
    q: "What does a trip unlock include?",
    a: "Multiple currencies, receipt photos, analytics and PDF and CSV export, for everyone in that trip. It is a one-time purchase per trip with no subscription.",
  },
  {
    q: "A purchase did not unlock my trip. What do I do?",
    a: 'Open the trip\'s Unlock screen and tap "Use a purchase you already made" or "Restore purchases". Refunds are handled by Apple or Google through their normal process.',
  },
  {
    q: "How do I delete my account?",
    a: "In the app, go to Profile, then Delete account. Your personal data is erased. In shared trips, the expenses you were part of stay so everyone else's balances remain correct.",
  },
  {
    q: "How does Trippay handle my data?",
    a: (
      <>
        No ads, no ad tracking and no third-party analytics. What you record in a trip is visible
        to the people in that trip. Read the{" "}
        <Link href="/trippay/privacy" className="font-semibold text-tp-accent hover:underline">
          privacy policy
        </Link>
        .
      </>
    ),
  },
  { q: "Which devices does it work on?", a: "iPhone and Android." },
];

function Faq() {
  return (
    <section id="faq" className="mx-auto mt-28 max-w-3xl scroll-mt-24 px-4 md:mt-36">
      <Heading center eyebrow="FAQ" lines={["Questions,", "answered."]} />
      <div className="mt-10 border-t border-dashed border-tp-line">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-dashed border-tp-line py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-tp-ink">
              {f.q}
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tp-accent-tint text-tp-accent">
                <PlusIcon className="size-3.5 transition-transform group-open:rotate-45" />
              </span>
            </summary>
            <p className="mt-3 pr-10 text-[15px] leading-relaxed text-tp-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-[15px] text-tp-muted">
        Still stuck?{" "}
        <Link href="/trippay/support" className="font-semibold text-tp-accent hover:underline">
          Visit support
        </Link>
      </p>
    </section>
  );
}

/* ---------- Closing ---------- */

function Closing() {
  return (
    <section className="mx-auto mt-28 max-w-5xl px-4 md:mt-36">
      <div className="relative overflow-hidden rounded-[32px] bg-tp-accent-tint px-6 pt-10 md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:px-12 md:pt-0">
        <div className="relative z-10 md:py-14">
          <h2 className="tp-display text-[34px] text-tp-ink sm:text-[44px]">
            Your next trip,
            <br />
            <span className="text-tp-accent">sorted.</span>
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-tp-muted">
            Add your friends, add bills as you go, and settle up at the end.
          </p>
          <StoreButtons className="mt-7" />
        </div>
        <div className="relative mx-auto mt-10 h-[260px] w-full max-w-[300px] md:mt-0 md:h-[340px]">
          <Image
            src="/images/trippay/phone-07-trips.webp"
            alt="A list of active, upcoming and completed trips"
            width={600}
            height={1225}
            sizes="220px"
            className="absolute bottom-0 left-1/2 w-[72%] max-w-[220px] -translate-x-1/2 translate-y-[38%] rotate-[4deg] drop-shadow-2xl md:translate-y-[30%]"
          />
          <Blob fill="var(--tp-pink-mid)" className="absolute left-0 top-2 w-11 -rotate-12" />
        </div>
      </div>
    </section>
  );
}

export default function TrippayPage() {
  return (
    <div className="overflow-x-hidden pb-8">
      <Hero />
      <HowItWorks />
      <Features />
      <Screens />
      <Pricing />
      <Faq />
      <Closing />
    </div>
  );
}
