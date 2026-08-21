import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioPiece } from "@/components/PortfolioPiece";
import {
  getPortfolioShot,
  isStandaloneShot,
  portfolioShots,
} from "@/content/portfolio";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function workSlugs(): string[] {
  return portfolioShots.filter(isStandaloneShot).map((shot) => shot.slug);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    workSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const shot = getPortfolioShot(slug);
  if (shot && isStandaloneShot(shot)) {
    return {
      title: shot.title[locale],
      description: shot.description?.[locale],
    };
  }
  return {};
}

export default async function WorkPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  const shot = getPortfolioShot(slug);
  if (!shot || !isStandaloneShot(shot)) notFound();

  return <PortfolioPiece shot={shot} locale={locale} dict={dict} />;
}
