# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The public website for Suryca Software Inc. (suryca.com), an AI software studio with three
products: Fizgot, ExportAIChat and Suryca Agents. Static marketing pages only, no backend.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript, strict mode.
- No CSS framework. Design tokens live as CSS variables in `app/globals.css` (`--sy-*`),
  with a handful of `sy-*` utility classes (buttons, nav, forms, responsive grids).
  Everything else is inline `style={{ }}` on JSX, matching the original design export.
- Fonts via `next/font/google`: Space Grotesk (display), Hanken Grotesk (body),
  IBM Plex Mono (mono). Use `var(--font-display|body|mono)`, never hard-code family names.
- Path alias `@/` maps to the repo root (`@/components/...`, `@/lib/...`).

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build; run this before committing, it is the type-check
```

There is no test suite and no ESLint config yet (`npm run lint` will prompt to install one).

## Where things live

- `lib/site.ts` is the single source of truth for brand name, product list (slug, name,
  status, gradient, accent, blurb), nav links, footer columns and contact emails.
  Add or change a product there, not in individual pages.
- `components/PageShell.tsx` wraps every non-home page with Nav + Footer and exports
  `PageHeader` (eyebrow, title, intro).
- `components/ProductPage.tsx` is the template for product pages; product routes only
  supply intro copy, features and CTA text.
- `components/LegalPage.tsx` renders Privacy and Terms from a sections array.
- `app/page.tsx` (home) is the one page with bespoke layout; it still reads products and
  values from `lib/site.ts`.
- `design/` holds the original mockups (`*.dc.html` + `support.js`, plus a self-contained
  `suryca-standalone.html`). Open them in a browser for visual reference. They are not
  imported by the app and must not be bundled.

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

## Known placeholders (do not "fix" silently)

- Contact form only sets local state; no submission backend.
- Nav "Sign in" and home "See careers" link to `/contact`.
- Home page product screenshots are placeholders.
- Legal pages include a "review by counsel" note.

## Deploy

Intended for Vercel with the repo root as the project root. No environment variables are
required today.
