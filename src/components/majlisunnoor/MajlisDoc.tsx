import type { LegalDoc } from "@/lib/legal";

// Privacy and support pages: title, readable body below.
export default function MajlisDoc({ doc }: { doc: LegalDoc }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 md:pt-16">
      <h1 className="mj-heading text-balance text-[36px] leading-tight text-mj-ink md:text-[46px]">{doc.title}</h1>
      <article
        className="mj-prose prose mt-8 max-w-none break-words text-[17px] leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-[24px] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-ul:pl-5 prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
    </div>
  );
}
