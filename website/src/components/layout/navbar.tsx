"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu } from "lucide-react";
import { Button, Magnetic, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/ui";
import { cn } from "@/utils";
import { mainNav } from "@/lib/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-[1200] flex justify-center px-4 pt-5">
      <div
        className={cn(
          "glass-nav relative flex h-[52px] w-full items-center justify-between gap-6 rounded-full py-1.5 pl-6 pr-2 transition-[max-width] duration-500 ease-out",
          scrolled ? "max-w-3xl" : "max-w-4xl",
        )}
      >
        <div className="relative z-[1]">
          <Logo />
        </div>

        {/* Centered menu (desktop) */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 z-[1] hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
        >
          {mainNav.map((link) =>
            link.children && link.children.length > 0 ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:rotate-180"
                  />
                </Link>
                {/* Dropdown — revealed on hover or keyboard focus (pt-3 bridges the gap) */}
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="glass rounded-2xl p-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="hover:bg-foreground/[0.06] flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors"
                      >
                        <span className="text-foreground text-sm font-medium">{child.label}</span>
                        {child.description && (
                          <span className="text-muted-foreground text-xs">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Right controls */}
        <div className="relative z-[1] flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden lg:block">
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="border-foreground/[0.08] bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.1] rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300"
              >
                Contact
              </Link>
            </Magnetic>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9" aria-label="Open menu">
                  <Menu className="size-[18px]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <nav
                  aria-label="Mobile"
                  className="mt-14 flex max-h-[calc(100dvh-8rem)] flex-col gap-1 overflow-y-auto p-6"
                >
                  {mainNav.map((link) =>
                    link.children && link.children.length > 0 ? (
                      <div key={link.href} className="flex flex-col">
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "hover:bg-foreground/5 rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                              isActive(link.href) && "text-primary",
                            )}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                        <div className="border-border ml-4 flex flex-col gap-0.5 border-l pl-3">
                          {link.children.map((child) => (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                className="text-muted-foreground hover:text-foreground rounded-xl px-3 py-2 text-sm transition-colors"
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "hover:bg-foreground/5 rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                            isActive(link.href) && "text-primary",
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ),
                  )}
                  <SheetClose asChild>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/contact">Contact us</Link>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
