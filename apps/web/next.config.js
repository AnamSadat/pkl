/** @type {import('next').NextConfig} */

import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const BLOCKED_PREFIXES = ["NODE_", "__", "NEXT_RUNTIME"];
const BLOCKED_KEYS = ["PATH", "PWD", "HOME", "SHELL", "PORT", "TMPDIR"];

function getSafeEnv() {
  const safeEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (
      BLOCKED_KEYS.includes(key) ||
      BLOCKED_PREFIXES.some((prefix) => key.startsWith(prefix))
    ) {
      continue;
    }
    safeEnv[key] = value;
  }
  return safeEnv;
}

const nextConfig = {
  env: getSafeEnv(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-*",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
