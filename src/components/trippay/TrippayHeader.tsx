import Image from "next/image";
import Link from "next/link";

export default function TrippayHeader() {
  return (
    <header>
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/trippay" className="flex items-center gap-2" aria-label="Trippay home">
          <Image
            src="/images/projects/trippay.png"
            alt=""
            width={64}
            height={64}
            className="size-8 rounded-[22%]"
            priority
          />
          <span className="tp-display text-[22px] text-tp-ink">trippay</span>
        </Link>
        <div className="flex items-center gap-5 text-[15px] font-medium text-tp-ink">
          <Link href="/trippay/support" className="hover:text-tp-accent">
            Support
          </Link>
          <Link href="/trippay/privacy" className="hover:text-tp-accent">
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
