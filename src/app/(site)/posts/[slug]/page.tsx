import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="container flex flex-col gap-12 pb-24 pt-8">
      <header className="animate-fade-up">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight text-heading md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-faint">
          <time dateTime={post.date} className="text-sm">
            {formatDate(post.date)}
          </time>
          {post.keywords.map((keyword) => (
            <span key={keyword} className="text-sm lowercase">
              #{keyword}
            </span>
          ))}
        </div>
      </header>

      <article
        className="prose dark:prose-invert w-full max-w-none animate-fade-up text-pretty tracking-[-0.005em] [animation-delay:80ms] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-heading prose-p:text-body prose-a:font-medium prose-a:text-heading prose-a:no-underline hover:prose-a:text-heading/70 prose-blockquote:border-line-strong prose-blockquote:text-body prose-strong:text-heading prose-ol:pl-5 prose-ul:pl-5 prose-li:m-0 prose-li:text-body prose-hr:border-line prose-img:rounded-md prose-img:border prose-img:border-line"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  );
}
