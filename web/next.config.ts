import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://10.106.19.68:3000",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lf16-fe-tos.bytedgame.com" },
      { protocol: "https", hostname: "p16-marketing-sg.bytedgame.com" },
      { protocol: "https", hostname: "sf16-scmcdn-sg.ibytedtos.com" },
      { protocol: "https", hostname: "sf16-sg.tiktokcdn.com" },
      { protocol: "https", hostname: "www.nvsgames.com" },
      { protocol: "https", hostname: "sf.nvsgames.com" },
    ],
  },
};

export default nextConfig;
