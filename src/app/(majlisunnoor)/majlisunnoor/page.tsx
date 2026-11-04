import type { Metadata } from "next";
import Image from "next/image";
import { StoreButtons } from "@/components/majlisunnoor/art";
import { Flag, HeroDoodles } from "@/components/majlisunnoor/hero-art";

const title = "Majlisunnoor: The Badr Baith on Your Phone";
const description =
  "Majlisunnoor for iPhone and Android: the surahs, duas and Badr Baith for the Majlisunnoor gathering, typeset for your phone. Fully offline, with no account and no ads.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/majlisunnoor" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/images/projects/majlisunnoor.png", width: 256, height: 256 }],
  },
};

const about =
  "പാണക്കാട് സയ്യിദ് ഹൈദരലി ശിഹാബ് തങ്ങളുടെ നിര്‍ദേശ പ്രകാരം SYSന്‍റെ കീഴില്‍ നടത്തി വരുന്ന മജ്‍ലിസുന്നൂര്‍ ആത്മീയ സദസ്സില്‍ പാരായണം ചെയ്യാനുള്ള ബദ്‍ര്‍ ബൈതിന്‍റെ മൊബൈല്‍ സോഫ്റ്റ് വെയര്‍";

const points = [
  { title: "Fully offline", body: "Every page, image and font is inside the app. No internet needed." },
  { title: "Read at your size", body: "Change the text size and line spacing to suit your eyes." },
  { title: "Pick up where you stopped", body: "Your place is saved, or jump straight to any section." },
  { title: "Light and dark", body: "Read comfortably by day or at night, or follow your phone." },
];

export default function MajlisunnoorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero: green panel, screenshots rising from the bottom edge */}
      <section className="relative mt-2 overflow-hidden rounded-[32px] bg-mj-hero px-6 pt-14 text-center text-white md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_60%)]"
        />
        <HeroDoodles />
        {/* Flag as faded background art, fading out toward the centre */}
        <Flag className="pointer-events-none absolute -left-6 top-4 w-[230px] opacity-[0.22] [mask-image:linear-gradient(to_right,black_35%,transparent)] md:-left-10 md:top-6 md:w-[480px] md:opacity-[0.28]" />
        <div className="relative">
          <Image
            src="/images/projects/majlisunnoor.png"
            alt=""
            width={256}
            height={256}
            className="mx-auto size-20 rounded-[22%] ring-4 ring-white/15"
            priority
          />
          <h1 className="mj-heading mt-6 text-[44px] leading-none md:text-[72px]">Majlisunnoor</h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-white/80">
            The Badr Baith, surahs and duas for the Majlisunnoor gathering, on your phone.
          </p>
          <StoreButtons className="mt-8" />
        </div>

        <div className="relative mx-auto mt-14 flex max-w-[560px] items-start justify-center gap-4 md:mt-16 md:gap-6">
          <Image
            src="/images/majlisunnoor/screen-home.webp"
            alt="Home screen with continue reading and sections"
            width={720}
            height={1566}
            sizes="(min-width: 768px) 260px, 45vw"
            className="-mb-24 w-1/2 max-w-[260px] rounded-t-[28px] border-x-[6px] border-t-[6px] border-white/20 md:-mb-32"
          />
          <Image
            src="/images/majlisunnoor/screen-reader.webp"
            alt="A Badr Baith page in the reader"
            width={720}
            height={1566}
            sizes="(min-width: 768px) 260px, 45vw"
            className="-mb-24 mt-10 w-1/2 max-w-[260px] rounded-t-[28px] border-x-[6px] border-t-[6px] border-white/20 md:-mb-32 md:mt-14"
          />
        </div>
      </section>

      {/* About, in Malayalam */}
      <section className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[200px_1fr] md:gap-12">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mj-gold">About</p>
          <Image
            src="/images/majlisunnoor/portrait.webp"
            alt="Panakkad Sayyid Hyderali Shihab Thangal"
            width={800}
            height={801}
            sizes="(min-width: 768px) 200px, 160px"
            className="mt-6 w-40 rounded-2xl object-cover md:w-full"
          />
        </div>
        <div className="md:pt-10">
          <p
            lang="ml"
            className="text-pretty font-[family-name:var(--font-mj-ml)] text-[22px] font-medium leading-[1.75] md:text-[28px]"
          >
            {about}
          </p>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-mj-muted">
            Mobile software of the Badr Baith, for recitation at the Majlisunnoor spiritual gathering
            held under the SYS on the direction of Panakkad Sayyid Hyderali Shihab Thangal.
          </p>
        </div>
      </section>

      {/* Points */}
      <section className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[200px_1fr] md:gap-12">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mj-gold">The app</p>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-mj-line sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="bg-mj-surface p-6">
              <h2 className="mj-heading text-[19px]">{p.title}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-mj-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
