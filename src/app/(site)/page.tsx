import Avatar from "@/components/Avatar";
import DownloadCV from "@/components/DownloadCV";
import NewsLetter from "@/components/NewsLetter";
import PostRow from "@/components/PostRow";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const taglineParts = siteConfig.tagline.split(" | ");
  const recentPosts = getAllPosts().slice(0, 4);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <div className="container flex flex-col gap-14 pb-24 pt-8">
      <div className="flex flex-col gap-8">
        <div className="animate-fade-up flex items-center gap-4">
          <Avatar name={siteConfig.name} />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-heading">{siteConfig.name}</h1>
            {/* Break at the separator on narrow screens instead of mid-phrase */}
            <p className="text-sm sm:text-[15px]">
              {taglineParts.map((part, i) => (
                <span key={part}>
                  {i > 0 && (
                    <>
                      <span className="hidden sm:inline"> | </span>
                      <br className="sm:hidden" />
                    </>
                  )}
                  {part}
                </span>
              ))}
            </p>
          </div>
          <DownloadCV className="ml-auto shrink-0 self-start sm:self-center" />
        </div>

        <div className="animate-fade-up flex flex-col gap-5 leading-relaxed [animation-delay:80ms]">
          <p>
            I&apos;m a software developer from{" "}
            <span className="font-medium text-heading">Kozhikode, Kerala</span>, building fast,
            scalable web apps and occasionally breaking things in the process.
          </p>
          <p>
            I currently build software at{" "}
            <span className="font-medium text-heading">Faircode Infotech</span>. Outside work,
            I&apos;m always building something of my own, experimenting with AI, and finding
            simpler ways to solve complicated problems.
          </p>
          <p>I like minimal things, clean code, and shipping over overthinking.</p>
          <p>Most of what I learn ends up here.</p>
        </div>

        <div className="animate-fade-up [animation-delay:160ms]">
          <SocialLinks />
        </div>
      </div>

      <Section
        title="Recent posts"
        moreLink={{ label: "All posts", href: "/posts" }}
        className="animate-fade-up [animation-delay:240ms]"
      >
        <div className="flex flex-col">
          {recentPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section
        title="Recent projects"
        moreLink={{ label: "All projects", href: "/projects" }}
        className="animate-fade-up [animation-delay:320ms]"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <div className="animate-fade-up [animation-delay:400ms]">
        <NewsLetter />
      </div>
    </div>
  );
}
