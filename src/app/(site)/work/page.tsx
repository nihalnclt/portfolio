import type { Metadata } from "next";
import WorkItem from "@/components/WorkItem";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "Work",
  description: "My work history and the roles I have held.",
};

export default function WorkPage() {
  const sorted = [...works].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));

  return (
    <div className="container pb-24 pt-8">
      <h1 className="animate-fade-up text-2xl font-semibold text-heading">Work</h1>
      <p className="animate-fade-up mt-3 leading-relaxed [animation-delay:80ms]">
        Where I have worked and what I did there.
      </p>

      <div className="animate-fade-up mt-10 flex flex-col [animation-delay:160ms]">
        {sorted.map((work) => (
          <WorkItem key={`${work.company}-${work.startDate}`} work={work} />
        ))}
      </div>
    </div>
  );
}
