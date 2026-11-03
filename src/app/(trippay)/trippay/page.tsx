import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Blob, CheckIcon, Cloud, Flower, PlusIcon } from "@/components/trippay/art";

const title = "Trippay: Split Trip Expenses";
const description =
  "Trippay is a group trip expense splitter for iPhone and Android. Add bills as you go, see who owes whom, and settle up in as few payments as possible.";

// Set this once the app is live to turn the "coming soon" pills into download links.
const appStoreUrl: string | undefined = undefined;

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

function StorePill({ className = "" }: { className?: string }) {
  const base = `inline-flex items-center gap-2 rounded-full bg-tp-ink px-4 py-2 text-[14px] font-semibold text-tp-page ${className}`;
  return appStoreUrl ? (
    <a href={appStoreUrl} className={`${base} hover:opacity-85`}>
      Download on the App Store
    </a>
  ) : (
    <span className={base}>Coming soon on iPhone and Android</span>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pt-6 text-center">
      <Blob fill="var(--tp-accent)" className="absolute left-[6%] top-24 hidden w-20 -rotate-12 sm:block md:left-[16%] md:w-24" />
      <Blob fill="var(--tp-pink-mid)" className="absolute right-[8%] top-44 hidden w-14 rotate-12 sm:block md:right-[18%]" />

      <div className="relative mx-auto h-[230px] w-[200px] overflow-hidden md:h-[270px] md:w-[230px]">
        <Image
          src="/images/trippay/phone-01-trip.webp"
          alt="Trippay trip screen showing the group total"
          width={600}
          height={1225}
          sizes="230px"
          className="w-full"
          priority
        />
      </div>
      <div className="relative -mt-24 md:-mt-28">
        <Cloud className="mx-auto h-[150px] w-full max-w-[640px] md:h-[180px]" />
        <h1 className="tp-display relative -mt-20 text-[44px] text-tp-ink sm:text-[64px] md:-mt-24 md:text-[84px]">
          Travel together
          <br />
          <span className="text-tp-accent">Split it fairly</span>
        </h1>
      </div>
      <p className="mx-auto mt-5 max-w-sm text-[17px] text-tp-muted">
        The easy way to share costs on a group trip.
      </p>
      <StorePill className="mt-6" />
    </section>
  );
}

/* ---------- Bento ---------- */

function Tile({ bg, children, className = "" }: { bg: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[28px] p-6 md:p-7 ${bg} ${className}`}>{children}</div>
  );
}

function TileTitle({ color, children }: { color: string; children: ReactNode }) {
  return <h2 className={`tp-display text-[28px] md:text-[32px] ${color}`}>{children}</h2>;
}

const splitModes = [
  ["Equally", "Everyone pays the same"],
  ["Amounts", "Exact figures per person"],
  ["Percent", "A share of the total"],
  ["Shares", "Two for you, one for them"],
];

const people = [
  { name: "You", initial: "R", color: "bg-teal-600", amount: "₹10,816.66", note: "gets back", owes: false },
  { name: "Arun", initial: "A", color: "bg-violet-600", amount: "₹5,466.67", note: "gets back", owes: false },
  { name: "Meera", initial: "M", color: "bg-pink-700", amount: "₹7,700.00", note: "owes", owes: true },
  { name: "Priya", initial: "P", color: "bg-blue-700", amount: "₹8,583.33", note: "owes", owes: true },
];

const payments = [
  ["P", "R", "Priya pays You", "₹8,583.33", "-rotate-2"],
  ["M", "A", "Meera pays Arun", "₹5,466.67", "rotate-1"],
  ["M", "R", "Meera pays You", "₹2,233.33", "-rotate-1"],
];

const categories = [
  ["Hotel", "₹24,000", 36, "bg-[#6b5cff]"],
  ["Flights", "₹18,400", 28, "bg-[#1fa67a]"],
  ["Food", "₹8,350", 13, "bg-[#f07b2c]"],
];

function Bento() {
  return (
    <section className="mx-auto mt-16 grid max-w-4xl gap-4 px-4 md:mt-24 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Tile bg="bg-tp-yellow-bg">
          <div className="flex items-start justify-between gap-3">
            <TileTitle color="text-tp-yellow-ink">
              Split any
              <br />
              way you like
            </TileTitle>
            <Blob fill="var(--tp-accent)" className="w-12 shrink-0" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {splitModes.map(([name, text]) => (
              <div key={name} className="rounded-2xl bg-tp-surface p-3 shadow-sm">
                <p className="text-[15px] font-bold text-tp-ink">{name}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-tp-muted">{text}</p>
              </div>
            ))}
          </div>
        </Tile>

        <Tile bg="bg-tp-pink-bg" className="flex-1">
          <TileTitle color="text-tp-pink-ink">
            Settle up in
            <br />
            fewer payments
          </TileTitle>
          <p className="mt-3 text-[15px] leading-relaxed text-tp-muted">
            Trippay works out the fewest transfers that clear every balance.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {payments.map(([a, b, label, amount, tilt]) => (
              <div key={label} className={`rounded-2xl bg-tp-surface p-3.5 shadow-md ${tilt}`}>
                <div className="flex items-center gap-3">
                  <span className="flex -space-x-2">
                    <span className="grid size-7 place-items-center rounded-full bg-blue-700 text-[11px] font-bold text-white ring-2 ring-tp-surface">{a}</span>
                    <span className="grid size-7 place-items-center rounded-full bg-teal-600 text-[11px] font-bold text-white ring-2 ring-tp-surface">{b}</span>
                  </span>
                  <span className="flex-1 text-[15px] font-semibold text-tp-ink">{label}</span>
                  <span className="text-[15px] font-bold tabular-nums text-tp-ink">{amount}</span>
                </div>
                <p className="mt-2.5 rounded-xl bg-[color-mix(in_srgb,var(--tp-accent)_12%,transparent)] py-1.5 text-center text-[13px] font-semibold text-tp-accent">
                  Mark as paid
                </p>
              </div>
            ))}
          </div>
        </Tile>
      </div>

      <div className="flex flex-col gap-4">
        <Tile bg="bg-tp-blue-bg" className="flex-1">
          <TileTitle color="text-tp-blue-ink">
            Know who
            <br />
            owes whom
          </TileTitle>
          <p className="mt-3 text-[15px] leading-relaxed text-tp-muted">
            Balances update the moment anyone in the trip adds a bill.
          </p>
          <div className="mx-auto mt-6 max-w-[320px] rotate-[-4deg] rounded-3xl bg-tp-accent p-5 text-white shadow-xl">
            <p className="text-[13px] text-white/75">Still to settle</p>
            <p className="tp-display mt-1 text-[34px]">₹16,283.33</p>
            <p className="text-[13px] text-white/75">across 3 payments</p>
            <ul className="mt-4 space-y-2.5 rounded-2xl bg-white/10 p-3">
              {people.map((p) => (
                <li key={p.name} className="flex items-center gap-2.5">
                  <span className={`grid size-7 place-items-center rounded-full text-[11px] font-bold ${p.color}`}>{p.initial}</span>
                  <span className="flex-1 text-[14px] font-medium">{p.name}</span>
                  <span className="text-right">
                    <span className={`block text-[14px] font-bold tabular-nums ${p.owes ? "text-[#ffb4c4]" : "text-[#9ff0c0]"}`}>{p.amount}</span>
                    <span className="block text-[11px] text-white/70">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Tile>

        <Tile bg="bg-tp-green-bg">
          <TileTitle color="text-tp-green-ink">
            See where the
            <br />
            money went
          </TileTitle>
          <p className="mt-3 text-[15px] leading-relaxed text-tp-muted">
            Spending by category, by person and by day.
          </p>
          <div className="mt-5 space-y-3 rounded-2xl bg-tp-surface p-4 shadow-md">
            {categories.map(([name, amount, pct, bar]) => (
              <div key={name as string}>
                <div className="flex justify-between text-[14px]">
                  <span className="font-semibold text-tp-ink">{name}</span>
                  <span className="tabular-nums text-tp-muted">
                    {amount} · {pct}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-tp-line">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${(pct as number) * 2.2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Tile>
      </div>

      <Tile bg="bg-tp-peach-bg" className="flex flex-col items-start gap-5 md:col-span-2 md:flex-row md:items-center">
        <div className="flex-1">
          <TileTitle color="text-tp-peach-ink">Pack your bags!</TileTitle>
          <p className="mt-2 text-[15px] text-tp-muted">
            Add your friends, add bills as you go, settle up at the end.
          </p>
        </div>
        <Blob fill="var(--tp-yellow-mid)" className="hidden w-14 md:block" />
        <StorePill />
      </Tile>
    </section>
  );
}

/* ---------- Feature rows ---------- */

type Feature = {
  phone: string;
  alt: string;
  title: [string, string];
  text: string;
  points: string[];
  bg: string;
  mid: string;
  ink: string;
};

const featureRows: Feature[] = [
  {
    phone: "phone-02-balances",
    alt: "Balances screen with what each person owes or gets back",
    title: ["Every bill in", "one place"],
    text: "Add an expense in seconds: who paid, how much and who it was for. Everyone in the trip sees the same numbers.",
    points: ["Split equally, by amount, percent or shares", "Advances and part payments", "Categories, notes and receipt photos"],
    bg: "bg-tp-green-bg",
    mid: "var(--tp-green-mid)",
    ink: "text-tp-green-ink",
  },
  {
    phone: "phone-05-analytics",
    alt: "Analytics screen with spending by category",
    title: ["Know where", "it all went"],
    text: "See the trip by category, by person and by day, with shared and personal costs kept apart.",
    points: ["Spending by category", "Totals per person and per day", "Shared and personal costs"],
    bg: "bg-tp-yellow-bg",
    mid: "var(--tp-yellow-mid)",
    ink: "text-tp-yellow-ink",
  },
  {
    phone: "phone-06-summary",
    alt: "Trip summary with outstanding payments and totals",
    title: ["Share the", "trip summary"],
    text: "When the trip ends, get a clean final report of who paid what and who still owes whom.",
    points: ["Export as PDF or CSV", "Outstanding payments at a glance", "Holidays, weekends and group travel"],
    bg: "bg-tp-peach-bg",
    mid: "var(--tp-peach-mid)",
    ink: "text-tp-peach-ink",
  },
];

function FeatureRows() {
  return (
    <section className="mx-auto mt-24 flex max-w-4xl flex-col gap-20 px-4 md:mt-32 md:gap-28">
      {featureRows.map((f, i) => (
        <div key={f.phone} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className={`relative h-[380px] overflow-hidden rounded-[28px] md:h-[440px] ${f.bg} ${i % 2 ? "md:order-2" : ""}`}>
            <Flower fill={f.mid} className="absolute left-1/2 top-1/2 w-[100%] max-w-none -translate-x-1/2 -translate-y-1/2" />
            <Image
              src={`/images/trippay/${f.phone}.webp`}
              alt={f.alt}
              width={600}
              height={1225}
              sizes="(min-width: 768px) 260px, 60vw"
              className="absolute left-1/2 top-[12%] w-[62%] max-w-[260px] -translate-x-1/2"
            />
          </div>
          <div>
            <h2 className={`tp-display text-[36px] md:text-[44px] ${f.ink}`}>
              {f.title[0]}
              <br />
              {f.title[1]}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-tp-muted">{f.text}</p>
            <ul className="mt-5 space-y-2.5">
              {f.points.map((p) => (
                <li key={p} className={`flex items-center gap-2.5 text-[15px] font-medium ${f.ink}`}>
                  <CheckIcon className="size-4 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------- Trip unlock ---------- */

const unlockPills = [
  ["Multiple currencies", "bg-tp-blue-mid text-tp-blue-ink"],
  ["Receipt photos", "bg-tp-pink-mid text-tp-pink-ink"],
  ["Analytics", "bg-tp-green-mid text-tp-green-ink"],
  ["PDF export", "bg-tp-yellow-mid text-tp-yellow-ink"],
  ["CSV export", "bg-tp-peach-mid text-tp-peach-ink"],
  ["For everyone in the trip", "bg-tp-accent text-white"],
];

function Unlock() {
  return (
    <section className="relative mx-auto mt-28 max-w-4xl px-4 text-center md:mt-36">
      <Blob fill="var(--tp-green-mid)" className="absolute right-[8%] -top-8 w-14 rotate-12 md:right-[20%]" />
      <div className="relative py-6">
        <Cloud className="absolute left-1/2 top-0 h-full w-full max-w-[560px] -translate-x-1/2" />
        <h2 className="tp-display relative text-[36px] text-tp-ink md:text-[48px]">Unlock a trip</h2>
      </div>
      <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2.5">
        {unlockPills.map(([label, cls]) => (
          <li key={label} className={`rounded-full px-4 py-1.5 text-[15px] font-bold ${cls}`}>
            {label}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-tp-muted">
        A one-time purchase per trip, on iPhone and Android. No subscription. Trippay is free to
        use for a trip without it.
      </p>
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
    <section className="mx-auto mt-28 grid max-w-4xl gap-8 px-4 md:mt-36 md:grid-cols-[1fr_1.5fr] md:gap-12">
      <h2 className="tp-display text-[36px] text-tp-ink md:text-[44px]">
        Frequently
        <br />
        asked
        <br />
        questions
      </h2>
      <div className="divide-y divide-tp-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-3.5">
            <summary className="flex cursor-pointer list-none items-start gap-3 text-[16px] font-semibold text-tp-ink">
              <PlusIcon className="mt-1 size-4 shrink-0 text-tp-accent transition-transform group-open:rotate-45" />
              {f.q}
            </summary>
            <p className="mt-2 pl-7 text-[15px] leading-relaxed text-tp-muted">{f.a}</p>
          </details>
        ))}
        <p className="pt-5 text-[15px] text-tp-muted">
          Still stuck?{" "}
          <Link href="/trippay/support" className="font-semibold text-tp-accent hover:underline">
            Visit support
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function TrippayPage() {
  return (
    <div className="overflow-x-hidden pb-8">
      <Hero />
      <Bento />
      <FeatureRows />
      <Unlock />
      <Faq />
    </div>
  );
}
