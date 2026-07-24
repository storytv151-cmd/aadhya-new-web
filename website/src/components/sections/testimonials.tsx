import { Quote, Star } from "lucide-react";
import { Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { cn } from "@/utils";
import { getTestimonials } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by the teams we <GradientText>build with</GradientText>
            </>
          }
          description="We measure success by the outcomes and relationships we create with the people we work with."
        />

        <div className="mt-14 grid items-start gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 0.1}
              className={cn(index === 1 && "md:mt-10")}
            >
              <Glass specular interactive className="flex h-full flex-col rounded-[2rem] p-7">
                <Quote className="text-primary/30 size-8" />
                <p className="text-foreground-secondary mt-4 flex-1 text-pretty leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="from-brand-from to-brand-to flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                  <div className="text-warning flex gap-0.5">
                    {Array.from({ length: testimonial.rating ?? 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
