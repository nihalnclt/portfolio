export type WorkProjectType = {
  name: string;
  description: string;
  tags?: string[];
};

export type WorkType = {
  company: string;
  role: string;
  startDate: string; // ISO date, e.g. "2023-01-01"
  endDate: string | null; // null = present
  location?: string;
  description?: string;
  url?: string;
  highlights?: string[];
  projects?: WorkProjectType[]; // things built during this role
};
