import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Space_Grotesk,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { routing, OG_LOCALE, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

// Fallback for Devanagari glyphs (Hindi). Not preloaded: the @font-face is
// scoped to the Devanagari unicode range, so browsers fetch it only on pages
// that actually render Hindi text.
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("siteTitle"),
      template: `%s — ${SITE.name}`,
    },
    description: t("siteDescription"),
    openGraph: {
      siteName: SITE.name,
      type: "website",
      locale: OG_LOCALE[locale as Locale] ?? OG_LOCALE[routing.defaultLocale],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Client components only need these namespaces; the rest is rendered on the
  // server and never serialised into the page.
  const messages = await getMessages();
  const clientMessages = { ContactForm: messages.ContactForm, Language: messages.Language };

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${notoDevanagari.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={clientMessages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
