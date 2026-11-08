import Link from "next/link";
import { siteConfig } from "@/data/site";

const email = "nihalnclt@gmail.com";

export default function ExpensoFooter() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-3xl px-4 pb-10 md:mt-28">
      <div className="flex flex-col gap-4 border-t border-ex-line pt-6 text-[14px] text-ex-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026{" "}
          <Link href="/" className="hover:text-ex-ink">
            {siteConfig.name}
          </Link>
        </p>
        <div className="flex gap-5">
          <Link href="/expenso/support" className="hover:text-ex-ink">
            Support
          </Link>
          <Link href="/expenso/privacy" className="hover:text-ex-ink">
            Privacy
          </Link>
          <a href={`mailto:${email}`} className="hover:text-ex-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
