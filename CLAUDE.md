# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The public website for Suryca Software Inc. (suryca.com), an AI software studio with three
products: Fizgot, ExportAIChat and Suryca Agents. Static marketing pages plus one API route
for the contact form. Hosted on Cloudflare Workers (free plan) through OpenNext.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript, strict mode.
- No CSS framework. Design tokens live as CSS variables in `app/globals.css` (`--sy-*`),
  with a handful of `sy-*` utility classes (buttons, nav, forms, responsive grids).
  Everything else is inline `style={{ }}` on JSX, matching the original design.
- Fonts via `next/font/google`: Space Grotesk (display), Hanken Grotesk (body),
  IBM Plex Mono (mono). Use `var(--font-display|body|mono)`, never hard-code family names.
- Path alias `@/` maps to the repo root (`@/components/...`, `@/lib/...`).
- ESLint 9 flat config in `eslint.config.mjs` (next/core-web-vitals + next/typescript).

## Commands

```bash
npm run dev        # local dev server on http://localhost:3000
npm run lint       # eslint .
npm run build      # next build; run before committing, it is the type-check
npm run preview    # OpenNext build + wrangler dev (the real worker, locally)
npm run deploy     # OpenNext build + wrangler deploy (needs `npx wrangler login`)
```

There is no test suite.

## Where things live

- `lib/site.ts` is the single source of truth for brand name, product list (slug, name,
  status, gradient, accent, blurb), nav links, footer columns, contact emails and contact
  form topics. Add or change a product there, not in individual pages.
- `components/PageShell.tsx` wraps every non-home page with Nav + Footer and exports
  `PageHeader` (eyebrow, title, intro).
- `components/ProductPage.tsx` is the template for product pages; product routes only
  supply intro copy, features and CTA text.
- `components/LegalPage.tsx` renders Privacy and Terms from a sections array and an
  `updated` date string. Bump the date when legal copy changes.
- `components/previews/` holds the illustrative product UIs on the home page. They are
  pure JSX drawings, not screenshots.
- `app/page.tsx` (home) is the one page with bespoke layout; it still reads products and
  values from `lib/site.ts`.
- `app/api/contact/route.ts` validates the form, drops honeypot hits, and sends via the
  Resend REST API with plain `fetch` (no SDK). Env: `RESEND_API_KEY` (secret),
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Missing config logs in dev, returns 503 in prod.
- The email body is the published Resend template with alias `contact-form` (variables
  `NAME`, `TOPIC`, `SENDER_EMAIL`, `MESSAGE`). Resend inserts variables as raw HTML, so the
  route escapes them. `emails/contact-notification.html` is the copy that was imported into
  the editor; edit the template in the Resend dashboard and keep that file in sync.

## Conventions

- Page `metadata.title` is the short page name only; the root layout applies the
  `%s — Suryca` template.
- Keep the warm palette: background `#fbf7f0`, ink `#1c1712`, accent `#e2632a`. Use the
  CSS variables rather than new hex values where one exists.
- Shared visual primitives: `SunMark` (brand circle), `ProductMark` (product gradient tile),
  `StatusBadge`, `Eyebrow`, `CtaBlock`, `FeatureGrid`. Reuse before adding new ones.
- Copy uses typographic dashes (—) and `&apos;` for apostrophes inside JSX text.
- Small, targeted changes. Do not introduce Tailwind, CSS modules or a component library
  without discussing it first.

## Deploy (Cloudflare Workers, free plan)

- `wrangler.jsonc` names the worker `suryca-com`; the dashboard project name must match.
- Dashboard build command `npx opennextjs-cloudflare build`, deploy command
  `npx opennextjs-cloudflare deploy`. Plain `npm run build` alone is not deployable.
- Free plan limits: 3 MiB compressed worker, 10 ms CPU per request, 100k requests/day.
  Keep pages statically prerendered (no `dynamic = "force-dynamic"` on pages, no ISR) so
  the worker stays small and only `/api/contact` executes on request.
- Secrets go in the dashboard or `npx wrangler secret put`; never in `wrangler.jsonc`.
- Custom domains are the `routes` entries in `wrangler.jsonc` (`suryca.com` and
  `www.suryca.com`, `custom_domain: true`). Deploying creates their DNS records and certs.
- `www.suryca.com` redirects to `suryca.com` via `redirects()` in `next.config.ts`. Keep the
  two rules (`/` and `/:path+`): with a single `/:path*` rule OpenNext leaves the pattern
  unexpanded for the root path and redirects to a literal `/:path*`.
- `wrangler dev` rewrites the `Host` header to the first route's host, so test the www
  redirect with `npx wrangler dev --host www.suryca.com` after an OpenNext build.
- `.open-next/` and `.wrangler/` are build output and are git-ignored.

## Content notes

- Blog and news items are static sample content.
- Nav has no "Sign in": the site has no accounts. Do not add one without a real target.
