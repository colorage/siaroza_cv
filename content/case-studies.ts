import { experience } from "@/content/experience";
import type { Locale } from "@/lib/i18n";

export type CaseStudy = {
  slug: string;
  experienceId: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "game-thumbnails",
    experienceId: "spribe",
    title: {
      en: "Game Thumbnails generation",
      by: "Генерацыя прэв'ю гульняў",
    },
    summary: {
      en: "Automated generation of game thumbnails with Python and AI image-editing workflows — scaling asset production for the product platform.",
      by: "Аўтаматычная генерацыя прэв'ю гульняў з дапамогай Python і AI-рэдагавання выяў — маштабаванне вытворчасці асетаў для прадуктовай платформы.",
    },
  },
  {
    slug: "icons-pack",
    experienceId: "spribe",
    title: {
      en: "Icons pack",
      by: "Пакет іконак",
    },
    summary: {
      en: "Icon system for the product platform, designed as a cohesive pack for product UI and related surfaces.",
      by: "Сістэма іконак для прадуктовай платформы — цэльны пакет для UI прадукту і сумежных паверхняў.",
    },
  },
  {
    slug: "chameleon-illustrations",
    experienceId: "spribe",
    title: {
      en: "Chameleon Illustrations",
      by: "Ілюстрацыі Chameleon",
    },
    summary: {
      en: "Illustration set for the Chameleon product line, aligned with platform visual language and brand.",
      by: "Набор ілюстрацый для лінейкі Chameleon, узгоднены з візуальнай мовай платформы і брэндам.",
    },
  },
  {
    slug: "site-customization-dashboard",
    experienceId: "spribe",
    title: {
      en: "Site customization dashboard",
      by: "Дашборд кастамізацыі сайта",
    },
    summary: {
      en: "Dashboard for customizing the product website, keeping brand and platform UI consistent while giving operators control over site presentation.",
      by: "Дашборд кастамізацыі прадуктовага сайта — кансістэнтнасць брэнда і UI платформы пры кіраванні выглядам сайта.",
    },
  },
  {
    slug: "local-llm-qa-agents",
    experienceId: "spribe",
    title: {
      en: "Local LLM QA agents",
      by: "Лакальныя LLM QA-агенты",
    },
    summary: {
      en: "Internal QA agents running on a local LLM to support design and product review without sending work to external services.",
      by: "Унутраныя QA-агенты на лакальным LLM для праверкі дызайну і прадукту без адпраўкі працы ў вонкавыя сэрвісы.",
    },
  },
  {
    slug: "pitchdeck-app-design",
    experienceId: "ptchr",
    title: {
      en: "Pitchdeck + App Design",
      by: "Пітчдэк + дызайн дадатка",
    },
    summary: {
      en: "Pitch decks for investor presentations and UX/UI for the mobile app from early concept through MVP, with brand identity as the visual foundation.",
      by: "Пітч-дэкі для інвестараў і UX/UI мабільнага дадатка ад канцэпту да MVP, з брэндавай ідэнтычнасцю як візуальнай асновай.",
    },
  },
  {
    slug: "brandbook",
    experienceId: "hiveon",
    title: {
      en: "Brandbook",
      by: "Брэндбук",
    },
    summary: {
      en: "Brand identity system for Hiveon — logotypes, product-family visuals, and rules that keep consistency across websites, motion, and marketing.",
      by: "Брэндавая сістэма Hiveon — лагатыпы, візуал лінейкі прадуктаў і правілы кансістэнтнасці для сайтаў, моўшна і маркетынгу.",
    },
  },
  {
    slug: "psd-parser",
    experienceId: "cybercradle",
    title: {
      en: "PSD parser",
      by: "PSD-парсер",
    },
    summary: {
      en: "Photoshop-to-game-engine automation: parsing PSD files to cut manual asset prep and speed delivery from design to engine.",
      by: "Аўтаматызацыя Photoshop → game engine: парсінг PSD, каб скараціць ручную падрыхтоўку асетаў і паскорыць дастаўку ў рухавік.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudiesForExperience(experienceId: string): CaseStudy[] {
  const item = experience.find((entry) => entry.id === experienceId);
  if (!item?.caseStudySlugs?.length) return [];
  return item.caseStudySlugs
    .map((slug) => getCaseStudy(slug))
    .filter((study): study is CaseStudy => study !== undefined);
}
