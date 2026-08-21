import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/ContactActions";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getDictionary,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(getSiteUrl()),
    ...pageMetadata({
      locale,
      title: dict.meta.title,
      description: dict.meta.description,
    }),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={htmlLang(locale)}
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-button focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-button-fg"
        >
          {dict.a11y.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl tracking-tight text-foreground md:text-4xl">
              {dict.footer.contact}
            </h2>
            <div className="mt-8">
              <ContactActions dict={dict} />
            </div>
            <p className="mt-10 text-[13px] text-muted">
              © {new Date().getFullYear()} {dict.hero.shortName}
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
