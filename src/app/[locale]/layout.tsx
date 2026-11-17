import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewRibbon } from "@/components/layout/PreviewRibbon";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { TopBar } from "@/components/layout/TopBar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

// Placeholder data must never reach production by accident. Going live as a design
// preview is an explicit choice: set ALLOW_PLACEHOLDER_PRODUCTION=1 on the Vercel project
// (and remove it once src/config/site.ts holds real data and isPlaceholder is false).
if (
  site.isPlaceholder &&
  process.env.VERCEL_ENV === "production" &&
  process.env.ALLOW_PLACEHOLDER_PRODUCTION !== "1"
) {
  throw new Error(
    "Refusing a production build with placeholder company data (src/config/site.ts). " +
      "Set ALLOW_PLACEHOLDER_PRODUCTION=1 to publish it as a design preview.",
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0f1e3d" };

export async function generateMetadata(): Promise<Metadata> {
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.homeTitle, template: d.meta.titleTemplate },
    description: d.meta.description,
    openGraph: { siteName: d.meta.siteName, locale: locale === "bn" ? "bn_BD" : "en_BD", type: "website" },
    // Keep the design preview out of search engines until real data is in.
    robots: site.isPlaceholder ? { index: false, follow: false } : undefined,
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <html lang={locale} className={`${inter.variable} ${hind.variable}`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-gold-500 px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {d.a11y.skip}
        </a>
        {site.isPlaceholder && <PreviewRibbon text={d.preview.ribbon} />}
        <TopBar locale={locale} d={d} />
        <Header locale={locale} d={d} />
        <main id="main">{children}</main>
        <Footer locale={locale} d={d} />
        <StickyActionBar locale={locale} d={d} />
      </body>
    </html>
  );
}
