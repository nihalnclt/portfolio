"use client";

import { useState } from "react";
import { FloatCard, Icon, IconTile, Phone, Pill, StoreButtons } from "@/components/pushup-buddy/art";

// One tab per app screen. Copy follows the App Store listing, which is checked against the app.
const tabs = [
  {
    id: "today",
    label: "Today",
    kicker: "Daily target",
    title: ["One Target,", "Every Day"],
    body: "Test your max, pick a goal and how many days a week you train. Each workout splits the day's target into sets, so no single set asks for more than you can handle.",
    card: { icon: Icon.bolt, title: "72 push-ups today", sub: "6 sets, about 7 min" },
    alt: "Today screen with the day's target split into sets",
  },
  {
    id: "log",
    label: "Log",
    kicker: "Every set",
    title: ["Log What You", "Actually Did"],
    body: "After each set, tap in the reps you managed. Hit your target and the next one goes up. Fall a little short and it holds.",
    card: { icon: Icon.up, title: "Your next target adapts", sub: "Based on what you logged" },
    alt: "Logging the reps done in a set",
  },
  {
    id: "rest",
    label: "Rest",
    kicker: "Between sets",
    title: ["Rest Timer", "Built In"],
    body: "A countdown between sets that you set from 30 seconds to 2 minutes. Skip it or pause it when you need to.",
    card: { icon: Icon.timer, title: "30s to 120s", sub: "Rest between sets" },
    alt: "Rest timer counting down between sets",
  },
  {
    id: "progress",
    label: "Progress",
    kicker: "Your max",
    title: ["Watch Your", "Max Climb"],
    body: "Records, levels and progress toward your single-set goal. Every week the app suggests a new max-set test, so the plan keeps up with how strong you are now.",
    card: { icon: Icon.trophy, title: "Weekly max test", sub: "The plan keeps up with you" },
    alt: "Progress screen with the single-set goal and records",
  },
  {
    id: "history",
    label: "History",
    kicker: "All your work",
    title: ["Every Workout", "In One Place"],
    body: "A calendar of every session, with weekly and monthly volume. Streaks count only your training days, so rest days never break them.",
    card: { icon: Icon.flame, title: "Rest days never break streaks", sub: "Only training days count" },
    alt: "History calendar of workouts",
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section id="features" className="mt-16 scroll-mt-20 md:mt-24">
      <div className="flex justify-center">
        <div role="tablist" aria-label="App screens" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-pb-soft p-1">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls="feature-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-3 py-2 text-[13px] sm:px-4 sm:text-[14px] font-medium transition-colors ${
                i === active ? "bg-pb-surface text-pb-ink shadow-sm" : "text-pb-muted hover:text-pb-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        id="feature-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8"
      >
        <div className="text-center md:text-left">
          <Pill>{tab.kicker}</Pill>
          <h2 className="pb-heading mt-5 text-[38px] leading-[1.05] md:text-[48px]">
            {tab.title[0]}
            <br />
            <span className="text-pb-faint">{tab.title[1]}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-pretty text-[16px] leading-relaxed text-pb-muted md:mx-0">{tab.body}</p>
          <StoreButtons align="responsive" className="mt-8" />
        </div>

        <div className="relative mx-auto h-[470px] w-[240px] overflow-hidden md:h-[540px] md:w-[270px]">
          <Phone key={tab.id} src={`/images/pushup-buddy/screen-${tab.id}.webp`} alt={tab.alt} className="animate-fade-up" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-pb-page to-transparent" />
        </div>

        <div className="flex justify-center md:justify-start md:pl-6">
          <FloatCard key={tab.id} className="w-[220px] animate-fade-up p-5 [animation-delay:80ms]">
            <IconTile>{tab.card.icon}</IconTile>
            <p className="mt-10 text-[17px] font-semibold leading-snug">{tab.card.title}</p>
            <p className="mt-1 text-[14px] text-pb-muted">{tab.card.sub}</p>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}
