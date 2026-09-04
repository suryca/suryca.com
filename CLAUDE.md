# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The public website for Suryca Software Inc. (suryca.com), an AI software studio with three
products: Fizgot, ExportAIChat and Suryca Agents. Static marketing pages in English and
Hindi plus one API route for the contact form. Hosted on Cloudflare Workers (free plan)
through OpenNext.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript, strict mode.
- No CSS framework. Design tokens live as CSS variables in `app/globals.css` (`--sy-*`),
  with a handful of `sy-*` utility classes (buttons, nav, forms, responsive grids).
  Everything else is inline `style={{ }}` on JSX, matching the original design.
- Fonts via `next/font/google`: Space Grotesk (display), Hanken Grotesk (body),
  IBM Plex Mono (mono), each with Noto Sans Devanagari as the Hindi fallback (unicode-range
  scoped, not preloaded). Use `var(--font-display|body|mono)`, never hard-code family names.
- next-intl 4 for languages: `localePrefix: "as-needed"`, English unprefixed, Hindi at `/hi`,
  detection and cookie off. Messages in `messages/<locale>.json`, typed via `global.d.ts`.
- Path alias `@/` maps to the repo root (`@/components/...`, `@/lib/...`).
- ESLint 9 flat config in `eslint.config.mjs` (next/core-web-vitals + next/typescript).

## Commands

```bash
npm run dev        # local dev server on http://localhost:3000
npm run lint       # eslint . && scripts/check-messages.mjs (message key parity)
npm run build      # next build; run before committing, it is the type-check
npm run preview    # OpenNext build + wrangler dev (the real worker, locally)
npm run deploy     # OpenNext build + wrangler deploy (needs `npx wrangler login`)
```

There is no test suite.

## Where things live

- All routes live under `app/[locale]/` (`en` or `hi`, from `i18n/routing.ts`). The layout
  there is the root layout: it validates the locale, calls `setRequestLocale`, loads fonts
  and wraps children in `NextIntlClientProvider` with only the namespaces client
  components need (`ContactForm`, `Language`). `app/[locale]/[...rest]/page.tsx` turns
  unknown paths into the localized `not-found.tsx`. `middleware.ts` skips `/api`.
- `messages/en.json` is the source of every string; `messages/hi.json` mirrors its keys
  (lint fails otherwise). Namespaces match pages/components (`Home`, `Nav`, `Footer`,
  `ProductPage.<slug>`, `Privacy`, …). Server components use `getTranslations`, sync
  components `useTranslations`; arrays (features, legal sections, posts) come out with
  `t.raw(...)`, markup (hero `<br>`, `<em>`) with `t.rich(...)`.
- `lib/site.ts` holds structure only: brand name, product list (slug, name, status,
  gradient, accent), nav and footer link keys, contact emails and contact form topics.
  Product blurbs and all other copy are in the messages files. Add a product in both.
- Internal links use `Link` from `@/i18n/navigation` (locale-aware), never `next/link`,
  except `components/LanguageSwitcher.tsx`, which builds hrefs with `getPathname` so the
  English link is the bare path. In-page anchors (`#products`) are plain `<a>`.
- `i18n/metadata.ts` → `pageMetadata(locale, href, title, description)` adds canonical and
  `hreflang` alternates; every page's `generateMetadata` goes through it.
- `components/PageShell.tsx` wraps every non-home page with Nav + Footer and exports
  `PageHeader` (eyebrow, title, intro).
- `components/ProductPage.tsx` is the template for product pages; product routes only
  supply intro copy, features and CTA text.
- `components/LegalPage.tsx` renders Privacy and Terms from a sections array and an
  `updated` date string, all read from the `Privacy`/`Terms` namespaces. Bump `updated`
  in both message files when legal copy changes. The Hindi intro states the English
  version governs.
- `components/previews/` holds the illustrative product UIs on the home page. They are
  pure JSX drawings, not screenshots.
- `app/[locale]/page.tsx` (home) is the one page with bespoke layout; it reads products
  from `lib/site.ts` and copy from the `Home`, `Products` and `Values` namespaces.
- `app/api/contact/route.ts` validates the form, drops honeypot hits, and sends via the
  Resend REST API with plain `fetch` (no SDK). Env: `RESEND_API_KEY` (secret),
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Missing config logs in dev, returns 503 in prod.
- The email body is the published Resend template with alias `contact-form` (variables
  `NAME`, `TOPIC`, `SENDER_EMAIL`, `MESSAGE`). Resend inserts variables as raw HTML, so the
  route escapes them. `emails/contact-notification.html` and `.txt` are the source of the
  template's HTML and plain-text bodies. Publish changes with the Resend API
  (`PATCH /templates/{id}` then `POST /templates/{id}/publish`), not the visual editor:
  the editor rewrites the markup and drops `colspan`, and Python urllib is blocked by
  Resend's edge, so use curl.

## Conventions

- Page titles (`<Namespace>.title` in messages) are the short page name only; the locale
  layout applies the `%s — Suryca` template.
- Keep the warm palette: background `#fbf7f0`, ink `#1c1712`, accent `#e2632a`. Use the
  CSS variables rather than new hex values where one exists.
- Shared visual primitives: `SunMark` (brand circle), `ProductMark` (product gradient tile),
  `StatusBadge`, `Eyebrow`, `CtaBlock`, `FeatureGrid`. Reuse before adding new ones.
- Copy uses typographic dashes (—) and typographic apostrophes (’) in the messages files
  (`'` is an escape character in ICU message syntax). Brand and product names, email
  addresses and stats stay untranslated. Contact form option values stay English: the API
  validates them and uses them as the email subject; only labels are translated.
- Small, targeted changes. Do not introduce Tailwind, CSS modules or a component library
  without discussing it first.

## Deploy (Cloudflare Workers, free plan)

- `wrangler.jsonc` names the worker `suryca-com`; the dashboard project name must match.
- Dashboard build command `npx opennextjs-cloudflare build`, deploy command
  `npx opennextjs-cloudflare deploy`. Plain `npm run build` alone is not deployable.
- Free plan limits: 3 MiB compressed worker, 10 ms CPU per request, 100k requests/day.
  Keep pages statically prerendered (no `dynamic = "force-dynamic"` on pages, no ISR) so
  the worker stays small. Per request the worker only runs the locale middleware, serves the
  prerendered HTML, and executes code for `/api/contact` and unknown paths (not-found).
  Bundle after i18n: about 1 MiB gzipped.
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

- Blog and news items are static sample content, in the messages files.
- Product previews on the home page stay English in every language.
- The language switcher lives in the footer bottom bar only (Apple style), not in the nav.
- Nav has no "Sign in": the site has no accounts. Do not add one without a real target.
