import { Container, Skeleton } from "@/ui";

export default function Loading() {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      {/* Hero placeholder */}
      <Container className="flex min-h-[75vh] flex-col items-center justify-center gap-5 py-32 text-center">
        <Skeleton className="h-7 w-52 rounded-full" />
        <div className="flex w-full max-w-3xl flex-col items-center gap-4">
          <Skeleton className="h-12 w-11/12 sm:h-14" />
          <Skeleton className="h-12 w-3/4 sm:h-14" />
        </div>
        <div className="flex w-full max-w-xl flex-col items-center gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Skeleton className="h-12 w-44 rounded-full" />
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
      </Container>

      {/* Content grid placeholder */}
      <Container className="grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border-border rounded-2xl border p-7">
            <Skeleton className="size-12 rounded-xl" />
            <Skeleton className="mt-5 h-5 w-2/3" />
            <div className="mt-4 flex flex-col gap-2.5">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-11/12" />
              <Skeleton className="h-3.5 w-4/6" />
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
