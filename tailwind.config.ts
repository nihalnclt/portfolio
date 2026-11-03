import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--background)",
        surface: "var(--surface)",
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        heading: "var(--heading)",
        body: "var(--foreground)",
        faint: "var(--faint)",
        primary: "var(--primary)",
        // Trippay product pages (tokens in globals.css under .trippay)
        tp: {
          "page": "var(--tp-page)",
          "ink": "var(--tp-ink)",
          "muted": "var(--tp-muted)",
          "line": "var(--tp-line)",
          "accent": "var(--tp-accent)",
          "surface": "var(--tp-surface)",
          "cloud": "var(--tp-cloud)",
          "accent-tint": "var(--tp-accent-tint)",
          "soft": "var(--tp-soft)",
          "band": "var(--tp-band)",
          "navy": "var(--tp-navy)",
          "yellow-bg": "var(--tp-yellow-bg)",
          "yellow-ink": "var(--tp-yellow-ink)",
          "yellow-mid": "var(--tp-yellow-mid)",
          "blue-bg": "var(--tp-blue-bg)",
          "blue-ink": "var(--tp-blue-ink)",
          "blue-mid": "var(--tp-blue-mid)",
          "pink-bg": "var(--tp-pink-bg)",
          "pink-ink": "var(--tp-pink-ink)",
          "pink-mid": "var(--tp-pink-mid)",
          "green-bg": "var(--tp-green-bg)",
          "green-ink": "var(--tp-green-ink)",
          "green-mid": "var(--tp-green-mid)",
          "peach-bg": "var(--tp-peach-bg)",
          "peach-ink": "var(--tp-peach-ink)",
          "peach-mid": "var(--tp-peach-mid)",
        },
      },
      // Font stacks mirror kulpinski.dev
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
