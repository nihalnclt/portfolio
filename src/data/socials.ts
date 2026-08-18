import { SocialType } from "@/types/social";
import { siteConfig } from "@/data/site";

export const socials: SocialType[] = [
  {
    name: "GitHub",
    url: "https://github.com/nihalnclt",
    handle: "nihalnclt",
  },
  {
    name: "X",
    url: "https://x.com/imNihalN",
    handle: "imNihalN",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nihalnclt/",
    handle: "nihalnclt",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_.nihal__n/",
    handle: "_.nihal__n",
  },
  {
    name: "Email",
    url: `mailto:${siteConfig.email}`,
  },
];
