/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets test builds use an isolated output dir (e.g. NEXT_DIST_DIR=.next-test)
  // so they never collide with the running dev server's .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  output: "standalone",
  // Auto Follow moved from /autofollow to /x-autofollow; keep old links and settings working.
  async redirects() {
    return [
      { source: "/autofollow", destination: "/x-autofollow", permanent: true },
      { source: "/autofollow/:path*", destination: "/x-autofollow/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
