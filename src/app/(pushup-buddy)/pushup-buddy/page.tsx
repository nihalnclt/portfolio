import type { Metadata } from "next";
import Image from "next/image";
import FeatureTabs from "@/components/pushup-buddy/FeatureTabs";
import { FloatCard, Icon, IconTile, Phone, Pill, StoreButtons } from "@/components/pushup-buddy/art";

const title = "Pushup Buddy: Push-Up Trainer for iPhone";
const description =
  "One small, achievable push-up target every training day, adjusted to how you actually perform. Free, offline and no account needed. No ads, no analytics, no tracking.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pushup-buddy" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/images/projects/pushup-buddy.png", width: 256, height: 256 }],
  },
};

// How the target responds to each workout (progression rules from the App Store listing).
const rules = [
  { icon: Icon.up, title: "Hit your target", body: "The next one goes up" },
  { icon: Icon.hold, title: "Fall a little short", body: "It holds" },
  { icon: Icon.down, title: "Struggle twice", body: "It eases off" },
  { icon: Icon.restart, title: "Back after a week", body: "It restarts lighter" },
];

const weekBars = [38, 62, 0, 70, 54, 0, 86];

export default function PushupBuddyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero: on the page background, phone rising from the bottom edge, stats floating around it */}
      <section className="relative overflow-hidden px-1 pt-8 text-center md:pt-12">
        <Image
          src="/images/projects/pushup-buddy.png"
          alt=""
          width={256}
          height={256}
          className="mx-auto size-16 rounded-[22%]"
          priority
        />
        <div className="mt-6">
          <Pill>Push-up trainer for iPhone and Android</Pill>
        </div>
        <h1 className="pb-heading mx-auto mt-5 max-w-3xl text-balance text-[44px] leading-[1.02] md:text-[76px]">
          <span className="text-pb-faint">
            Your <span className="whitespace-nowrap">Push-Up</span>
          </span>{" "}
          Plan Starts Here
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-pb-muted">
          One small, achievable target every training day, adjusted to how you actually perform.
        </p>
        <StoreButtons className="mt-8" />

        <div className="relative mx-auto mt-14 h-[400px] max-w-[940px] md:mt-16 md:h-[470px]">
          <Phone
            src="/images/pushup-buddy/screen-today.webp"
            alt="Today screen: 72 push-ups split into 6 sets"
            priority
            className="absolute left-1/2 top-0 w-[240px] -translate-x-1/2 md:w-[290px]"
          />

          <FloatCard className="absolute left-0 top-6 hidden w-[230px] items-center gap-3 md:flex lg:left-6">
            <IconTile className="bg-pb-accent-fill text-white">{Icon.bolt}</IconTile>
            <div>
              <p className="text-[15px] font-semibold">72 push-ups today</p>
              <p className="text-[13px] text-pb-muted">6 sets, 60s rest</p>
            </div>
          </FloatCard>

          <FloatCard className="absolute left-0 top-[230px] flex items-center gap-3 md:left-24 md:top-[210px] lg:left-36">
            <IconTile>{Icon.flame}</IconTile>
            <div>
              <p className="text-[12px] text-pb-muted">Streak</p>
              <p className="text-[17px] font-semibold leading-tight">23 days</p>
            </div>
          </FloatCard>

          <FloatCard className="absolute right-0 top-2 hidden w-[200px] md:block lg:right-10">
            <p className="text-[13px] font-medium">This week</p>
            <div className="mt-3 flex h-20 items-end gap-2">
              {weekBars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-md ${h ? `bg-pb-accent-fill ${i === 6 ? "" : "opacity-40"}` : "bg-pb-soft"}`}
                  style={{ height: `${Math.max(h, 10)}%` }}
                />
              ))}
            </div>
          </FloatCard>

          <FloatCard className="absolute right-0 top-[150px] flex items-center gap-3 md:right-16 md:top-[200px] lg:right-28">
            <IconTile>{Icon.trophy}</IconTile>
            <div className="pr-2">
              <p className="text-[12px] text-pb-muted">Max set</p>
              <p className="text-[17px] font-semibold leading-tight">24 reps</p>
            </div>
            <span className="text-pb-accent">{Icon.check}</span>
          </FloatCard>

          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-pb-page to-transparent" />
        </div>
      </section>

      <FeatureTabs />

      {/* Dark panel: how the plan adapts */}
      <section
        id="adapts"
        className="relative mt-20 scroll-mt-20 overflow-hidden rounded-[36px] bg-pb-panel px-6 py-12 text-white md:mt-28 md:px-12 md:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(232,57,43,0.55),transparent_65%)]"
        />
        <Phone
          src="/images/pushup-buddy/screen-rest.webp"
          alt="Rest timer between sets"
          className="absolute -bottom-40 right-10 hidden w-[270px] rotate-[8deg] lg:block"
        />
        <div className="relative max-w-md">
          <Pill dark>Adaptive plan</Pill>
          <h2 className="pb-heading mt-5 text-[38px] leading-[1.05] md:text-[52px]">
            <span className="text-white/45">A Plan That</span>
            <br />
            Adapts To You
          </h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/70">
            Your target responds to every workout: harder when you hit it, easier when you need it.
          </p>
        </div>
        <div className="relative mt-12 grid grid-cols-2 gap-3 md:mt-20 md:max-w-[720px] md:grid-cols-4">
          {rules.map((r) => (
            <div key={r.title} className="rounded-[22px] bg-white p-4 text-[#141416] md:p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-[#f2f2f7] text-[#c42a1e]">{r.icon}</span>
              <p className="mt-8 text-[15px] font-semibold leading-snug md:mt-10">{r.title}</p>
              <p className="mt-0.5 text-[14px] text-[#5c5c63]">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Habit features */}
      <section className="mt-20 text-center md:mt-28">
        <Pill>Stay consistent</Pill>
        <h2 className="pb-heading mx-auto mt-5 max-w-xl text-balance text-[38px] leading-[1.05] md:text-[52px]">
          <span className="text-pb-faint">Built To</span> Keep You Going
        </h2>
        <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
          <div className="flex min-h-[340px] flex-col justify-between rounded-[28px] bg-[#f6ece6] p-6 dark:bg-[#22150f]">
            <div className="mx-auto mt-6 w-full max-w-[260px] rounded-[20px] bg-white/85 p-4 shadow-sm dark:bg-white/10">
              <div className="flex items-center gap-3">
                <Image src="/images/projects/pushup-buddy.png" alt="" width={64} height={64} className="size-9 rounded-[22%]" />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">Pushup Buddy</p>
                  <p className="text-[12px] text-pb-muted">Reminder at 7:00</p>
                </div>
              </div>
            </div>
            <div>
              <IconTile className="bg-white/70 dark:bg-white/10">{Icon.bell}</IconTile>
              <h3 className="mt-4 text-[20px] font-semibold">Daily reminders</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-pb-muted">A nudge every day at the time you choose.</p>
            </div>
          </div>

          <div className="flex min-h-[340px] flex-col justify-between rounded-[28px] bg-[#e6eef6] p-6 dark:bg-[#0f1822]">
            <div className="mt-6 flex justify-center gap-3">
              {[0, 1].map((i) => (
                <span key={i} className="grid size-16 place-items-center rounded-2xl bg-white/85 text-[#0a6e99] shadow-sm dark:bg-white/10 dark:text-[#5fb8e6]">
                  {Icon.snow}
                </span>
              ))}
            </div>
            <div>
              <IconTile className="bg-white/70 text-[#0a6e99] dark:bg-white/10 dark:text-[#5fb8e6]">{Icon.snow}</IconTile>
              <h3 className="mt-4 text-[20px] font-semibold">Streak freezes</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-pb-muted">
                Earn one for every 7 workout days and bank up to 2. One is used automatically if you miss a training day.
              </p>
            </div>
          </div>

          <div className="flex min-h-[340px] flex-col justify-between rounded-[28px] bg-[#e9f2e9] p-6 dark:bg-[#0f1a12]">
            <ul className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
              {["No account", "No ads", "No analytics", "No tracking", "Works offline"].map((t) => (
                <li key={t} className="rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-medium shadow-sm dark:bg-white/10">
                  {t}
                </li>
              ))}
            </ul>
            <div>
              <IconTile className="bg-white/70 text-[#1e7b34] dark:bg-white/10 dark:text-[#5dc283]">{Icon.lock}</IconTile>
              <h3 className="mt-4 text-[20px] font-semibold">Private by design</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-pb-muted">
                The whole training plan is free and stays on your phone. Optional Premium adds cloud backup and sync.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
