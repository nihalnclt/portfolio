import Link from "next/link";
import { siteConfig } from "@/data/site";

const email = "nihalnclt@gmail.com";

export default function OppamFooter() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-3xl px-4 pb-10 md:mt-28">
      <div className="flex flex-col gap-4 border-t border-op-line pt-6 text-[14px] text-op-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026{" "}
          <Link href="/" className="hover:text-op-ink">
            {siteConfig.name}
          </Link>
        </p>
        <div className="flex gap-5">
          <Link href="/oppam/support" className="hover:text-op-ink">
            Support
          </Link>
          <Link href="/oppam/privacy" className="hover:text-op-ink">
            Privacy
          </Link>
          <Link href="/oppam/terms" className="hover:text-op-ink">
            Terms
          </Link>
          <a href={`mailto:${email}`} className="hover:text-op-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
