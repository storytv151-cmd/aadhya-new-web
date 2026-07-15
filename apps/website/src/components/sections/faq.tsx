import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Container,
  Eyebrow,
  GradientText,
  Reveal,
  Section,
} from "@aadhya/ui";
import { getFaqs } from "@/lib/content";

export async function Faqs() {
  const faqs = await getFaqs();

  return (
    <Section id="faq">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="none">
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              Questions, <GradientText>answered</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-5">
              Can&rsquo;t find what you&rsquo;re looking for? Reach out and we&rsquo;ll be happy to
              help.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild variant="outline" className="mt-7">
              <Link href="/contact">Contact us</Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass rounded-[2rem] px-6 sm:px-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-white/10">
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
