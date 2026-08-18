import type { Metadata } from "next";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools",
  description: "The tools I use every day to design, build, and ship products.",
};

export default function ToolsPage() {
  return (
    <div className="container pb-24 pt-8">
      <h1 className="animate-fade-up text-2xl font-semibold text-heading">Tools</h1>
      <p className="animate-fade-up mt-3 leading-relaxed [animation-delay:80ms]">
        The tools I use every day to design, build, and ship products.
      </p>

      <div className="animate-fade-up mt-10 flex flex-col gap-10 [animation-delay:160ms]">
        {tools.map(({ category, items }) => (
          <section key={category}>
            <h2 className="mb-4 text-[12px] uppercase tracking-[0.16em] text-faint">{category}</h2>
            <ul className="flex flex-col gap-2.5">
              {items.map(({ name, description, url }) => (
                <li key={name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-heading underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-faint"
                    >
                      {name}
                    </a>
                  ) : (
                    <span className="text-heading">{name}</span>
                  )}
                  {description && <span className="text-sm text-faint">{description}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
