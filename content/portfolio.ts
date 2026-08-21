import type { Locale } from "@/lib/i18n";

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
