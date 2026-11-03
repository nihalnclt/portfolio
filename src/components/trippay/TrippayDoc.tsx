import { Cloud } from "@/components/trippay/art";
import type { LegalDoc } from "@/lib/legal";

// Privacy and support pages: display title on a cloud, readable body text below.
export default function TrippayDoc({ doc }: { doc: LegalDoc }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 md:pt-12">
      <div className="relative py-8 text-center">
        <Cloud className="absolute inset-0 -z-0 h-full w-full" />
        <h1 className="tp-display relative text-[36px] text-tp-ink md:text-[52px]">{doc.title}</h1>
      </div>
      <article
        className="tp-prose prose mx-auto mt-6 max-w-2xl break-words text-[17px] leading-relaxed prose-headings:font-bold prose-h2:mt-10 prose-h2:text-[22px] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-ul:pl-5 prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
    </div>
  );
}
