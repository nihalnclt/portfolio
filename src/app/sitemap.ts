import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/projects",
    "/posts",
    "/tools",
    "/trippay",
    "/trippay/privacy",
    "/trippay/support",
    "/majlisunnoor",
    "/majlisunnoor/privacy",
    "/majlisunnoor/support",
    "/pushup-buddy",
    "/pushup-buddy/privacy",
    "/pushup-buddy/terms",
    "/pushup-buddy/support",
    "/expenso/privacy",
    "/expenso/support",
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.siteUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
