import { siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.siteUrl}/posts/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date(0).toUTCString();

      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><pubDate>${pubDate}</pubDate></item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.name)}</title><description>${escapeXml(siteConfig.description)}</description><link>${siteConfig.siteUrl}/</link><language>en-us</language>${items}</channel></rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
