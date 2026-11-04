// Hero artwork for the Majlisunnoor page: the flag and the line doodles behind it.

// Flag drawn after the photo the owner supplied: maroon panel with crescent and star,
// white panel with a mosque in blue line art, green band along the bottom.
export function Flag({ className = "" }: { className?: string }) {
  const top = "M16 14 C60 2 110 28 160 16 C195 8 215 6 230 12";
  const shape = `${top} L230 112 C215 106 195 108 160 116 C110 128 60 102 16 114 Z`;
  return (
    <svg viewBox="0 0 240 172" className={className} role="img" aria-label="Flag">
      <defs>
        <clipPath id="mj-flag-clip">
          <path d={shape} />
        </clipPath>
        <mask id="mj-crescent">
          <rect x="0" y="0" width="240" height="172" fill="black" />
          <circle cx="58" cy="50" r="17" fill="white" />
          <circle cx="51" cy="48" r="14.5" fill="black" />
        </mask>
        <linearGradient id="mj-flag-folds" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.12" />
          <stop offset="0.22" stopColor="#000" stopOpacity="0" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0.2" />
          <stop offset="0.68" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.9" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="mj-pole" gradientUnits="userSpaceOnUse" x1="12" x2="16" y1="0" y2="0">
          <stop offset="0" stopColor="#c9ccd1" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8d9298" />
        </linearGradient>
      </defs>

      <g className="mj-flag-wave">
        <g clipPath="url(#mj-flag-clip)">
          <rect x="0" y="0" width="92" height="172" fill="#7d1d24" />
          <rect x="92" y="0" width="148" height="172" fill="#f7f5ef" />
          <path d="M16 92 C60 80 110 106 160 94 C195 86 215 84 230 90 L230 140 L16 140 Z" fill="#2fae4a" />

          <rect x="0" y="0" width="240" height="172" fill="#fff" mask="url(#mj-crescent)" />
          <polygon
            points="40.0,50.0 36.0,51.5 35.9,55.7 33.2,52.4 29.1,53.5 31.5,50.0 29.1,46.5 33.2,47.6 35.9,44.3 36.0,48.5"
            fill="#fff"
          />

          <g fill="none" stroke="#2c5f8d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M140 76 C138 60 152 50 160 42 C168 50 182 60 180 76 Z" />
            <path d="M160 42 C153 55 151 66 151 76 M160 42 L160 76 M160 42 C167 55 169 66 169 76" />
            <path d="M144 66 Q160 70 176 66 M148 56 Q160 59 172 56" />
            <path d="M134 76 H186 M136 80 H184" />
            <path d="M160 42 V35" />
            <path d="M157.5 29.5 A3.6 3.6 0 1 0 163 32.5 A2.8 2.8 0 1 1 157.5 29.5 Z" fill="#2c5f8d" stroke="none" />
            <path d="M124 80 V46 H130 V80 M122 55 H132 M123 46 L127 37 L131 46" />
          </g>

          <rect x="0" y="0" width="240" height="172" fill="url(#mj-flag-folds)" />
        </g>
      </g>

      <line x1="14" y1="10" x2="14" y2="170" stroke="url(#mj-pole)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="14" cy="8" r="4.5" fill="#e6e8eb" />
    </svg>
  );
}

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Hand-drawn style line doodles: crescents, stars, a lantern, domes and an open book on a stand.
export function HeroDoodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-white/[0.16]">
      {/* Crescent and star, right */}
      <svg viewBox="0 0 60 60" className="absolute right-[24%] top-[30%] hidden w-12 md:block">
        <path {...line} d="M38 10 A22 22 0 1 0 50 44 A17 17 0 1 1 38 10 Z" />
        <path {...line} d="M48 14 L50 19 L55 19 L51 22 L53 27 L48 24 L43 27 L45 22 L41 19 L46 19 Z" />
      </svg>

      {/* Hanging lantern, top right */}
      <svg viewBox="0 0 40 110" className="absolute right-[6%] top-0 w-7 md:right-[9%] md:w-10">
        <path {...line} d="M20 0 V34" />
        <path {...line} d="M14 34 H26 L30 44 H10 Z" />
        <path {...line} d="M10 44 C6 58 6 70 12 80 H28 C34 70 34 58 30 44" />
        <path {...line} d="M20 48 V76 M14 50 C12 60 12 68 15 76 M26 50 C28 60 28 68 25 76" />
        <path {...line} d="M12 80 L16 88 H24 L28 80 M20 88 V96" />
        <circle {...line} cx="20" cy="99" r="2.5" />
      </svg>

      {/* Eight point star, upper right */}
      <svg viewBox="0 0 24 24" className="absolute right-[22%] top-24 hidden w-7 md:block">
        <polygon
          {...line}
          strokeWidth={1.2}
          points="12.0,1.0 13.7,7.8 19.8,4.2 16.2,10.3 23.0,12.0 16.2,13.7 19.8,19.8 13.7,16.2 12.0,23.0 10.3,16.2 4.2,19.8 7.8,13.7 1.0,12.0 7.8,10.3 4.2,4.2 10.3,7.8"
        />
      </svg>

      {/* Domes and minaret, left middle */}
      <svg viewBox="0 0 120 80" className="absolute left-[3%] top-[44%] hidden w-36 md:block">
        <path {...line} d="M20 78 V40 H28 V78 M18 50 H30 M19 40 L24 26 L29 40 M24 26 V20" />
        <path {...line} d="M40 78 C38 58 54 48 66 38 C78 48 94 58 92 78" />
        <path {...line} d="M66 38 V30 M63 26 A4 4 0 1 0 69 29 A3 3 0 1 1 63 26" />
        <path {...line} d="M96 78 C95 66 102 60 108 56 C114 60 121 66 120 78" />
        <path {...line} d="M10 78 H120" />
        <path {...line} d="M58 78 V66 A8 8 0 0 1 74 66 V78" />
      </svg>

      {/* Open book on a stand, right middle */}
      <svg viewBox="0 0 100 80" className="absolute right-[4%] top-[42%] hidden w-32 md:block">
        <path {...line} d="M50 30 C40 22 24 20 10 24 V54 C24 50 40 52 50 60 C60 52 76 50 90 54 V24 C76 20 60 22 50 30 Z" />
        <path {...line} d="M50 30 V60" />
        <path {...line} d="M18 32 C28 30 38 31 44 35 M18 40 C28 38 38 39 44 43 M56 35 C62 31 72 30 82 32 M56 43 C62 39 72 38 82 40" />
        <path {...line} d="M24 58 L76 78 M76 58 L24 78" />
      </svg>

      {/* Small stars and dots */}
      <svg viewBox="0 0 10 10" className="absolute right-[34%] top-12 hidden w-3 md:block">
        <path {...line} d="M5 0 V10 M0 5 H10" />
      </svg>
      <svg viewBox="0 0 10 10" className="absolute right-[30%] top-[30%] hidden w-2.5 md:block">
        <path {...line} d="M5 0 V10 M0 5 H10" />
      </svg>
      <svg viewBox="0 0 10 10" className="absolute left-[16%] top-[34%] w-2.5">
        <circle cx="5" cy="5" r="3" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 10 10" className="absolute right-[16%] top-[30%] w-2">
        <circle cx="5" cy="5" r="3" fill="currentColor" />
      </svg>

      {/* Swirl, lower left */}
      <svg viewBox="0 0 120 40" className="absolute bottom-[30%] left-[8%] hidden w-28 md:block">
        <path {...line} strokeDasharray="2 6" d="M2 30 C30 2 50 40 70 18 S108 8 118 20" />
      </svg>
    </div>
  );
}
