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

export type PortfolioThumbnailKind = "image" | "gallery" | "video";

export function isAnimatedCover(shot: PortfolioShot): boolean {
  return Boolean(shot.cover?.toLowerCase().endsWith(".gif"));
}

export function getPortfolioThumbnailKind(
  shot: PortfolioShot,
): PortfolioThumbnailKind {
  if (shot.youtube) return "video";
  if (isAnimatedCover(shot)) return "image";
  if (shot.pages && getPortfolioPageSrcs(shot.pages).length > 1) {
    return "gallery";
  }
  return "image";
}

export const portfolioShots: PortfolioShot[] = [
  {
    slug: "brandbook",
    title: {
      en: "Hiveon brand book",
      by: "Брэндбук Hiveon",
    },
    cover: "/work/brandbook/page-01.jpg",
    description: {
      en: "13-slide Hiveon identity — name (hive + switch on), mission, values, and audience across mining / Web3 / energy, then the H mark, product logo family, Gilroy type, and the orange–amber–yellow palette.",
      by: "13 слайдаў ідэнтычнасці Hiveon — назва (hive + switch on), місія, каштоўнасці і аўдыторыя mining / Web3 / energy, потым знак H, сямейства лагатыпаў прадуктаў, шрыфт Gilroy і палітра orange–amber–yellow.",
    },
    pages: {
      dir: "/work/brandbook",
      count: 13,
      width: 1920,
      height: 1080,
    },
  },
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
    slug: "paliavnichy",
    title: {
      en: "Paliaŭničy",
      by: "Паляўнічы",
    },
    cover: "/work/paliavnichy/cover.jpg",
    description: {
      en: "Animation for Wonder Spak's music video Paliaŭničy (The Hunter) — a postcard from Mahilioǔ and other places close to home, for those here and those afar.",
      by: "Анімацыя да кліпа Wonder Spak «Паляўнічы» — паштоўка з Магілёва і іншых блізкіх сэрцу мясцін, для тых, хто тут, і для тых, хто там.",
    },
    youtube: {
      id: "FzuAH3P5Hzo",
      title: {
        en: "Paliaŭničy — Wonder Spak",
        by: "Паляўнічы — Wonder Spak",
      },
      caption: {
        en: "Music video animation — Wonder Spak, filmed in Mahilioǔ.",
        by: "Анімацыя музычнага кліпа — Wonder Spak, знятага ў Магілёве.",
      },
    },
  },
  {
    slug: "papermotion",
    title: {
      en: "Papermotion",
      by: "Papermotion",
    },
    cover: "/work/papermotion/cover.gif",
    description: {
      en: "Photoshop script for paper animation with a barrier-grid (moiré) overlay — one layer per frame, then print the interleaved portrait and slide copier film over it. Freebie, 2014.",
      by: "Скрыпт Photoshop для папяровай анімацыі з бар'ернай сеткай (муар) — адзін слой на кадр, потым друк пераплеценага партрэта і ссоўванне плёнкі паверх. Freebie, 2014.",
    },
    pages: {
      dir: "/work/papermotion",
      count: 3,
      width: 1400,
      height: 1400,
      files: ["face.png", "frames.png", "diagram.png"],
    },
    links: [
      {
        href: "https://www.behance.net/gallery/16553529/Papermotion-(Freebie)/modules/112860317",
        label: {
          en: "View on Behance",
          by: "Адкрыць на Behance",
        },
      },
      {
        href: "https://github.com/colorage/photoshop_scripts/blob/master/paper_animator.jsx",
        label: {
          en: "Photoshop script",
          by: "Скрыпт Photoshop",
        },
      },
    ],
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
    slug: "city-hall",
    title: {
      en: "City Hall",
      by: "Ратуша",
    },
    cover: "/work/city-hall/cover.png",
    description: {
      en: "Die-cut sticker of Mahilioǔ City Hall — the demolished town hall as a mark of freedom and independence.",
      by: "Высечаны стыкер магілёўскай ратушы — знесеная ратуша як знак свабоды і незалежнасці.",
    },
    dribbbleUrl: "https://dribbble.com/shots/2504124-City-Hall",
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
    slug: "mahilyow750",
    title: {
      en: "Mahilyow 750",
      by: "Магілёў 750",
    },
    cover: "/work/mahilyow750/page-01.jpg",
    description: {
      en: "Identity proposal for Mahilyow's 750th anniversary contest in 2017 — a lion of concentric arcs in the Dnieper / crest blue, the river's current in the pattern. Name and year lock as one mark: #МОГИЛЁВ750.",
      by: "Прапанова ідэнтычнасці на конкурс да 750-годдзя Магілёва ў 2017 — леў з канцэнтрычных дуг у сінім Дняпра / герба, узор як цячэнне ракі. Назва і юбілей злітыя ў адзін знак: #МОГИЛЁВ750.",
    },
    pages: {
      dir: "/work/mahilyow750",
      count: 4,
      width: 1600,
      height: 1200,
    },
    links: [
      {
        href: "https://www.behance.net/gallery/47193905/mogilev750",
        label: {
          en: "View on Behance",
          by: "Адкрыць на Behance",
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
];

export function getPortfolioShot(slug: string): PortfolioShot | undefined {
  return portfolioShots.find((shot) => shot.slug === slug);
}

export function isStandaloneShot(shot: PortfolioShot): boolean {
  return !shot.href;
}

export function getPortfolioHref(shot: PortfolioShot, locale: Locale): string {
  return shot.href ?? `/${locale}/work/${shot.slug}`;
}
