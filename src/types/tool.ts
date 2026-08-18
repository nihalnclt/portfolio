export type ToolType = {
  name: string;
  description?: string;
  url?: string;
};

export type ToolCategoryType = {
  category: string;
  items: ToolType[];
};
