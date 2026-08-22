import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type CaseStudy = {
  slug: string;
  experienceId: string;
  title: LocalizedString;
  summary: LocalizedString;
  stack?: string[];
  context?: LocalizedString;
  problem?: LocalizedString;
  process?: LocalizedList;
  solution?: LocalizedString;
  solutionItems?: LocalizedList;
  impact?: LocalizedList;
  relatedSlugs?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "game-thumbnails",
    experienceId: "spribe",
    title: {
      en: "Game Thumbnails Design Cycle using AI",
      by: "Дызайн-цыкл гульнявых тамбнейлаў з AI",
    },
    summary: {
      en: "Automated generation of game thumbnails with Python and AI image-editing workflows — scaling asset production for the product platform.",
      by: "Аўтаматычная генерацыя прэв'ю гульняў з дапамогай Python і AI-рэдагавання выяў — маштабаванне вытворчасці асетаў для прадуктовай платформы.",
    },
  },
  {
    slug: "chameleon-illustrations",
    experienceId: "spribe",
    title: {
      en: "Chameleon Illustrations System",
      by: "Сістэма ілюстрацый Chameleon",
    },
    summary: {
      en: "Illustration set for the Chameleon product line, aligned with platform visual language and brand.",
      by: "Набор ілюстрацый для лінейкі Chameleon, узгоднены з візуальнай мовай платформы і брэндам.",
    },
  },
  {
    slug: "psd-parser",
    experienceId: "cybercradle",
    title: {
      en: "Photoshop-based level design",
      by: "Левел-дызайн на базе Photoshop",
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

export function hasCaseStudyBody(study: CaseStudy): boolean {
  return Boolean(
    study.context ||
      study.problem ||
      study.process ||
      study.solution ||
      study.solutionItems ||
      study.impact,
  );
}

export function getCaseStudiesForIndex(): CaseStudy[] {
  return [...caseStudies].sort(
    (a, b) => Number(hasCaseStudyBody(b)) - Number(hasCaseStudyBody(a)),
  );
}

export function getRelatedCaseStudies(study: CaseStudy): CaseStudy[] {
  if (!study.relatedSlugs?.length) return [];
  return study.relatedSlugs
    .filter((slug) => slug !== study.slug)
    .map((slug) => getCaseStudy(slug))
    .filter((related): related is CaseStudy => related !== undefined);
}
