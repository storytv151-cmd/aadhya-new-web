import Link from "next/link";
import { ArrowRight, MessageSquareQuote, Star } from "lucide-react";
import { Button, Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartAppStoreUrl, goCartLinks, goCartReviews } from "@/content/gocart";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={i < rating ? "size-4 fill-amber-400 text-amber-400" : "text-muted-foreground/40 size-4"}
        />
      ))}
    </p>
  );
}

/**
 * Reviews from real Go Cart stores (content/gocart.ts). Until the first ones arrive this shows
 * an honest "early stores" panel — never placeholder or invented reviews.
 */
export function GoCartReviews() {
  const hasReviews = goCartReviews.length > 0;

  return (
    <Section id="reviews">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title={
            hasReviews ? (
              <>
                What stores say about <GradientText>Go Cart</GradientText>
              </>
            ) : (
              <>
                Be one of our <GradientText>first stores</GradientText>
              </>
            )
          }
          description={
            hasReviews
              ? "From Shopify merchants who launched their app with Go Cart."
              : "Go Cart is new. Reviews here will come only from real stores that launched their app with us — yours could be one of the first."
          }
        />

        {hasReviews ? (
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goCartReviews.map((review, index) => (
              <Reveal key={`${review.store}-${review.name}`} delay={index * 0.06} className="h-full">
                <Glass className="flex h-full flex-col rounded-[1.75rem] p-6">
                  {review.rating ? <Stars rating={review.rating} /> : null}
                  <blockquote className="text-foreground mt-4 flex-1 text-pretty leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 text-sm">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-muted-foreground">
                      {review.role},{" "}
                      {review.url ? (
                        <a href={review.url} className="text-primary hover:underline" rel="noopener noreferrer" target="_blank">
                          {review.store}
                        </a>
                      ) : (
                        review.store
                      )}
                    </p>
                  </footer>
                </Glass>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1}>
            <div className="glass-surface mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 rounded-[2rem] px-6 py-10 text-center sm:px-12">
              <span className="bg-primary/12 text-primary ring-primary/15 flex size-12 items-center justify-center rounded-2xl ring-1 ring-inset">
                <MessageSquareQuote aria-hidden="true" className="size-6" />
              </span>
              <p className="text-muted-foreground max-w-xl text-pretty leading-relaxed">
                Launch your app with Go Cart and tell us how it went. With your permission we&rsquo;ll
                feature your store here{goCartAppStoreUrl ? ", and you can rate us on the Shopify App Store" : ""}.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href={goCartLinks.register}>
                    Get started
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                {goCartAppStoreUrl ? (
                  <Button asChild variant="glass">
                    <a href={goCartAppStoreUrl} rel="noopener noreferrer" target="_blank">
                      Rate Go Cart on Shopify
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="glass">
                    <Link href="/contact">Share your feedback</Link>
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
