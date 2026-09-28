import type { Metadata } from "next";
import {
  languageAlternates,
  locales,
  localePath,
  type Locale,
} from "@/lib/i18n";

function toOgLocale(item: Locale): string {
  if (item === "by") return "be_BY";
  if (item === "pl") return "pl_PL";
  return "en_US";
}

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
  const openGraphLocale = toOgLocale(locale);
  const alternateLocale = locales
    .filter((item) => item !== locale)
    .map(toOgLocale);

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
