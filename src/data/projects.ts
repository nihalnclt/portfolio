import { ProjectType } from "@/types/project";

// Personal / indie projects only - work done at companies lives in works.ts.
export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Webyz.io",
    icon: "📊",
    description:
      "Privacy-focused web analytics platform providing real-time insights into website traffic and user behavior.",
    // TODO: add the URL once webyz.io is live
    badge: { label: "Building", tone: "amber" },
    featured: true,
  },
  {
    id: 2,
    name: "CooksyAI.app",
    icon: "🍳",
    description:
      "AI-powered cooking assistant that turns recipe videos, reels, shorts, and blogs into structured recipes, ingredients, and meal plans.",
    // TODO: add the URL once cooksyai.app is live
    badge: { label: "Building", tone: "amber" },
    featured: true,
  },
  {
    id: 3,
    name: "FlowProxy",
    icon: "🔍",
    description:
      "Desktop MITM proxy inspector for HTTP/HTTPS traffic - capture, traffic rules, and HAR export, in the vein of Charles Proxy.",
    // TODO: add the repo URL once it's public
    badge: { label: "Building", tone: "amber" },
    tags: ["Electron", "React", "TypeScript"],
    featured: true,
  },
];
