import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from picking up unrelated lockfiles in parent /tmp directories.
    root: __dirname,
  },
};

export default nextConfig;
