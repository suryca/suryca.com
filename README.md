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
`wrangler.jsonc`; the from-address must be on a domain verified in Resend.

To deploy from your machine instead: `npx wrangler login` once, then `npm run deploy`.

## Layout

```
app/                  Routes (App Router). One folder per page, page.tsx inside.
app/api/contact/      POST handler for the contact form (Resend via fetch, honeypot check).
components/           Shared UI: Nav, Footer, PageShell, ProductPage, FeatureGrid, …
components/previews/  Illustrative product mock-ups shown on the home page.
lib/site.ts           Single source of truth for brand, products, nav, footer and contact data.
design/               Original design mockups (reference only, not part of the build).
wrangler.jsonc        Cloudflare Worker config.  open-next.config.ts: OpenNext adapter config.
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
