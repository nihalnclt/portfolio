import Link from "next/link";
import { PostMeta, formatDate } from "@/lib/posts";

export default function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group flex items-baseline gap-4 py-2">
      <span className="text-heading transition-colors group-hover:text-heading/70">
        {post.title}
      </span>
      <span className="block h-px min-w-[2rem] flex-1 self-center bg-line"></span>
      <span className="shrink-0 text-sm text-faint">{formatDate(post.date)}</span>
    </Link>
  );
}
