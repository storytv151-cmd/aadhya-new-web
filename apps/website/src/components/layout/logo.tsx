import Image from "next/image";
import Link from "next/link";
import { cn } from "@aadhya/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Aadhya Infotech — home"
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background group flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
    >
      {/* The icon's "A" is dark, so it sits on a white tile to stay legible in both themes. */}
      <span className="ease-quart flex size-8 items-center justify-center rounded-[0.7rem] bg-white p-1.5 ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 dark:ring-white/10">
        <Image
          src="/brand/icon.png"
          alt=""
          width={28}
          height={28}
          className="size-full object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight">
          Aadhya <span className="text-muted-foreground">Infotech</span>
        </span>
      )}
    </Link>
  );
}
