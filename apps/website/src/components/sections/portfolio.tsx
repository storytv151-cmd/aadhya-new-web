import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Container, Eyebrow, Glass, GradientText, Reveal, Section } from "@aadhya/ui";
import type { PortfolioProject } from "@aadhya/types";
import { getPortfolioProjects } from "@/lib/content";

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Glass
      specular
      interactive
      className="group flex h-full flex-col overflow-hidden rounded-[2rem]"
    >
      {/* aspect-[3/2] balances the 4:3 app mockups with the 16:10 game/web shots */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {project.image ? (
          // Served unoptimized so the SVG app cards work without next/image's
          // dangerouslyAllowSVG; the raster game/web shots are already tiny.
          <Image
            src={project.image.url}
            alt={project.image.alt || project.title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="from-brand-from/20 via-brand-via/10 to-brand-to/20 flex size-full items-center justify-center bg-gradient-to-br">
            <span className="text-foreground/15 text-6xl font-bold">{project.title.charAt(0)}</span>
          </div>
        )}
        <span className="glass-floating absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
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

        {/* Ordered app → game → website, so each row of three reads as one category. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.05 + (index % 3) * 0.06}>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <ProjectCard project={project} />
                </a>
              ) : (
                <ProjectCard project={project} />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
