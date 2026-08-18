import type { Metadata } from "next";
import PostRow from "@/components/PostRow";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "Articles and notes on software development.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container pb-24 pt-8">
      <h1 className="animate-fade-up text-2xl font-semibold text-heading">Posts</h1>
      <p className="animate-fade-up mt-3 leading-relaxed [animation-delay:80ms]">
        Articles and notes on things I build, break, and learn.
      </p>

      <div className="animate-fade-up mt-10 flex flex-col [animation-delay:160ms]">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
