import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("majlisunnoor-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/majlisunnoor/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function MajlisunnoorPrivacyPage() {
  const doc = await getLegalDoc("majlisunnoor-privacy");

  return (
    <div className="container flex flex-col gap-12 pb-24 pt-8">
      <header className="animate-fade-up">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight text-heading md:text-4xl">
          {doc.title}
        </h1>
      </header>

      <article
        className="prose dark:prose-invert w-full max-w-none animate-fade-up text-pretty tracking-[-0.005em] [animation-delay:80ms] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-heading prose-p:text-body prose-a:font-medium prose-a:text-heading prose-a:no-underline hover:prose-a:text-heading/70 prose-strong:text-heading prose-ul:pl-5 prose-li:m-0 prose-li:text-body"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
    </div>
  );
}
