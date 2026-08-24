import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale(en|by)/work/game-thumbnails",
        destination: "/:locale/work/streaming-thumbnails",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
