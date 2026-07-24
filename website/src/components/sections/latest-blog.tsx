import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Eyebrow, Glass, GradientText, Reveal, Section } from "@/ui";
import { formatDate, formatReadingTime } from "@/utils";
import { getLatestPosts } from "@/lib/content";

export async function LatestBlog() {
  const posts = await getLatestPosts(3);
  const [featured, ...rest] = posts;

  return (
    <Section id="blog">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal direction="none">
              <Eyebrow>From the blog</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                Latest <GradientText>insights</GradientText>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link href="/blog">Read the blog</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {/* Featured */}
          {featured && (
            <Reveal>
              <Glass
                specular
                interactive
                className="group flex h-full flex-col overflow-hidden rounded-[2rem]"
              >
                <div className="from-brand-from/20 via-brand-via/10 to-brand-to/20 relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br">
                  <span className="glass-floating absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
                    {featured.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="text-muted-foreground text-xs">
                    {formatDate(featured.publishedAt)} ·{" "}
                    {formatReadingTime(featured.readingTimeMinutes)}
                  </div>
                  <h3 className="group-hover:text-primary mt-2 text-2xl font-semibold tracking-tight transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <Link
                    href={featured.href}
                    className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Read more <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Glass>
            </Reveal>
          )}

          {/* List */}
          <div className="flex flex-col gap-4">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={0.05 + index * 0.06} className="flex-1">
                <Link href={post.href} className="block h-full">
                  <Glass
                    interactive
                    className="flex h-full flex-col justify-center rounded-[1.75rem] p-6"
                  >
                    <div className="text-muted-foreground text-xs">
                      {post.category} · {formatReadingTime(post.readingTimeMinutes)}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{post.title}</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </Glass>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
