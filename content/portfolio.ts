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
  files?: string[];
};

export type PortfolioLink = {
  href: string;
  label: Record<Locale, string>;
};

export type PortfolioShot = {
  slug: string;
  title: Record<Locale, string>;
  cover?: string;
  href?: string;
  caseStudySlug?: string;
  description?: Record<Locale, string>;
  dribbbleUrl?: string;
  links?: PortfolioLink[];
  youtube?: PortfolioYoutube;
  pages?: PortfolioPages;
};

export function getPortfolioPageSrcs(pages: PortfolioPages): string[] {
  if (pages.files?.length) {
    return pages.files.map((file) => `${pages.dir}/${file}`);
  }
  return Array.from({ length: pages.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${pages.dir}/page-${n}.jpg`;
  });
}

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "hive-os",
    title: {
      en: "Hive OS tutorial covers",
      by: "Вокладкі туторыялаў Hive OS",
    },
    cover: "/work/hive-os/page-01.jpg",
    description: {
      en: "Title cards for Hive OS how-to videos — multi-user farm access, ASIC firmware, GPU Hub, and a local package mirror. 3D product shots in the Hiveon orange system.",
      by: "Тытульныя карткі для туторыялаў Hive OS — шматкарыстальніцкі доступ да фермы, прашыўка ASIC, GPU Hub і лакальнае люстэрка пакетаў. 3D-прадуктовыя кадры ў аранжавай сістэме Hiveon.",
    },
    pages: {
      dir: "/work/hive-os",
      count: 4,
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "ui-test",
    title: {
      en: "UI test",
      by: "UI-тэст",
    },
    cover: "/work/ui-test/cover.jpg",
    description: {
      en: "Motion test of a console shop screen — pack tabs, 3D item cards with sale prices, and a hold-to-buy CTA.",
      by: "Моўшн-тэст экрана крамы для кансолі — табы пакаў, 3D-карткі прадметаў са зніжкамі і кнопка «удрымай, каб купіць».",
    },
    youtube: {
      id: "WB-v16caDZQ",
      title: {
        en: "UI test",
        by: "UI-тэст",
      },
      caption: {
        en: "Shop UI motion — grid, 3D preview, controller prompts.",
        by: "Моўшн UI крамы — сетка, 3D-перагляд, падказкі кантролера.",
      },
    },
  },
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
    pages: {
      dir: "/work/lstr",
      count: 3,
      width: 800,
      height: 600,
      files: [
        "mahilyow-x-lstr.png",
        "lstr-shirt.png",
        "belarus-postcard.png",
      ],
    },
    links: [
      {
        href: "https://dribbble.com/shots/3360732-Mahilyow-x-LSTR",
        label: {
          en: "Mahilyow × LSTR",
          by: "Mahilyow × LSTR",
        },
      },
      {
        href: "https://dribbble.com/shots/3374608-LSTR-Shirt",
        label: {
          en: "LSTR Shirt",
          by: "Цішотка LSTR",
        },
      },
      {
        href: "https://dribbble.com/shots/3531945-Belarus-postcard",
        label: {
          en: "Belarus postcard",
          by: "Паштоўка Беларусь",
        },
      },
    ],
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
