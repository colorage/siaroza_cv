import type { Locale } from "@/lib/i18n";

export type PortfolioSlide = {
  src: string;
  width: number;
  height: number;
  title: Record<Locale, string>;
  alt: Record<Locale, string>;
  dribbbleUrl: string;
};

export type PortfolioShot = {
  slug: string;
  title: Record<Locale, string>;
  cover?: string;
  href?: string;
  caseStudySlug?: string;
  description?: Record<Locale, string>;
  dribbbleUrl?: string;
  slides?: PortfolioSlide[];
};

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "lstr",
    title: {
      en: "LSTR",
      by: "LSTR",
    },
    cover: "/work/lstr/mahilyow-x-lstr.png",
    description: {
      en: "Prints for LSTR streetwear — a Mahilyow city t-shirt with the Rodina cinema, drama theatre, and 1267 mark, plus a Greetings from Belarus postcard of landmarks, bogs, forests, and krambambula.",
      by: "Прынты для стрытвіру LSTR — магілёўская цішотка з кінатэатрам «Радзіма», драмтэатрам і адзнакай 1267, плюс паштоўка Greetings from Belarus са славутасцямі, балотамі, лясамі і крамбамбуляй.",
    },
    dribbbleUrl: "https://dribbble.com/shots/3360732-Mahilyow-x-LSTR",
    slides: [
      {
        src: "/work/lstr/mahilyow-x-lstr.png",
        width: 800,
        height: 600,
        title: {
          en: "Mahilyow × LSTR",
          by: "Mahilyow × LSTR",
        },
        alt: {
          en: "Mahilyow skyline print for LSTR — red-and-black line art of the city, with Rodina cinema reflected in the river.",
          by: "Прынт магілёўскага сілуэта для LSTR — чырвона-чорны лінейны малюнак горада з кінатэатрам «Радзіма» ў адбітку ракі.",
        },
        dribbbleUrl: "https://dribbble.com/shots/3360732-Mahilyow-x-LSTR",
      },
      {
        src: "/work/lstr/lstr-shirt.png",
        width: 800,
        height: 600,
        title: {
          en: "LSTR Shirt",
          by: "Цішотка LSTR",
        },
        alt: {
          en: "Black LSTR t-shirt with the Mahilyow print, MAGILIOU in red, and 1267 in white.",
          by: "Чорная цішотка LSTR з магілёўскім прынтам, чырвоным «МАГІЛЁЎ» і белым 1267.",
        },
        dribbbleUrl: "https://dribbble.com/shots/3374608-LSTR-Shirt",
      },
      {
        src: "/work/lstr/belarus-postcard.png",
        width: 800,
        height: 600,
        title: {
          en: "Belarus postcard",
          by: "Паштоўка Беларусь",
        },
        alt: {
          en: "Greetings from Belarus postcard — 3D BELARUS letters filled with landmarks, captioned bogs, forests, krambambula.",
          by: "Паштоўка Greetings from Belarus — 3D літары BELARUS са славутасцямі і подпісам bogs, forests, krambambula.",
        },
        dribbbleUrl: "https://dribbble.com/shots/3531945-Belarus-postcard",
      },
    ],
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
