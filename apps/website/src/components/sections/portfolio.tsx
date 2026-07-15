import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Container, Eyebrow, Glass, GradientText, Reveal, Section } from "@aadhya/ui";
import { cn } from "@aadhya/utils";
import type { PortfolioProject } from "@aadhya/types";
import { getPortfolioProjects } from "@/lib/content";

function ProjectCard({ project, featured }: { project: PortfolioProject; featured?: boolean }) {
  return (
    <Glass
      specular
      interactive
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[2rem]",
        featured && "lg:col-span-2 lg:row-span-2",
      )}
    >
      <div
        className={cn(
          "from-brand-from/20 via-brand-via/10 to-brand-to/20 relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          featured ? "aspect-[16/10]" : "aspect-[16/7]",
        )}
      >
        <span
          className={cn(
            "text-foreground/15 font-bold",
            featured ? "text-[10rem] leading-none" : "text-6xl",
          )}
        >
          {project.title.charAt(0)}
        </span>
        <span className="glass-floating absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn("font-semibold tracking-tight", featured ? "text-2xl" : "text-lg")}>
            {project.title}
          </h3>
          <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-3 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Glass>
  );
}

export async function Portfolio() {
  const projects = await getPortfolioProjects();
  const [featured, ...rest] = projects;

  return (
    <Section id="portfolio">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal direction="none">
              <Eyebrow>Project showcase</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                Work we&rsquo;re <GradientText>proud of</GradientText>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link href="/portfolio">View all projects</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {featured && (
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <ProjectCard project={featured} featured />
            </Reveal>
          )}
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={0.05 + index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
