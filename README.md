# suryca.com

Marketing site for **Suryca Software Inc.**, an independent AI software studio.
Built with Next.js (App Router), React and TypeScript. No UI framework: a small set of
CSS variables and `sy-*` utility classes in `app/globals.css`, plus inline styles.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm start        # serve the production build
```

## Layout

```
app/            Routes (App Router). One folder per page, page.tsx inside.
components/     Shared UI: Nav, Footer, PageShell, ProductPage, FeatureGrid, …
lib/site.ts     Single source of truth for brand, products, nav, footer and contact data.
design/         Original design mockups (reference only, not part of the build).
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, product grid, three product spotlights, values, CTA |
| `/fizgot`, `/exportaichat`, `/agents` | Product pages (share `components/ProductPage.tsx`) |
| `/about`, `/blog`, `/news`, `/contact` | Company pages |
| `/privacy`, `/terms`, `/security` | Legal / trust pages |

## Known placeholders

- Contact form does not submit anywhere yet (`app/contact/ContactForm.tsx`).
- "Sign in" in the nav and "See careers" on the home page both link to `/contact`.
- Product screenshots on the home page are striped placeholders.
- Legal pages carry a "review by counsel" footnote (`components/LegalPage.tsx`).
- Blog and news entries are static sample content.
