import type { Locale } from "@/lib/i18n";

export type PortfolioYoutube = {
  id: string;
  title: Record<Locale, string>;
  caption?: Record<Locale, string>;
};

export type PortfolioPages = {
  dir: string;
  count: number;
  width: number;
  height: number;
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
  pages?: PortfolioPages;
};

export function getPortfolioPageSrcs(pages: PortfolioPages): string[] {
  return Array.from({ length: pages.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${pages.dir}/page-${n}.jpg`;
  });
}

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "showreel-23",
    title: {
      en: "Showreel 23",
      by: "Showreel 23",
    },
    cover: "/work/showreel-23/cover.jpg",
    description: {
      en: "Motion design showreel from 2023 — selected commercial and personal work.",
      by: "Моўшн-дызайн шоўрыл 2023 — абраныя камерцыйныя і асабістыя работы.",
    },
    youtube: {
      id: "61ppqJvsWR8",
      title: {
        en: "Showreel 23",
        by: "Showreel 23",
      },
    },
  },
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
    slug: "ptchr",
    title: {
      en: "PTCHR pitch deck",
      by: "Пітчдэк PTCHR",
    },
    cover: "/work/ptchr/page-01.jpg",
    description: {
      en: "Investor pitch for PTCHR — crowd-promotion ads for micro-businesses, driven by nano-influencers in their own customer community. Brand, mobile UI, and a 10-slide deck from concept through pre-seed.",
      by: "Інвестарскі пітч PTCHR — crowd-promotion рэклама для мікрабізнесу праз нанаінфлюэнсераў з уласнай супольнасці кліентаў. Брэнд, мабільны UI і 10 слайдаў ад канцэпту да pre-seed.",
    },
    pages: {
      dir: "/work/ptchr",
      count: 10,
      width: 1920,
      height: 1080,
    },
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
