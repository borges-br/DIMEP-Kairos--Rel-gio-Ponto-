import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  deploymentId: process.env.DEPLOYMENT_VERSION,
  turbopack: { root: process.cwd() },
  experimental: {
    serverActions: {
      allowedOrigins: ["rdo.interproject.com.br", "localhost:3000"],
    },
  },
};

export default nextConfig;
