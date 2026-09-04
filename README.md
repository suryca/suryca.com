# suryca.com

Marketing site for **Suryca Software Inc.**, an independent AI software studio.
Built with Next.js (App Router), React and TypeScript. No UI framework: a small set of
CSS variables and `sy-*` utility classes in `app/globals.css`, plus inline styles.
Available in English (`/`) and Hindi (`/hi`) via next-intl.
Deployed to **Cloudflare Workers** via the OpenNext adapter.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000  (Next.js dev server, hot reload)
```

The contact form posts to `/api/contact`. Without credentials it logs submissions to the
terminal and still reports success, so the site works out of the box. To send real email,
copy `.env.example` to `.env.local` and fill in the Resend values.

Other commands:

```bash
npm run lint       # ESLint, then checks messages/*.json all have the same keys
npm run build      # next build; also the type-check
npm run preview    # build the Cloudflare worker and run it locally with wrangler
```

## Deploy to Cloudflare Workers (free plan)

The repo already contains `wrangler.jsonc` and `open-next.config.ts`. In the Cloudflare
dashboard (Workers & Pages → Create → Import a repository → `suryca/suryca.com`) use:

| Setting | Value |
| --- | --- |
| Project name | `suryca-com` (must match `name` in `wrangler.jsonc`) |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

Then add the secret **`RESEND_API_KEY`** under Settings → Variables and Secrets so the
contact form can send email. `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are set in
`wrangler.jsonc`; the from-address must be on a domain verified in Resend. The message
body comes from the published Resend template with alias `contact-form`, which must
declare the variables `NAME`, `TOPIC`, `SENDER_EMAIL` and `MESSAGE`. The template's
HTML and plain-text bodies live in `emails/`; publish edits through the Resend API rather
than the visual editor, which rewrites the markup.

To deploy from your machine instead: `npx wrangler login` once, then `npm run deploy`.

### Domains

`wrangler.jsonc` lists `suryca.com` and `www.suryca.com` as custom domains (`routes` with
`custom_domain: true`). Wrangler creates the DNS records and certificates on deploy, so the
`suryca.com` zone must live in the same Cloudflare account as the worker. `www.suryca.com`
is redirected to `suryca.com` by the `redirects()` in `next.config.ts`.

To try the redirect locally, build the worker and start wrangler with a host override
(plain `wrangler dev` rewrites the `Host` header to the first route in `wrangler.jsonc`):

```bash
npx opennextjs-cloudflare build
npx wrangler dev --host www.suryca.com   # curl -I http://localhost:8787/ → 308 to https://suryca.com/
```

## Languages

Routing follows the Apple pattern: English is the default and lives at the bare path
(`/about`), other languages get a prefix (`/hi/about`). There is no automatic redirect
from browser settings and no cookie; visitors switch with the language links in the footer,
and every internal link keeps them in the language they chose. `/en/...` redirects to the
bare path. Each page declares `hreflang` alternates for search engines.

- `messages/en.json` and `messages/hi.json` hold all copy, one namespace per page or
  component. `npm run lint` fails if the key sets differ.
- `i18n/routing.ts` lists the locales; `middleware.ts` handles the prefix; `i18n/navigation.ts`
  exports the locale-aware `Link` that all internal links use.
- Devanagari text is rendered with Noto Sans Devanagari, loaded only on pages that use it.
  `html[lang="hi"]` heading overrides live at the end of `app/globals.css`.

To add a language: add its code to `locales` in `i18n/routing.ts` and an Open Graph code to
`OG_LOCALE`, copy `messages/en.json` to `messages/<code>.json` and translate it, add the
language's own name under `Language` in every messages file, and (if it needs a different
script) add a font in `app/[locale]/layout.tsx`. Brand and product names stay in Latin script.

## Layout

```
app/[locale]/         Routes (App Router), one folder per page. [locale] is "en" or "hi".
app/[locale]/[...rest] Catch-all that renders the localized not-found page.
app/api/contact/      POST handler for the contact form (Resend template via fetch, honeypot check).
i18n/                 next-intl routing, navigation, request config and metadata helpers.
messages/             en.json and hi.json: every string shown on the site.
middleware.ts         Locale prefix handling (skips /api and static files).
emails/               HTML and plain-text source of the Resend "contact-form" template.
components/           Shared UI: Nav, Footer, LanguageSwitcher, PageShell, ProductPage, …
components/previews/  Illustrative product mock-ups shown on the home page.
lib/site.ts           Brand, product list (slugs, colours, status), routes, emails: no copy.
scripts/check-messages.mjs  Key-parity check for the messages files (runs in `npm run lint`).
wrangler.jsonc        Cloudflare Worker config (name, bindings, custom domains).
open-next.config.ts   OpenNext adapter config.  next.config.ts: www → apex redirect, next-intl plugin.
```

## Pages

Every route also exists under `/hi/` in Hindi.

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, product grid, three product spotlights, values, CTA |
| `/fizgot`, `/exportaichat`, `/agents` | Product pages (share `components/ProductPage.tsx`) |
| `/about`, `/blog`, `/news`, `/careers`, `/contact` | Company pages |
| `/privacy`, `/terms`, `/security` | Legal / trust pages |

## Content notes

- Blog and news entries are static sample content in `messages/*.json`.
- The home page product previews are illustrative mock-ups, not screenshots, and stay in
  English in every language.
- The Hindi Privacy and Terms pages say the English version governs if the two differ.
