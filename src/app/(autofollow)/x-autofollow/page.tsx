import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

const title = "Auto Follow: follow and unfollow on X from your own browser";
const description =
  "A Chrome extension that follows or unfollows X accounts from your own signed-in session, at a random interval with a daily limit. Free plan, or Pro for a one-time $9.99.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/x-autofollow" },
  openGraph: { title, description, type: "website" },
};

const features = [
  ["Follow from a list", "Pick an account and follow its followers or the accounts it follows."],
  ["Filters", "Only verified accounts, accounts with a photo or a bio, public accounts, or accounts that posted recently."],
  ["Unfollow", "Unfollow from your own Following list, optionally only accounts that do not follow you back."],
  ["Paced", "A random interval between actions and a daily limit that you set."],
  ["In your browser", "It uses the X session you are already signed in to. It never asks for your X password."],
];

const plans = [
  { name: "Free", price: "$0", limit: "10 follows and unfollows per day" },
  { name: "Pro", price: "$9.99", limit: "400 follows and unfollows per day", note: "One-time payment. No subscription." },
];

export default function AutofollowPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:pt-16">
      <h1 className="text-balance text-[38px] font-extrabold leading-tight tracking-tight text-white md:text-[52px]">
        Follow and unfollow on X, on a schedule you control
      </h1>
      <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-[#8b98a5]">
        Auto Follow is a Chrome extension. It follows or unfollows X accounts from your own signed-in browser, at a
        random interval, up to a daily limit you choose.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map(([name, text]) => (
          <li key={name} className="rounded-2xl border border-[#2f3336] p-5">
            <h2 className="text-[17px] font-bold text-white">{name}</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-[#8b98a5]">{text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-[26px] font-extrabold tracking-tight text-white">Pricing</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border border-[#2f3336] p-5">
            <p className="text-[15px] font-bold text-[#8b98a5]">{p.name}</p>
            <p className="mt-1 text-[34px] font-extrabold text-white">{p.price}</p>
            <p className="mt-1 text-[15px] text-[#e7e9ea]">{p.limit}</p>
            {p.note ? <p className="mt-1 text-[14px] text-[#8b98a5]">{p.note}</p> : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[14px] text-[#71767b]">
        Prices are in US dollars. Tax may be added at checkout depending on your country. Pro is bought inside the
        extension and payment is handled by Paddle. Full refund within 14 days, see the{" "}
        <Link href="/x-autofollow/refund" className="text-[#1d9bf0] hover:underline">
          refund policy
        </Link>
        .
      </p>

      <div className="mt-12 rounded-2xl border border-[#f5c518]/50 p-5">
        <h2 className="text-[17px] font-bold text-white">Know the risk</h2>
        <p className="mt-1 text-[15px] leading-relaxed text-[#8b98a5]">
          X has rules about automation. Automated following can lead X to limit, lock or suspend an account. You use
          Auto Follow at your own risk. Auto Follow is not affiliated with X Corp. Read the{" "}
          <Link href="/x-autofollow/terms" className="text-[#1d9bf0] hover:underline">
            terms
          </Link>{" "}
          before you use it.
        </p>
      </div>
    </div>
  );
}
