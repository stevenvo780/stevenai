import type { NextConfig } from "next";

const htmlCdnCache = [
  {
    key: "CDN-Cache-Control",
    value: "public, s-maxage=3600, stale-while-revalidate=86400",
  },
  {
    key: "Vercel-CDN-Cache-Control",
    value: "public, s-maxage=3600, stale-while-revalidate=86400",
  },
  {
    key: "Cache-Control",
    value: "public, s-maxage=60, stale-while-revalidate=86400",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from picking up unrelated lockfiles in parent /tmp directories.
    root: __dirname,
  },
  async headers() {
    // Home (/) is dynamic because it awaits searchParams → Next emits private,no-store.
    // CDN-*/Vercel-CDN-* override Cache-Control for the Vercel CDN (docs: cache-control-headers).
    return [
      { source: "/", headers: htmlCdnCache },
      { source: "/architecture", headers: htmlCdnCache },
      { source: "/components/:key*", headers: htmlCdnCache },
    ];
  },
};

export default nextConfig;
