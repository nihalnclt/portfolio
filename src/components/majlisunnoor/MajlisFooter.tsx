import Link from "next/link";
import { siteConfig } from "@/data/site";

const email = "nihalnclt@gmail.com";

export default function MajlisFooter() {
  return (
    <footer className="mt-24 border-t border-mj-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-[14px] text-mj-muted sm:flex-row sm:justify-between">
        <p>
          Made by{" "}
          <Link href="/" className="text-mj-ink hover:text-mj-green">
            {siteConfig.name}
          </Link>
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li>
            <Link href="/majlisunnoor/support" className="hover:text-mj-green">
              Support
            </Link>
          </li>
          <li>
            <Link href="/majlisunnoor/privacy" className="hover:text-mj-green">
              Privacy
            </Link>
          </li>
          <li>
            <a href={`mailto:${email}`} className="hover:text-mj-green">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
