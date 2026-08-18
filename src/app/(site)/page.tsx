import Image from "next/image";
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
  const recentPosts = getAllPosts().slice(0, 4);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <div className="container flex flex-col gap-14 pb-24 pt-8">
      <div className="flex flex-col gap-8">
        <div className="animate-fade-up flex items-center gap-4">
          <div className="size-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/images/profile.png"
              alt={siteConfig.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-heading">{siteConfig.name}</h1>
            <p className="text-[15px]">{siteConfig.tagline}</p>
          </div>
          <DownloadCV className="ml-auto shrink-0 self-center" />
        </div>

      <div className="animate-fade-up flex flex-col gap-5 leading-relaxed [animation-delay:80ms]">
        <p>
          I&apos;m a full stack developer from{" "}
          <span className="font-medium text-heading">Kozhikode, Kerala</span>, where I live and
          work today. For the past 4+ years I&apos;ve been building scalable, high-performance
          web applications - inside product teams, and increasingly on projects shipped under my
          own name.
        </p>
        <p>
          I currently build software at{" "}
          <span className="font-medium text-heading">Faircode Infotech</span>, before which I
          worked at Glidix Technologies in Dubai and Digiblock Network in Kerala - shipping
          everything from crypto payment gateways and travel booking platforms to the CMS
          behind one of Kerala&apos;s highest-traffic news portals. Alongside work I&apos;m
          always tinkering on my own bets.
        </p>
        <p>
          I care about minimalism, simplicity, and using AI to ship faster than I have any right
          to. I build in public, and most of what I learn ends up here.
        </p>
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
