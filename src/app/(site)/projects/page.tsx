import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I have built.",
};

export default function ProjectsPage() {
  return (
    <div className="container pb-24 pt-8">
      <h1 className="animate-fade-up text-2xl font-semibold text-heading">Projects</h1>
      <p className="animate-fade-up mt-3 leading-relaxed [animation-delay:80ms]">
        Over the years, I&apos;ve worked on a range of projects, some as hobbies, others as proofs
        of concept, and a few to address challenges I encountered myself. Here&apos;s a selection
        of the work I&apos;ve done.
      </p>

      <div className="animate-fade-up mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 [animation-delay:160ms]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
