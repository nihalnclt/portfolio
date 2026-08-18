/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets test builds use an isolated output dir (e.g. NEXT_DIST_DIR=.next-test)
  // so they never collide with the running dev server's .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
