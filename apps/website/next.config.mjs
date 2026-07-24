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
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
