import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0467ff",
    icons: [
      // Sizes must match the real PNG dimensions (312×312 and 500×500).
      { src: "/brand/icon.png", sizes: "312x312", type: "image/png", purpose: "any" },
      { src: "/brand/logo.png", sizes: "500x500", type: "image/png", purpose: "maskable" },
    ],
  };
}
