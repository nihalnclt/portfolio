import { ToolCategoryType } from "@/types/tool";

export const tools: ToolCategoryType[] = [
  {
    category: "Editor & Terminal",
    items: [
      {
        name: "VS Code",
        description: "Main code editor",
        url: "https://code.visualstudio.com",
      },
      {
        name: "Cursor",
        description: "AI-first editor for bigger refactors",
        url: "https://cursor.com",
      },
      { name: "iTerm2", description: "Terminal of choice on macOS", url: "https://iterm2.com" },
    ],
  },
  {
    category: "Development",
    items: [
      { name: "Next.js", description: "React framework for the web", url: "https://nextjs.org" },
      { name: "Node.js", description: "Runtime behind every backend I ship", url: "https://nodejs.org" },
      {
        name: "TypeScript",
        description: "Default language, front to back",
        url: "https://www.typescriptlang.org",
      },
      {
        name: "PostgreSQL",
        description: "Relational database for anything serious",
        url: "https://www.postgresql.org",
      },
      {
        name: "Docker",
        description: "Local services and repeatable deploys",
        url: "https://www.docker.com",
      },
      { name: "GitHub", description: "Code hosting and CI", url: "https://github.com" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      {
        name: "AWS",
        description: "Cloud infrastructure for production workloads",
        url: "https://aws.amazon.com",
      },
      {
        name: "DigitalOcean",
        description: "Simple hosting for smaller projects",
        url: "https://www.digitalocean.com",
      },
    ],
  },
  {
    category: "Hardware",
    items: [
      {
        name: "MacBook Pro M3 Pro",
        description: "Main development machine",
        url: "https://www.apple.com/macbook-pro/",
      },
      {
        name: 'BenQ GW2790QT 27" QHD Monitor',
        description: "USB-C QHD display",
        url: "https://www.benq.com/en-us/monitor/home/gw2790qt.html",
      },
      {
        name: "Redragon K617 Fizz Keyboard",
        description: "60% mechanical keyboard",
        url: "https://redragonshop.com/products/small-mechanical-keyboard",
      },
      {
        name: "HP M270 Mouse",
        description: "Wired mouse",
        url: "https://store.hp.com/in-en/default/hp-gaming-mouse-m270-7zz87aa.html",
      },
      {
        name: "iPad (11th Gen, 2025)",
        description: "Reading and notes",
        url: "https://www.apple.com/ipad-11/",
      },
    ],
  },
];
