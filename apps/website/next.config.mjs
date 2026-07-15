import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Internal packages are shipped as TypeScript source and transpiled here.
  transpilePackages: [
    "@aadhya/ui",
    "@aadhya/hooks",
    "@aadhya/config",
    "@aadhya/utils",
    "@aadhya/types",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Cloudflare R2 public bucket is added in W5 via env-driven config.
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default withPayload(nextConfig);
