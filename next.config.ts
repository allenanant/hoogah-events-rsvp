import type { NextConfig } from "next";

// Static export for GitHub Pages (served at /hoogah-events-rsvp/).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hoogah-events-rsvp",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
