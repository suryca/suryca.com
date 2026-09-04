/**
 * Single source of truth for site-wide structure: brand, products, navigation,
 * footer columns and contact channels. Translatable copy lives in
 * messages/<locale>.json; this file holds routes, keys, colours and emails.
 */

export const SITE = {
  name: "Suryca",
  legalName: "Suryca Software Inc.",
  url: "https://suryca.com",
} as const;

export type ProductStatus = "LIVE" | "BETA";

export type ProductSlug = "fizgot" | "exportaichat" | "agents";

export type Product = {
  /** Route segment and message key, e.g. "fizgot" → /fizgot, Products.fizgot.* */
  slug: ProductSlug;
  /** Brand name, not translated. */
  name: string;
  status: ProductStatus;
  /** Gradient used for the product's square brand mark. */
  gradient: string;
  /** Drop shadow used under the brand mark. */
  shadow: string;
  /** Solid accent colour for bullets and status text. */
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "fizgot",
    name: "Fizgot",
    status: "LIVE",
    gradient: "linear-gradient(150deg,#ff8a4c,#e2632a)",
    shadow: "0 8px 18px -6px rgba(226,99,42,0.5)",
    accent: "#e2632a",
  },
  {
    slug: "exportaichat",
    name: "ExportAIChat",
    status: "LIVE",
    gradient: "linear-gradient(150deg,#f7c85a,#d99211)",
    shadow: "0 8px 18px -6px rgba(217,146,17,0.5)",
    accent: "#d99211",
  },
  {
    slug: "agents",
    name: "Suryca Agents",
    status: "BETA",
    gradient: "linear-gradient(150deg,#d96a3f,#b4471f)",
    shadow: "0 8px 18px -6px rgba(180,71,31,0.5)",
    accent: "#b4471f",
  },
];

export function productHref(p: Product): string {
  return `/${p.slug}`;
}

export function getProduct(slug: ProductSlug): Product {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product slug: ${slug}`);
  return p;
}

/** Status colours. Labels come from the Status.* messages. */
export const STATUS_STYLE: Record<ProductStatus, { color: string; background: string }> = {
  LIVE: { color: "#2e7d4f", background: "rgba(46,125,79,0.1)" },
  BETA: { color: "#b4471f", background: "rgba(180,71,31,0.1)" },
};

/** Company values ("How we build"). Message keys under Values.*; shared by home, about and careers. */
export const VALUE_KEYS = ["aiNative", "humanCentered", "independent"] as const;

export type NavKey = "products" | "blog" | "news" | "contact";

/** Top navigation. Labels come from the Nav.* messages. */
export const NAV_LINKS: { key: NavKey; href: { pathname: string; hash?: string } }[] = [
  { key: "products", href: { pathname: "/", hash: "products" } },
  { key: "blog", href: { pathname: "/blog" } },
  { key: "news", href: { pathname: "/news" } },
  { key: "contact", href: { pathname: "/contact" } },
];

export type FooterLinkKey =
  | "about"
  | "blog"
  | "news"
  | "careers"
  | "contact"
  | "privacy"
  | "terms"
  | "security";

/** Footer columns. `title` and link `key`s are Footer.* message keys; product links use the brand name. */
export const FOOTER_COLUMNS: {
  title: "products" | "company" | "legal";
  links: ({ key: FooterLinkKey; href: string } | { product: Product })[];
}[] = [
  { title: "products", links: PRODUCTS.map((product) => ({ product })) },
  {
    title: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "blog", href: "/blog" },
      { key: "news", href: "/news" },
      { key: "careers", href: "/careers" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    title: "legal",
    links: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
      { key: "security", href: "/security" },
    ],
  },
];

/** Contact mailboxes. `key` is a Contact.channels.* message key. */
export const CONTACT_CHANNELS = [
  { key: "general", value: "hello@suryca.com" },
  { key: "careers", value: "join@suryca.com" },
  { key: "security", value: "security@suryca.com" },
] as const;

/**
 * Options for the "What's this about?" select on the contact form. These are the
 * submitted values (and the email subject); display labels are ContactForm.topics.*.
 */
export const CONTACT_TOPICS = ["Product", "Partnership", "Careers", "Press", "Other"] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
