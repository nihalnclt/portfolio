import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="container">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-8 text-sm text-faint">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a href="/rss.xml" className="transition-colors hover:text-heading">
          RSS
        </a>
      </div>
    </footer>
  );
}
