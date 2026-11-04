import Link from "next/link";
import { siteConfig } from "@/data/site";

const email = "nihalnclt@gmail.com";

export default function PushupFooter() {
  return (
    <footer className="mt-24 border-t border-pb-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-[14px] text-pb-muted sm:flex-row sm:justify-between">
        <p>
          Made by{" "}
          <Link href="/" className="text-pb-ink hover:text-pb-accent">
            {siteConfig.name}
          </Link>
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li>
            <Link href="/pushup-buddy/support" className="hover:text-pb-accent">
              Support
            </Link>
          </li>
          <li>
            <Link href="/pushup-buddy/privacy" className="hover:text-pb-accent">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/pushup-buddy/terms" className="hover:text-pb-accent">
              Terms
            </Link>
          </li>
          <li>
            <a href={`mailto:${email}`} className="hover:text-pb-accent">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
