import Image from "next/image";

type AvatarProps = {
  name: string;
  className?: string;
};

// Illustrated avatar that flips to the real photo on hover (and on focus for keyboard users).
export default function Avatar({ name, className = "" }: AvatarProps) {
  return (
    <div
      className={`group size-12 shrink-0 [perspective:600px] ${className}`}
      tabIndex={0}
      aria-label={name}
    >
      <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
        <Image
          src="/images/profile.png"
          alt={name}
          width={96}
          height={96}
          className="absolute inset-0 h-full w-full rounded-full object-cover [backface-visibility:hidden]"
          priority
        />
        <Image
          src="/images/profile-photo.jpg"
          alt=""
          width={96}
          height={96}
          className="absolute inset-0 h-full w-full rounded-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
    </div>
  );
}
