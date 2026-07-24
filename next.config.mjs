/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  eslint: {
    // Production build shouldn't fail on lint; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
