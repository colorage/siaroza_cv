import type { Metadata } from "next";
import {
  languageAlternates,
  locales,
  localePath,
  type Locale,
} from "@/lib/i18n";

export function pageMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: Locale;
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const canonical = localePath(locale, path);
  const openGraphLocale = locale === "by" ? "be_BY" : "en_US";
  const alternateLocale = locales
    .filter((item) => item !== locale)
    .map((item) => (item === "by" ? "be_BY" : "en_US"));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Siaroža",
      locale: openGraphLocale,
      alternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
