export type ProjectBadgeTone = "amber" | "emerald";

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  icon?: string; // emoji shown before the name
  url?: string;
  repoUrl?: string;
  badge?: { label: string; tone: ProjectBadgeTone };
  metrics?: { value: string; label: string }[];
  tags?: string[];
  featured: boolean;
  year?: number;
};
