/**
 * Single source of truth for site-wide content: brand, products, navigation,
 * footer columns and contact channels. Pages and components import from here
 * so copy and colours are never duplicated.
 */

export const SITE = {
  name: "Suryca",
  legalName: "Suryca Software Inc.",
  url: "https://suryca.com",
  tagline: "An AI software studio",
  description:
    "Suryca designs and ships practical AI software — creative tools, everyday utilities, and autonomous agents. Named for surya, the sun: always on, always shipping.",
  footerBlurb:
    "Suryca Software Inc. An independent AI software studio. Always on, like the sun.",
} as const;

export type ProductStatus = "LIVE" | "BETA";

export type Product = {
  /** Route segment, e.g. "fizgot" → /fizgot */
  slug: string;
  name: string;
  status: ProductStatus;
  /** Gradient used for the product's square brand mark. */
  gradient: string;
  /** Drop shadow used under the brand mark. */
  shadow: string;
  /** Solid accent colour for bullets and status text. */
  accent: string;
  blurb: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "fizgot",
    name: "Fizgot",
    status: "LIVE",
    gradient: "linear-gradient(150deg,#ff8a4c,#e2632a)",
    shadow: "0 8px 18px -6px rgba(226,99,42,0.5)",
    accent: "#e2632a",
    blurb:
      "A playful AI creation tool for makers — turn a quick idea into something shareable in minutes.",
  },
  {
    slug: "exportaichat",
    name: "ExportAIChat",
    status: "LIVE",
    gradient: "linear-gradient(150deg,#f7c85a,#d99211)",
    shadow: "0 8px 18px -6px rgba(217,146,17,0.5)",
    accent: "#d99211",
    blurb:
      "Save, organize and share your AI conversations — clean exports to PDF, Markdown and the web.",
  },
  {
    slug: "agents",
    name: "Suryca Agents",
    status: "BETA",
    gradient: "linear-gradient(150deg,#d96a3f,#b4471f)",
    shadow: "0 8px 18px -6px rgba(180,71,31,0.5)",
    accent: "#b4471f",
    blurb:
      "Autonomous agents that do real work — starting with a financial trading agent that runs around the clock.",
  },
];

export function productHref(p: Product): string {
  return `/${p.slug}`;
}

export function getProduct(slug: string): Product {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product slug: ${slug}`);
  return p;
}

export const STATUS_STYLE: Record<
  ProductStatus,
  { label: string; color: string; background: string }
> = {
  LIVE: { label: "Live", color: "#2e7d4f", background: "rgba(46,125,79,0.1)" },
  BETA: { label: "Beta", color: "#b4471f", background: "rgba(180,71,31,0.1)" },
};

/** "How we build" / company values. Shared by the home and about pages. */
export const VALUES = [
  {
    title: "AI-native",
    body: "Every product is built around what AI does well today — not bolted on as an afterthought.",
  },
  {
    title: "Human-centered",
    body: "Powerful underneath, simple on the surface. Software should feel calm, not clever.",
  },
  {
    title: "Independent & fast",
    body: "No committees. Ideas ship in days, and the people who build also decide.",
  },
];

export type NavKey = "products" | "blog" | "news" | "contact";

export const NAV_LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "products", label: "Products", href: "/#products" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "news", label: "News", href: "/news" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: PRODUCTS.map((p) => ({ label: p.name, href: productHref(p) })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export const CONTACT_CHANNELS = [
  { label: "General", value: "hello@suryca.com" },
  { label: "Careers", value: "join@suryca.com" },
  { label: "Security", value: "security@suryca.com" },
];
