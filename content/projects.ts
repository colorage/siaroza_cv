import type { Locale } from "@/lib/i18n";

export type ProjectStage = "release" | "mvp" | "poc" | "nda";
export type ProjectStatus = "finished" | "active" | "prototype";

export type Project = {
  slug: string;
  name: string;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  description: Record<Locale, string>;
};

export const projects: Project[] = [
  {
    slug: "yadoma-bel",
    name: "ядома.бел",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "yavolonter",
    name: "яволонтер",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "bloodlabs",
    name: "bloodlabs",
    stage: "release",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "pavetra",
    name: "pavetra",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "dc",
    name: "dc",
    stage: "nda",
    status: "active",
    description: {
      en: "Details under NDA.",
      by: "Дэталі пад NDA.",
    },
  },
  {
    slug: "kropki-mahiliou",
    name: "кропкі / mahiliou",
    stage: "release",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "radar-rockets",
    name: "Radar&Rockets",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "hejka-app",
    name: "hejka.app",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "halasy",
    name: "halasy",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "impact",
    name: "impact",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "polny-trash",
    name: "полны трэш",
    stage: "mvp",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "cobike",
    name: "cobike",
    stage: "poc",
    status: "prototype",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "losque",
    name: "losque",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "my-ostalis",
    name: "мы остались",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "kulturny-mogilev",
    name: "культурный могилев",
    stage: "release",
    status: "finished",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "akanicy",
    name: "akanicy",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "sunsethunters-club",
    name: "sunsethunters club",
    stage: "poc",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "lacinka",
    name: "lacinka",
    stage: "release",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
  {
    slug: "pavuk-club",
    name: "pavuk.club",
    stage: "release",
    status: "active",
    description: {
      en: "Description coming soon.",
      by: "Апісанне з'явіцца пазней.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
