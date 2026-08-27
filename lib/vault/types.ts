import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ExperienceItem = {
  id: string;
  start: string;
  end: string;
  company: string;
  role: LocalizedString;
  bullets: LocalizedList;
};

export type PortfolioYoutube = {
  id: string;
  title: LocalizedString;
  caption?: LocalizedString;
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
  label: LocalizedString;
};

export type PortfolioShot = {
  slug: string;
  title: LocalizedString;
  cover?: string;
  href?: string;
  description?: LocalizedString;
  dribbbleUrl?: string;
  links?: PortfolioLink[];
  youtube?: PortfolioYoutube;
  pages?: PortfolioPages;
};

export type PortfolioThumbnailKind = "image" | "gallery" | "video";

export type CaseStudy = {
  slug: string;
  experienceId: string;
  title: LocalizedString;
  summary: LocalizedString;
  stack?: string[];
  body?: LocalizedString;
  relatedSlugs?: string[];
};

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: LocalizedString;
      caption?: LocalizedString;
      href?: string;
    }
  | {
      type: "youtube";
      id: string;
      title: LocalizedString;
      caption?: LocalizedString;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title: LocalizedString;
      caption?: LocalizedString;
    }
  | { type: "pdf-pages"; dir: string; count: number };

export type ProjectGalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedString;
};

export type Project = {
  slug: string;
  name: string;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  links?: ProjectLink[];
  media?: ProjectMedia[];
  role?: LocalizedString;
  description: LocalizedString;
  gallery?: ProjectGalleryImage[];
  logo?: string;
};
