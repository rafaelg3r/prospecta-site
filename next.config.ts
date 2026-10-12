import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to `out/`,
  // hostable anywhere (Vercel, Netlify, Hostinger, S3...).
  output: "export",
  // cacheComponents / partialPrefetching (PPR) are not allowed in export mode.
  images: { unoptimized: true },
  reactCompiler: true,
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
