import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/media/*": ["./content/vault/**/*"],
    "/media/**": ["./content/vault/**/*"],
    "/*": ["./content/vault/**/*.md"],
  },
};

export default nextConfig;
