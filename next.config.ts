import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to `out/`,
  // hostable anywhere (Vercel, Netlify, Hostinger, S3...).
  output: "export",
  // cacheComponents / partialPrefetching (PPR) are not allowed in export mode.
  images: { unoptimized: true },
  reactCompiler: true,
  // Turbopack's disk cache (on by default since Next 16.3) reused a stale
  // globals.css through the Tailwind loader, in dev and on Vercel (which
  // restores .next/cache). Builds take ~20s, so it is off for both.
  experimental: {
    turbopackFileSystemCacheForBuild: false,
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
