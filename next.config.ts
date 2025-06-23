import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
    SHARE_TOKEN: process.env.SHARE_TOKEN,
  },
};

export default nextConfig;
