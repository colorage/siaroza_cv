import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { getAllPortfolio } from "@/content/portfolio";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    title: dict.portfolio.archiveTitle,
    description: dict.portfolio.archiveDescription,
    path: "/work",
  });
}

export default async function WorkIndexPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <PortfolioGrid
      locale={locale}
      dict={dict}
      shots={getAllPortfolio()}
      heading={dict.portfolio.archiveTitle}
      headingAs="h1"
    />
  );
}
