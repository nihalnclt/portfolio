import { ProjectType } from "@/types/project";

// Personal / indie projects only - work done at companies lives in works.ts.
export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Webyz.io",
    iconSrc: "/images/projects/webyz.png",
    description:
      "Privacy-focused web analytics platform providing real-time insights into website traffic and user behavior.",
    url: "https://webyz.io",
    badge: { label: "Live", tone: "emerald" },
    featured: true,
  },
  {
    id: 2,
    name: "MacRoom.app",
    iconSrc: "/images/projects/macroom.png",
    description:
      "macOS menu bar app bundling system utilities - brightness, volume, metrics, network, SSH, battery, clipboard and more - behind one icon.",
    url: "https://macroom.app",
    badge: { label: "Live", tone: "emerald" },
    tags: ["macOS"],
    featured: true,
  },
  {
    id: 3,
    name: "Trippay",
    iconSrc: "/images/projects/trippay.png",
    description:
      "Group trip expense splitter for iPhone and Android - add bills as you go, see who owes whom, and settle up in fewer payments.",
    url: "/trippay",
    badge: { label: "Building", tone: "amber" },
    tags: ["Expo", "Fastify"],
    featured: true,
  },
  {
    id: 4,
    name: "Majlisunnoor",
    iconSrc: "/images/projects/majlisunnoor.png",
    description:
      "Offline devotional reading app for iPhone and Android - the surahs, duas and Badr Baith, typeset with justified Arabic.",
    url: "/majlisunnoor",
    badge: { label: "Building", tone: "amber" },
    tags: ["Expo", "Skia"],
    featured: true,
  },
];
