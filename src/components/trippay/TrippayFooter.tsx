import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const email = "nihalnclt@gmail.com";

export default function TrippayFooter() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-tp-navy text-white">
      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-4 pb-10 pt-14 sm:grid-cols-3">
        <div>
          <Link href="/trippay" className="flex items-center gap-2" aria-label="Trippay home">
            <Image
              src="/images/projects/trippay.png"
              alt=""
              width={64}
              height={64}
              className="size-8 rounded-[22%]"
            />
            <span className="tp-display text-[22px]">trippay</span>
          </Link>
          <p className="mt-3 text-sm text-white/60">
            Made by{" "}
            <Link href="/" className="text-white hover:underline">
              {siteConfig.name}
            </Link>
          </p>
          <a href={`mailto:${email}`} className="mt-1 block text-sm text-white/60 hover:text-white">
            {email}
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold">Help</p>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/trippay/support" className="hover:text-white">
                Support
              </Link>
            </li>
            <li>
              <Link href="/trippay/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Available on</p>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>iPhone</li>
            <li>Android</li>
          </ul>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="tp-display pointer-events-none select-none text-center text-[22vw] leading-[0.75] text-white/[0.05] md:text-[220px]"
      >
        trippay
      </p>
    </footer>
  );
}
