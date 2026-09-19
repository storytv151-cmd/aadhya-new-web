import type { Metadata } from "next";
import { LatestBlog } from "@/components/sections/latest-blog";
import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Notes on engineering, design, SEO and growing digital products from the Aadhya Infotech team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="From the blog"
        title="Insights & ideas"
        description="Notes on engineering, design and growing digital products."
      />
      <LatestBlog />
    </main>
  );
}
