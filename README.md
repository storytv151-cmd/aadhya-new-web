# Aadhya Infotech — Website v2.0

A world-class, product-first software company website. Premium branding, cinematic
scroll motion, top-tier SEO, and enterprise architecture.

> **Flagship product:** Web To App. The site is built product-first — Aadhya builds
> products, not only client projects.

## Tech stack

| Layer    | Choice                                                                            |
| -------- | --------------------------------------------------------------------------------- |
| Monorepo | Turborepo 2 + pnpm workspaces                                                     |
| Frontend | Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · shadcn/ui            |
| Motion   | Native CSS scroll-driven (default) · Motion/Framer (`LazyMotion`) · Lenis (gated) |
| CMS      | Payload 3 (runs inside the website app) · MongoDB · Cloudflare R2 media           |
| API      | Fastify service shell (AI / Shopify / Web-To-App / webhooks — future)             |
| Deploy   | Docker · Nginx · Cloudflare · DigitalOcean (later phase)                          |

## Repository layout

```
apps/
  website/   # Next.js 15 + Payload CMS (public site + /admin)
  backend/   # Fastify service shell (future heavy APIs)
packages/
  ui/        # @aadhya/ui — components + motion primitives
  types/     # @aadhya/types — domain types + shared zod schemas
  config/    # @aadhya/config — design tokens, tailwind preset, motion tokens
  utils/     # @aadhya/utils — pure utilities
  hooks/     # @aadhya/hooks — reusable React hooks
docker/      # docker-compose.dev.yml (MongoDB) + prod Dockerfiles
docs/        # architecture & environment docs
```

## Getting started

```bash
# 1. Install
pnpm install

# 2. Set up env (a working dev .env is created for you; edit if needed)
cp apps/website/.env.example apps/website/.env

# 3. Start a local MongoDB — no Docker needed (in-memory, persistent dbPath).
#    Leave this running in its own terminal:
pnpm --filter @aadhya/website dev:db
#    ...or point DATABASE_URI at a MongoDB Atlas cluster instead.

# 4. Seed the CMS with real content + a default admin user:
pnpm --filter @aadhya/website seed
#    → admin@aadhyainfotech.com / changeme123  (change this!)

# 5. Run the site (http://localhost:3000, CMS admin at /admin)
pnpm --filter @aadhya/website dev
```

## Common scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Run all apps in dev (Turborepo)       |
| `pnpm build`     | Production build of all apps/packages |
| `pnpm lint`      | ESLint across the workspace           |
| `pnpm typecheck` | TypeScript project-wide typecheck     |
| `pnpm test`      | Unit tests (Vitest)                   |
| `pnpm format`    | Prettier write                        |

See [`docs/`](./docs) for architecture and environment details.
