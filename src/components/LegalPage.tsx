import type { LegalDoc } from "@/lib/legal";

// Shared layout for app legal and support pages; mirrors the post page styling.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="container flex flex-col gap-12 pb-24 pt-8">
      <header className="animate-fade-up">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight text-heading md:text-4xl">
          {doc.title}
        </h1>
      </header>

      <article
        className="prose dark:prose-invert w-full max-w-none animate-fade-up text-pretty break-words tracking-[-0.005em] [animation-delay:80ms] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-heading prose-p:text-body prose-a:font-medium prose-a:text-heading prose-a:underline prose-a:decoration-line-strong prose-a:underline-offset-4 hover:prose-a:text-heading/70 prose-strong:text-heading prose-ol:pl-5 prose-ul:pl-5 prose-li:m-0 prose-li:text-body prose-hr:border-line"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
    </div>
  );
}
