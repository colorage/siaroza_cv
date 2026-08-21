import type { Locale } from "@/lib/i18n";

export type ExperienceItem = {
  id: string;
  start: string;
  end: string;
  company: string;
  role: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  caseStudySlugs?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "spribe",
    start: "Apr 2024",
    end: "Now",
    company: "SPRIBE",
    role: {
      en: "Lead Graphic Design, Design Engineer",
      by: "Lead Graphic Design, Design Engineer",
    },
    bullets: {
      en: [
        "Designed visual assets for product platform, including icons, illustrations and UI animations",
        "Automated image editing workflows using Python and AI tools",
        "Developed custom Figma plugins to streamline internal design processes",
        "Optimized design workflows and introduced scalable systems for efficiency",
        "Redesigned game interfaces for improved UX and visual appeal",
        "Designed and maintained product website ensuring consistency with brand and platform UI",
      ],
      by: [
        "Дызайн візуальных асетаў для прадуктовай платформы: іконкі, ілюстрацыі, UI-анімацыі",
        "Аўтаматызацыя рэдагавання выяў з дапамогай Python і AI-інструментаў",
        "Распрацоўка ўласных Figma-плагінаў для ўнутраных працэсаў",
        "Аптымізацыя дызайн-працэсаў і ўкараненне маштабуемых сістэм",
        "Рэдызайн гульнявых інтэрфейсаў для лепшага UX і візуалу",
        "Дызайн і падтрымка прадуктовага сайта ў адпаведнасці з брэндам і UI платформы",
      ],
    },
    caseStudySlugs: [
      "game-thumbnails",
      "icons-pack",
      "chameleon-illustrations",
      "site-customization-dashboard",
      "local-llm-qa-agents",
    ],
  },
  {
    id: "ptchr",
    start: "May 2023",
    end: "Feb 2024",
    company: "PTCHR",
    role: {
      en: "Co-Founder, Product Designer",
      by: "Сузаснавальнік, Product Designer",
    },
    bullets: {
      en: [
        "Designed UX and UI for a mobile app from early concept to MVP",
        "Contributed to POC development, aligning design with product goals and technical feasibility",
        "Created pitch decks to support investor presentations",
        "Developed initial brand identity to establish a strong and cohesive visual foundation",
      ],
      by: [
        "UX/UI дызайн мабільнага дадатка ад канцэпту да MVP",
        "Удзел у POC: узгадненне дызайну з мэтамі прадукту і тэхнічнай рэалізуемасцю",
        "Пітч-дэкі для прэзентацый інвестарам",
        "Пачатковая брэндавая ідэнтычнасць як візуальная аснова",
      ],
    },
  },
  {
    id: "kotka",
    start: "May 2023",
    end: "Dec 2023",
    company: "KOTKA Audio",
    role: {
      en: "Game & Visual Designer",
      by: "Game & Visual Designer",
    },
    bullets: {
      en: [
        "Developed hobby game projects from concept to release — game design, visuals, music and FX sound",
        "Experimented with mechanics, art direction, and creative storytelling in an indie setting",
      ],
      by: [
        "Хобі-гульні ад канцэпту да рэлізу — геймдызайн, візуал, музыка і FX",
        "Эксперыменты з механікай, арт-дырэкшнам і сторытэлінгам у індзі-фармаце",
      ],
    },
  },
  {
    id: "hiveon",
    start: "2021",
    end: "May 2023",
    company: "Hiveon",
    role: {
      en: "Lead Visual & Motion Designer",
      by: "Lead Visual & Motion Designer",
    },
    bullets: {
      en: [
        "Led a team of designers, overseeing brand consistency and creative direction",
        "Developed brand identity assets, including logotypes and cohesive product family visuals",
        "Designed product websites with focus on clarity, UX, and visual consistency",
        "Produced 2D/3D explainer videos and tutorials to communicate complex ideas clearly",
        "Created marketing visuals for social media and global print materials for tech exhibitions",
      ],
      by: [
        "Кіраванне камандай дызайнераў, брэндавая кансістэнтнасць і крэатыўны дырэкшн",
        "Брэндавыя ассеты: лагатыпы і візуал лінейкі прадуктаў",
        "Дызайн прадуктовых сайтаў з фокусам на яснасць, UX і кансістэнтнасць",
        "2D/3D эксплейнеры і туторыялы для складаных ідэй",
        "Маркетынгавая графіка для сацсетак і друк для тэхвыстаў",
      ],
    },
    caseStudySlugs: ["brandbook"],
  },
  {
    id: "adviqo",
    start: "2017",
    end: "2021",
    company: "Adviqo",
    role: {
      en: "Visual & Motion Designer",
      by: "Visual & Motion Designer",
    },
    bullets: {
      en: [
        "Designed static and animated assets for social media, digital ads, and email campaigns",
        "Created visual content for the website and mobile app, ensuring brand consistency across platforms",
        "Produced explainer videos and handled video editing to support product and marketing initiatives",
      ],
      by: [
        "Статычныя і анімаваныя ассеты для сацсетак, рэкламы і email-кампаній",
        "Візуал для сайта і мабільнага дадатка з кансістэнтнасцю брэнда",
        "Эксплейнеры і відэамантаж для прадукту і маркетынгу",
      ],
    },
  },
  {
    id: "upwork",
    start: "2016",
    end: "2018",
    company: "Upwork",
    role: {
      en: "Freelance Designer",
      by: "Фрыланс-дызайнер",
    },
    bullets: {
      en: [
        "Designed motion banners and explainer animations for web and social media",
        "Edited images and performed high-quality photo retouching for various clients",
        "Created visually engaging presentations tailored to client needs",
      ],
      by: [
        "Моўшн-банеры і эксплейнер-анімацыі для веба і сацсетак",
        "Рэдагаванне і рэтуш фота для кліентаў",
        "Прэзентацыі пад канкрэтныя задачы кліента",
      ],
    },
  },
  {
    id: "colada",
    start: "2016",
    end: "2017",
    company: "colada",
    role: {
      en: "UI & Visual Designer",
      by: "UI & Visual Designer",
    },
    bullets: {
      en: [
        "Led UI redesign and implemented Material Design System for improved usability and visual coherence",
        "Produced print materials supporting marketing and communication efforts",
        "Refined and expanded brand assets to ensure consistency across digital and print channels",
      ],
      by: [
        "Рэдызайн UI і ўкараненне Material Design System",
        "Друкаваныя матэрыялы для маркетынгу і камунікацый",
        "Развіццё брэндавых асетаў для digital і друку",
      ],
    },
  },
  {
    id: "amasty",
    start: "2014",
    end: "2016",
    company: "amasty",
    role: {
      en: "UI & Visual Designer",
      by: "UI & Visual Designer",
    },
    bullets: {
      en: [
        "Designed user interfaces for Magento and Shopify extensions with focus on usability and e-commerce efficiency",
        "Created marketing materials, including ad banners and social media visuals, to support product promotion",
        "Developed responsive website designs, ensuring a consistent brand experience across platforms",
      ],
      by: [
        "UI для пашырэнняў Magento і Shopify з фокусам на usability і e-commerce",
        "Маркетынгавыя матэрыялы: банеры і візуал для сацсетак",
        "Адаптыўны дызайн сайтаў з кансістэнтным брэндам",
      ],
    },
  },
  {
    id: "cybercradle",
    start: "2011",
    end: "2014",
    company: "CyberCradle",
    role: {
      en: "Game Designer & QA",
      by: "Game Designer & QA",
    },
    bullets: {
      en: [
        "Adapted and optimized graphic assets from desktop games for mobile platforms",
        "Automated design-to-engine workflows, reducing manual workload and improving delivery speed",
        "Conducted QA testing of game logic to ensure functionality, consistency, and player experience",
        "Developed Photoshop-to-game engine automation pipelines",
      ],
      by: [
        "Адаптацыя і аптымізацыя графікі з дэсктопных гульняў пад мабільныя платформы",
        "Аўтаматызацыя пайплайнаў design-to-engine",
        "QA тэставанне гульнявой логікі і player experience",
        "Аўтаматызацыя Photoshop → game engine",
      ],
    },
    caseStudySlugs: ["psd-parser"],
  },
];

export function getExperience(id: string): ExperienceItem | undefined {
  return experience.find((item) => item.id === id);
}
