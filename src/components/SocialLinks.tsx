import { socials } from "@/data/socials";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {socials.map(({ name, url }, index) => (
        <span key={name} className="flex items-center gap-3">
          {index > 0 && <span className="text-faint">&middot;</span>}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-heading hover:decoration-faint"
          >
            {name}
          </a>
        </span>
      ))}
    </div>
  );
}
