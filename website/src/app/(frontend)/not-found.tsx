import Link from "next/link";
import { Button, Container } from "@/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center text-center">
      <p className="text-primary text-sm font-semibold uppercase tracking-widest">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="text-muted-foreground mt-4 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </Container>
  );
}
