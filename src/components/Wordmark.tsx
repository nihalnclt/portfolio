"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#%&@01";

type WordmarkProps = {
  text: string;
  className?: string;
};

// Header wordmark: a blinking caret after the name, and on hover the letters
// scramble through glyphs and resolve left-to-right back into the name.
export default function Wordmark({ text, className = "" }: WordmarkProps) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);

  const stop = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  const scramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    const start = performance.now();
    const total = 650; // ms for the whole word to resolve
    const tick = (now: number) => {
      const progress = Math.min((now - start) / total, 1);
      const resolved = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < resolved) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else {
        setDisplay(text);
        frame.current = null;
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => stop, []);

  return (
    <span
      className={`inline-flex items-baseline font-mono text-[15px] font-medium tracking-tight ${className}`}
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      <span className="text-faint">~/</span>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-caret bg-primary"
        aria-hidden="true"
      />
    </span>
  );
}
