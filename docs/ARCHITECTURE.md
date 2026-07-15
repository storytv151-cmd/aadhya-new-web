# Architecture

This document captures the load-bearing decisions. It reflects a Principal-Architect review of
the original spec — where the spec had a technically weaker option, we chose the stronger one.

## Monorepo

Turborepo 2 + pnpm workspaces. `apps/*` are deployable; `packages/*` are shared libraries consumed
via the `@aadhya/*` alias and pnpm's `workspace:*` protocol.

## Rendering & data

- The public site uses **SSG/ISR + on-demand revalidation**, not per-request DB reads.
- Pages read Payload through the **Local API** in Server Components, tagged per collection.
- Payload `afterChange` / `afterDelete` hooks call `revalidateTag(...)` so cached pages regenerate
  only when content changes → fast LCP, resilient, cheap.
- Seed-data fallback exists **for local dev only**. Production surfaces proper error states rather
  than silently serving placeholder content.

## Forms (Contact / Newsletter)

Handled **in-app** via Next.js Server Actions → shared zod validation (`@aadhya/types`) → Cloudflare
Turnstile verification → Payload Local API write → `afterChange` hook (email/CRM). No network hop to
a separate service; Payload is the single source of truth; `Leads.create` is server-only.

## Fastify service (`apps/backend`)

A **ready service shell**, not the owner of simple form endpoints. It exists for workloads that
genuinely need a separate, independently scalable service: AI APIs, Shopify webhooks, Web-To-App
build APIs, queues, and real-time. Milestone 1 ships its production baseline (Helmet, CORS allowlist,
rate-limit, compression, zod-validated env, pino logging, health check, structured errors, Dockerfile).

## Motion (performance-first)

The spec's Lighthouse ≥95 goal is protected by budgeting motion:

- **Native CSS scroll-driven animations** (`animation-timeline: view()/scroll()`) are the default —
  off the main thread.
- **Motion** (Framer) is loaded via `LazyMotion` + `m` only where JS is required (magnetic buttons,
  mouse parallax, complex orchestration).
- **No GSAP.**
- **Lenis** smooth-scroll is gated: desktop only, disabled under `prefers-reduced-motion` and on
  touch devices.
- Everything animates once, uses GPU transforms, and honours reduced motion.

## Media storage

Cloudflare **R2** (S3-compatible) via `@payloadcms/storage-s3` from day one — the Docker/DigitalOcean
target has an ephemeral container filesystem, so local-disk media would be lost on every redeploy.

## Security

Nonce-based **CSP** via `middleware.ts` (path-relaxed for `/admin`), Turnstile + Cloudflare
rate-limiting on forms, `noindex` on `/admin` and `/api`, secure cookies, CORS allowlist,
zod-validated env in every app, no secrets in the repo, PII-aware access control on `Leads`.

## Internationalisation

English-only content today, but **i18n-ready**: Payload localization is enabled and routing/content
are structured so a `[locale]` segment and locale-aware accessors can be added without restructuring.

## Quality gates

Vitest (unit), Playwright + axe (e2e/a11y), Lighthouse CI, and lint/typecheck run in CI on every PR
(`install → lint → typecheck → test → build`).
