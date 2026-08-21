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
    slug: "ice-sculptor",
    title: {
      en: "Be the Ice Sculptor",
      by: "Будзь ледзяным скульптарам",
    },
    cover: "/work/ice-sculptor/cover.jpg",
    description: {
      en: "Motion film on craft versus tools — the sculptor's concern is not how the chainsaw sparkles, but the form it reveals. The tool is only a gateway; without the craft, it is nothing.",
      by: "Моўшн-фільм пра крафт і інструмент — клопат скульптара не ў бляску бензапілы, а ў форме, якую яна адкрывае. Інструмент — толькі брама; без майстэрства ён нішто.",
    },
    youtube: {
      id: "0FpEAb--kdI",
      title: {
        en: "Be the Ice Sculptor",
        by: "Будзь ледзяным скульптарам",
      },
      caption: {
        en: "Short motion piece on craft, tools, and imagination.",
        by: "Кароткі моўшн пра крафт, інструменты і ўяўленне.",
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
