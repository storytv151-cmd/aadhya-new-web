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
  // The old per-product detail pages now point straight at the products. /GoCart is a page
  // of this site; /DevStore is a separate app on this domain (served by nginx, not Next).
  async redirects() {
    return [
      { source: "/products/gocart", destination: "/GoCart", permanent: true },
      { source: "/products/GoTechCart", destination: "/GoCart", permanent: true },
      { source: "/products/devstore", destination: "/DevStore", permanent: true },
    ];
  },
};

export default nextConfig;
