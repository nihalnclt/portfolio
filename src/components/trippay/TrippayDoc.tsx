import type { LegalDoc } from "@/lib/legal";

// Privacy and support pages: same eyebrow and display heading as the landing page sections.
export default function TrippayDoc({ doc, eyebrow }: { doc: LegalDoc; eyebrow: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:pt-16">
      <span className="inline-flex items-center gap-2 rounded-full bg-tp-accent-tint px-3 py-1 text-[13px] font-semibold text-tp-accent">
        <span className="size-1.5 rounded-full bg-tp-accent" />
        {eyebrow}
      </span>
      <h1 className="tp-display mt-4 text-[36px] text-tp-ink md:text-[48px]">{doc.title}</h1>
      <div className="mt-8 pb-16 drop-shadow-xl">
        <article
          className="tp-prose prose tp-zig-bottom max-w-none break-words rounded-t-[28px] bg-tp-surface px-5 pb-10 pt-2 text-[17px] leading-relaxed md:px-10 md:pb-12 md:pt-6 prose-headings:font-bold prose-h2:mt-10 prose-h2:text-[22px] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-ul:pl-5 prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
        />
      </div>
    </div>
  );
}
