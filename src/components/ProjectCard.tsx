import Image from "next/image";
import { ProjectType } from "@/types/project";
import { ArrowUpRight } from "@/components/icons";

const badgeTones = {
  amber:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300",
  emerald:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300",
};

// `compact` shows the header row and the short tagline, for the small home page tiles.
export default function ProjectCard({ project, compact = false }: { project: ProjectType; compact?: boolean }) {
  const href = project.url ?? project.repoUrl;

  const card = (
    <div className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
      <div className="flex min-w-0 items-center gap-2">
        {project.iconSrc ? (
          <Image
            src={project.iconSrc}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0 rounded-sm object-contain"
          />
        ) : (
          project.icon && <span className="text-base leading-none">{project.icon}</span>
        )}
        <h3 className="truncate font-medium text-heading">{project.name}</h3>
        {project.badge && (
          <span
            className={`shrink-0 rounded-full border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide ${badgeTones[project.badge.tone]}`}
          >
            {project.badge.label}
          </span>
        )}
        {href && (
          <span className="ml-auto text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-heading">
            <ArrowUpRight />
          </span>
        )}
      </div>

      {compact ? (
        project.tagline && <p className="mt-1 truncate text-sm text-faint">{project.tagline}</p>
      ) : (
        <p className="mt-2 text-sm leading-relaxed">{project.description}</p>
      )}

      {!compact && project.metrics && project.metrics.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-sm">
          {project.metrics.map(({ value, label }) => (
            <span key={label}>
              <span className="font-medium text-heading">{value}</span>{" "}
              <span className="text-faint">{label}</span>
            </span>
          ))}
        </div>
      )}

      {!compact && project.tags && project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded bg-heading/5 px-1.5 py-0.5 text-xs text-faint">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (!href) return card;

  // Pages on this site open in the same tab; external links open a new one.
  const isInternal = href.startsWith("/");

  return (
    <a
      href={href}
      className="h-full"
      {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {card}
    </a>
  );
}
