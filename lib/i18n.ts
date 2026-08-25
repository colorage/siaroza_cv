export const locales = ["en", "by"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function htmlLang(locale: Locale): "en" | "be" {
  return locale === "by" ? "be" : "en";
}

export function localePath(locale: Locale, path = ""): string {
  if (!path || path === "/") return `/${locale}`;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  return {
    en: localePath("en", path),
    be: localePath("by", path),
    "x-default": localePath(defaultLocale, path),
  };
}

export function swapLocalePath(pathname: string, from: Locale, to: Locale): string {
  const prefix = `/${from}`;
  if (pathname === prefix) return `/${to}`;
  if (pathname.startsWith(`${prefix}/`)) {
    return `/${to}${pathname.slice(prefix.length)}`;
  }
  return `/${to}`;
}

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    experience: string;
    portfolio: string;
    caseStudies: string;
    projects: string;
  };
  a11y: {
    skipToContent: string;
  };
  hero: {
    name: string;
    shortName: string;
    title: string;
    tagline: string;
    email: string;
    telegram: string;
    linkedin: string;
  };
  experience: {
    heading: string;
    downloadCv: string;
    caseStudies: string;
    caseStudyBack: string;
    caseStudyContext: string;
    caseStudyProcess: string;
    caseStudySolution: string;
    caseStudyImpact: string;
    caseStudyRelated: string;
  };
  portfolio: {
    heading: string;
    back: string;
    viewOnDribbble: string;
    viewOnYouTube: string;
    slide: string;
    goToImage: string;
  };
  caseStudies: {
    heading: string;
    back: string;
    context: string;
    effort: string;
    constraints: string;
    hard: string;
    process: string;
    solution: string;
    impact: string;
    related: string;
  };
  footer: {
    contact: string;
  };
  projects: {
    heading: string;
    active: string;
    stage: Record<string, string>;
    status: Record<string, string>;
    back: string;
    visit: string;
    gallery: string;
    instagram: string;
    telegram: string;
    dribbble: string;
    ndaNote: string;
    ndaPrivateTitle: string;
  };
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "by") {
    return (await import("@/messages/by.json")).default as Dictionary;
  }
  return (await import("@/messages/en.json")).default as Dictionary;
}
