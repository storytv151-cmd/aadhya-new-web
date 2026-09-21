import { Check, Minus } from "lucide-react";
import { Container, GradientText, Reveal, Section } from "@/ui";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartComparison } from "@/content/gocart";
import { cn } from "@/utils";

const columns = [
  { key: "custom", label: "Custom-built app" },
  { key: "builders", label: "App-builder platforms" },
  { key: "goCart", label: "Go Cart" },
] as const;

/** "Why Go Cart" — the usual routes to an app, side by side. */
export function GoCartComparison() {
  return (
    <Section id="why-go-cart">
      <Container>
        <SectionHeading
          eyebrow="Why Go Cart"
          title={
            <>
              Other routes <GradientText>rebuild your store</GradientText>
            </>
          }
          description="A custom app and most app builders leave you with a second storefront to build and keep in step. Go Cart puts the store you already run into the app."
        />

        {/* Phones: one card per question, Go Cart's answer first (a 3-column table would hide it). */}
        <ul className="mt-12 grid gap-4 md:hidden">
          {goCartComparison.map((row, index) => (
            <li key={row.label}>
              <Reveal delay={index * 0.04} className="glass-surface rounded-[1.5rem] p-5">
                <h3 className="text-foreground font-semibold tracking-tight">{row.label}</h3>
                <p className="bg-primary/[0.08] text-foreground mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>
                    <span className="text-primary font-semibold">Go Cart: </span>
                    {row.goCart}
                  </span>
                </p>
                <dl className="text-muted-foreground mt-3 space-y-2 px-1 text-sm leading-relaxed">
                  <div>
                    <dt className="text-foreground/80 inline font-medium">App-builder platforms: </dt>
                    <dd className="inline">{row.builders}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground/80 inline font-medium">Custom-built app: </dt>
                    <dd className="inline">{row.custom}</dd>
                  </div>
                </dl>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1} className="hidden md:block">
          <div className="glass-surface mt-12 overflow-x-auto rounded-[2rem]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">How a custom app, app-builder platforms and Go Cart compare</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] px-5 py-5 sm:px-6" />
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={cn(
                        "px-5 py-5 font-semibold tracking-tight sm:px-6",
                        col.key === "goCart" ? "text-primary" : "text-foreground",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {goCartComparison.map((row) => (
                  <tr key={row.label} className="border-border/60 border-t">
                    <th scope="row" className="text-foreground px-5 py-4 align-top font-medium sm:px-6">
                      {row.label}
                    </th>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-5 py-4 align-top leading-relaxed sm:px-6",
                          col.key === "goCart" ? "bg-primary/[0.06] text-foreground" : "text-muted-foreground",
                        )}
                      >
                        <span className="flex items-start gap-2">
                          {col.key === "goCart" ? (
                            <Check aria-hidden="true" className="text-primary mt-0.5 size-4 shrink-0" />
                          ) : (
                            <Minus aria-hidden="true" className="text-muted-foreground/60 mt-0.5 size-4 shrink-0" />
                          )}
                          {row[col.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
