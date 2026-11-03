// Shapes and small icons for the Trippay pages. All drawn here, no external artwork.

type ShapeProps = { className?: string };

// A squishy round character with two eyes. Colour comes from `fill`.
export function Blob({ className = "", fill }: ShapeProps & { fill: string }) {
  const lobes = [
    [50, 22, 22],
    [76, 36, 21],
    [78, 64, 21],
    [52, 80, 22],
    [25, 66, 21],
    [24, 36, 21],
    [50, 51, 30],
  ];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill={fill}>
        {lobes.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <ellipse cx="41" cy="50" rx="4.5" ry="7" fill="#15122e" />
      <ellipse cx="60" cy="50" rx="4.5" ry="7" fill="#15122e" />
    </svg>
  );
}

// Scalloped flower that sits behind phones.
export function Flower({ className = "", fill }: ShapeProps & { fill: string }) {
  const petals = 12;
  const ring = 34;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill={fill}>
        {Array.from({ length: petals }, (_, i) => {
          const a = (i / petals) * Math.PI * 2;
          return <circle key={i} cx={50 + Math.cos(a) * ring} cy={50 + Math.sin(a) * ring} r="14" />;
        })}
        <circle cx="50" cy="50" r="36" />
      </g>
    </svg>
  );
}

export function CheckIcon({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
