import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type LegalDoc = {
  title: string;
  description: string;
  contentHtml: string;
};

const legalDirectory = path.join(process.cwd(), "src/data/legal");

// Reads a markdown page from src/data/legal, same pipeline as posts.
export async function getLegalDoc(name: string): Promise<LegalDoc> {
  const raw = fs.readFileSync(path.join(legalDirectory, `${name}.md`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    title: data.title ?? name,
    description: data.description ?? "",
    contentHtml: processed.toString(),
  };
}
