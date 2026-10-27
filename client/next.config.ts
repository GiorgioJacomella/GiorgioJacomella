import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain HTML in out/, served by Cloudflare static assets (wrangler.jsonc). The build fails if a page
  // can't be static. No cacheComponents: it forbids the force-static config export needs on robots/sitemap.
  output: "export",
  // No image optimizer on static hosting: files in public/ are served as they are.
  images: { unoptimized: true },
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
