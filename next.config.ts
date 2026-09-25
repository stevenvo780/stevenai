import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WAVE3 tip+1: Metadata API strips home canonical to origin (no /) unless
  // trailingSlash is true — see resolveAbsoluteUrlWithPathname (pathname === '/').
  trailingSlash: true,
  turbopack: {
    // Prevent Next.js from picking up unrelated lockfiles in parent /tmp directories.
    root: __dirname,
  },
};

export default nextConfig;
