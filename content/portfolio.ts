import type { Locale } from "@/lib/i18n";

export type PortfolioShot = {
  slug: string;
  title: Record<Locale, string>;
  cover?: string;
  href?: string;
  caseStudySlug?: string;
};

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "game-thumbnails",
    title: {
      en: "Game Thumbnails generation",
      by: "Генерацыя прэв'ю гульняў",
    },
    caseStudySlug: "game-thumbnails",
  },
  {
    slug: "icons-pack",
    title: {
      en: "Icons pack",
      by: "Пакет іконак",
    },
    caseStudySlug: "icons-pack",
  },
  {
    slug: "chameleon-illustrations",
    title: {
      en: "Chameleon Illustrations",
      by: "Ілюстрацыі Chameleon",
    },
    caseStudySlug: "chameleon-illustrations",
  },
  {
    slug: "pitchdeck-app-design",
    title: {
      en: "Pitchdeck + App Design",
      by: "Пітчдэк + дызайн дадатка",
    },
    caseStudySlug: "pitchdeck-app-design",
  },
  {
    slug: "brandbook",
    title: {
      en: "Brandbook",
      by: "Брэндбук",
    },
    caseStudySlug: "brandbook",
  },
];

export function getPortfolioHref(
  shot: PortfolioShot,
  locale: Locale,
): string | undefined {
  if (shot.href) return shot.href;
  if (shot.caseStudySlug) return `/${locale}/work/${shot.caseStudySlug}`;
  return undefined;
}
