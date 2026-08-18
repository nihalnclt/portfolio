import { WorkType } from "@/types/work";

export const works: WorkType[] = [
  {
    company: "Faircode Infotech",
    role: "Full Stack Developer",
    startDate: "2024-08-01",
    endDate: null,
    location: "Ernakulam, Kerala",
    projects: [
      {
        name: "Deshabhimani News Portal",
        description:
          "News portal built on Payload CMS delivering real-time updates, with seamless article publishing, multimedia management, and navigation tailored for an engaging reading experience.",
        tags: ["Node.js", "React", "Next.js", "Tailwind", "Payload CMS", "GraphQL"],
      },
      {
        name: "Deshabhimani Newspaper Workflow Management System",
        description:
          "Editorial platform streamlining newspaper production from news collection to publication - a mobile app for area-level reporters, centralized editorial review and proofreading workflows, and AI-powered news editing.",
        tags: ["Node.js", "React", "PostgreSQL", "Tailwind", "BullMQ", "Redis"],
      },
      {
        name: "Kalyan Jewellers Instant Pay",
        description:
          "Digital payment solution enabling instant payouts when customers sell old gold, built in partnership with IDFC Bank - beneficiary validation, NEFT/RTGS transfers, and Aadhaar/PAN verification via Cashfree.",
        tags: ["Node.js", "React", "PostgreSQL", "Tailwind", "BullMQ", "Redis"],
      },
      {
        name: "Pollaide AI",
        description:
          "Election management platform that extracts and organizes voter list data, groups voters by family, surfaces demographic insights, compares electoral rolls, and tracks voter turnout on polling day.",
        tags: ["Node.js", "React", "PostgreSQL", "Gemini API", "OpenCV", "BullMQ"],
      },
    ],
  },
  {
    company: "Glidix Technologies LLC",
    role: "Full Stack Developer",
    startDate: "2024-03-01",
    endDate: "2024-07-01",
    location: "Dubai, UAE",
    projects: [
      {
        name: "Aerodeals B2B Portal",
        description:
          "B2B portal for A2A and bus visa ticket booking with a full admin panel, integrated payment gateways, and a wallet system.",
        tags: ["Node.js", "React", "Next.js", "MySQL", "Express.js", "Tailwind"],
      },
      {
        name: "Fastep",
        description:
          "Service booking portal for Saudi Arabia spanning backend, frontend, admin panel, and mobile apps for both staff and users.",
        tags: ["Node.js", "React", "Next.js", "React Native", "MySQL"],
      },
      {
        name: "Viwa Qatar",
        description:
          "Qatar-based charity app for blood donation, home rebuilding, and community initiatives, with project creation and donation tools.",
        tags: ["Node.js", "React Native", "MySQL"],
      },
    ],
  },
  {
    company: "Digiblock Network",
    role: "Full Stack Developer",
    startDate: "2022-06-01",
    endDate: "2024-03-01",
    location: "Ernakulam, Kerala",
    projects: [
      {
        name: "Travellers Choice",
        description:
          "B2B and B2C travel portal for Dubai covering attractions, hotels, insurance, quotations, A2A, and flights - integrating Flydubai, Air Arabia, and Hotelbeds APIs with a powerful quotation generation tool. Led a 5-member team.",
        tags: ["Node.js", "React", "Next.js", "MongoDB", "Express.js", "Tailwind"],
      },
      {
        name: "Crypto Payment Gateway",
        description:
          "Cryptocurrency payment platform with payment pages and subscription services - like Stripe, but for crypto - supporting transactions and secure storage across multiple currencies.",
        tags: ["Node.js", "React", "Web3", "MongoDB"],
      },
      {
        name: "Hami Crypto Launchpad",
        description:
          "Crypto launchpad supporting new blockchain projects with token launches, fundraising, project vetting, and transparent token allocation, tested across multiple chains.",
        tags: ["Node.js", "React", "MongoDB", "Web3"],
      },
    ],
  },
];
