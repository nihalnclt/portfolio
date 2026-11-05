export type ProjectBadgeTone = "amber" | "emerald";

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  tagline?: string; // short line shown on compact tiles instead of the description
  icon?: string; // emoji shown before the name
  iconSrc?: string; // image path under /public, takes precedence over icon
  url?: string;
  repoUrl?: string;
  badge?: { label: string; tone: ProjectBadgeTone };
  metrics?: { value: string; label: string }[];
  tags?: string[];
  featured: boolean;
  small?: boolean; // home page: shown as a compact tile instead of a full card
  year?: number;
};
