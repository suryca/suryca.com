# suryca.com

Marketing site for **Suryca Software Inc.**, an independent AI software studio.
Built with Next.js (App Router), React and TypeScript. No UI framework: a small set of
CSS variables and `sy-*` utility classes in `app/globals.css`, plus inline styles.
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
npm run lint       # ESLint (next/core-web-vitals + TypeScript rules)
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

## Layout

```
app/                  Routes (App Router). One folder per page, page.tsx inside.
app/api/contact/      POST handler for the contact form (Resend template via fetch, honeypot check).
emails/               HTML and plain-text source of the Resend "contact-form" template.
components/           Shared UI: Nav, Footer, PageShell, ProductPage, FeatureGrid, …
components/previews/  Illustrative product mock-ups shown on the home page.
lib/site.ts           Single source of truth for brand, products, nav, footer and contact data.
wrangler.jsonc        Cloudflare Worker config (name, bindings, custom domains).
open-next.config.ts   OpenNext adapter config.  next.config.ts: www → apex redirect.
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, product grid, three product spotlights, values, CTA |
| `/fizgot`, `/exportaichat`, `/agents` | Product pages (share `components/ProductPage.tsx`) |
| `/about`, `/blog`, `/news`, `/careers`, `/contact` | Company pages |
| `/privacy`, `/terms`, `/security` | Legal / trust pages |

## Content notes

- Blog and news entries are static sample content in their page files.
- The home page product previews are illustrative mock-ups, not screenshots.
