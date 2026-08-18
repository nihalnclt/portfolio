import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

type Props = {
  title: string;
  moreLink?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
};

export default function Section({ title, moreLink, children, className = "" }: Props) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[12px] uppercase tracking-[0.16em] text-faint">{title}</h2>
        {moreLink && (
          <Link
            href={moreLink.href}
            className="group inline-flex items-center gap-1 text-[13px] text-faint transition-colors hover:text-heading"
          >
            {moreLink.label}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
