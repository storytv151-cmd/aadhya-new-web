"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import {
  Button,
  Magnetic,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@aadhya/ui";
import { cn } from "@aadhya/utils";
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
          className="absolute left-1/2 z-[1] hidden -translate-x-1/2 items-center gap-1.5 lg:flex"
        >
          {mainNav.map((link) => (
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
          ))}
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
                <nav aria-label="Mobile" className="mt-14 flex flex-col gap-1 p-6">
                  {mainNav.map((link) => (
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
                  ))}
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
