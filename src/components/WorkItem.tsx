import { WorkType } from "@/types/work";
import { ChevronDown } from "@/components/icons";

function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function CompanyLine({ work }: { work: WorkType }) {
  return (
    <h3 className="font-medium text-heading">
      {work.role} <span className="font-normal text-body">at {work.company}</span>
    </h3>
  );
}

function Body({ work }: { work: WorkType }) {
  return (
    <>
      {work.description && <p className="mt-3 leading-relaxed">{work.description}</p>}

      {work.highlights && work.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm">
          {work.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="text-faint">&mdash;</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {work.projects && work.projects.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 border-l border-line pl-4">
          {work.projects.map((project) => (
            <div key={project.name}>
              <p className="text-sm font-medium text-heading">{project.name}</p>
              <p className="mt-1 text-sm leading-relaxed">{project.description}</p>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-heading/5 px-1.5 py-0.5 text-xs text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function WorkItem({ work }: { work: WorkType }) {
  const range = `${formatMonthYear(work.startDate)} - ${
    work.endDate ? formatMonthYear(work.endDate) : "Present"
  }`;
  const projectCount = work.projects?.length ?? 0;
  const hasBody = Boolean(work.description || work.highlights?.length || projectCount);

  const meta = [work.location, projectCount ? `${projectCount} projects` : null]
    .filter(Boolean)
    .join(" · ");

  // Nothing to reveal - render a plain, non-interactive entry
  if (!hasBody) {
    return (
      <div className="border-b border-line py-5 last:border-b-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <CompanyLine work={work} />
          <span className="shrink-0 text-sm text-faint">{range}</span>
        </div>
        {meta && <p className="mt-1 text-sm text-faint">{meta}</p>}
      </div>
    );
  }

  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <CompanyLine work={work} />
          <span className="flex shrink-0 items-center gap-2 text-sm text-faint">
            {range}
            <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
          </span>
        </div>
        {meta && <p className="mt-1 text-sm text-faint">{meta}</p>}
      </summary>

      <div className="pb-6">
        <Body work={work} />
      </div>
    </details>
  );
}
