import type { Locale } from "@/lib/i18n";

export type PortfolioYoutube = {
  id: string;
  title: Record<Locale, string>;
  caption?: Record<Locale, string>;
};

export type PortfolioShot = {
  slug: string;
  title: Record<Locale, string>;
  cover?: string;
  href?: string;
  caseStudySlug?: string;
  description?: Record<Locale, string>;
  dribbbleUrl?: string;
  youtube?: PortfolioYoutube;
};

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "splash-of-cash",
    title: {
      en: "Splash of Cash",
      by: "Splash of Cash",
    },
    cover: "/work/splash-of-cash/cover.jpg",
    description: {
      en: "Casual game motion demo — bubble clusters, cash HUD, and 3D gift drops in a tiled bathroom world.",
      by: "Моўшн-дэма казуальнай гульні — кластары бурбалак, кэш-HUD і 3D-падарункі ў пліткавай ваннай.",
    },
    youtube: {
      id: "_1lUgXSyUwo",
      title: {
        en: "Splash of Cash — demo by Sergey Pekhteerau",
        by: "Splash of Cash — дэма Сяргея Пехцерава",
      },
    },
  },
  {
    slug: "radzima",
    title: {
      en: "RADZIMA font",
      by: "Шрыфт Радзіма",
    },
    cover: "/work/radzima/cover.png",
    description: {
      en: "Latin and Cyrillic typeface drawn from a cinema title in Mahilioǔ. Heavy geometric display forms with tight counters, including Belarusian І and Ў.",
      by: "Лацінскі і кірылічны шрыфт, намаляваны з кінатытра ў Магілёве. Цяжкія геаметрычныя дысплейныя формы з вузкімі контрформамі, у тым ліку беларускія І і Ў.",
    },
    dribbbleUrl: "https://dribbble.com/shots/16330099-RADZIMA-font",
  },
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

export function getPortfolioShot(slug: string): PortfolioShot | undefined {
  return portfolioShots.find((shot) => shot.slug === slug);
}

export function isStandaloneShot(shot: PortfolioShot): boolean {
  return !shot.caseStudySlug && !shot.href;
}

export function getPortfolioHref(
  shot: PortfolioShot,
  locale: Locale,
): string | undefined {
  if (shot.href) return shot.href;
  if (shot.caseStudySlug) return `/${locale}/work/${shot.caseStudySlug}`;
  if (isStandaloneShot(shot)) return `/${locale}/work/${shot.slug}`;
  return undefined;
}
