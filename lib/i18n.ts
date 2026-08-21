export const locales = ["en", "by"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
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
  };
  portfolio: {
    heading: string;
  };
  caseStudies: {
    heading: string;
    back: string;
    context: string;
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
    ndaNote: string;
    ndaPrivateTitle: string;
    placeholder: string;
  };
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "by") {
    return (await import("@/messages/by.json")).default as Dictionary;
  }
  return (await import("@/messages/en.json")).default as Dictionary;
}
