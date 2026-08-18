import { Download } from "@/components/icons";
import { siteConfig } from "@/data/site";

export default function DownloadCV({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.cvPath}
      download
      aria-label="Download CV"
      title="Download CV"
      className={`group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 text-xs font-medium text-heading transition-colors hover:border-line-strong ${className}`}
    >
      <Download className="size-3 text-faint transition-transform group-hover:translate-y-0.5" />
      CV
    </a>
  );
}
