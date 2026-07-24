"use client";

import { useEffect } from "react";
import { Button, Container } from "@/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(W8/observability): report to Sentry.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center text-center">
      <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        An unexpected error occurred. Please try again — if it keeps happening, contact us.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
