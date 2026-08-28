import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { dump as yamlDump, load as yamlLoad, JSON_SCHEMA } from "js-yaml";
import { locales, type Locale } from "@/lib/i18n";
import {
  localized,
  markdownBullets,
  preprocessMarkdown,
  rewriteWikiLinks,
} from "@/lib/vault/markdown";
import {
  noteDirMediaPrefix,
  resolveNoteAsset,
  VAULT_ROOT,
} from "@/lib/vault/paths";
import { isStandaloneShot } from "@/lib/vault/portfolio-utils";
import type {
  CaseStudy,
  ExperienceItem,
  PortfolioLink,
  PortfolioPages,
  PortfolioShot,
  PortfolioVideo,
  PortfolioYoutube,
  Project,
  ProjectGalleryImage,
  ProjectLink,
  ProjectMedia,
  ProjectStage,
  ProjectStatus,
} from "@/lib/vault/types";

type NoteFile = {
  absPath: string;
  dir: string;
  data: Record<string, unknown>;
  body: string;
};

type Catalog = {
  experience: ExperienceItem[];
  portfolio: PortfolioShot[];
  caseStudies: CaseStudy[];
  projects: Project[];
};

let productionCache: Catalog | undefined;

function vaultExists(absPath: string): boolean {
  return existsSync(/* turbopackIgnore: true */ absPath);
}

function vaultReadText(absPath: string): string {
  return readFileSync(/* turbopackIgnore: true */ absPath, "utf8");
}

function vaultReadBytes(absPath: string): Buffer {
  return readFileSync(/* turbopackIgnore: true */ absPath);
}

function parseNote(absPath: string): NoteFile {
  const raw = vaultReadText(absPath);
  const parsed = matter(raw, {
    engines: {
      yaml: {
        parse: (input: string) =>
          (yamlLoad(input, { schema: JSON_SCHEMA }) ?? {}) as Record<
            string,
            unknown
          >,
        stringify: (data: object) => yamlDump(data),
      },
    },
  });
  return {
    absPath,
    dir: path.dirname(absPath),
    data: parsed.data as Record<string, unknown>,
    body: parsed.content,
  };
}

function walkNotes(dir: string, locale: Locale, acc: string[] = []): string[] {
  if (!vaultExists(dir)) return acc;
  for (const entry of readdirSync(/* turbopackIgnore: true */ dir, {
    withFileTypes: true,
  })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkNotes(full, locale, acc);
    } else if (entry.name.endsWith(`.${locale}.md`)) {
      acc.push(full);
    }
  }
  return acc;
}

function pairNotes(dir: string): Array<{ en: NoteFile; by?: NoteFile }> {
  const enFiles = walkNotes(dir, "en").sort();
  return enFiles.map((enPath) => {
    const byPath = enPath.replace(/\.en\.md$/, ".by.md");
    return {
      en: parseNote(enPath),
      by: vaultExists(byPath) ? parseNote(byPath) : undefined,
    };
  });
}

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function num(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function strList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((item): item is string => typeof item === "string");
}

function orderOf(data: Record<string, unknown>, fallback: number): number {
  return num(data.order) ?? fallback;
}

function ranked<T>(rows: Array<{ order: number; item: T } | null>): T[] {
  return rows
    .flatMap((row) => (row ? [row] : []))
    .sort((a, b) => a.order - b.order)
    .map((row) => row.item);
}

function probeImage(
  noteDir: string,
  src: string,
): { width: number; height: number } {
  const abs = path.resolve(noteDir, src);
  if (!vaultExists(abs)) return { width: 1600, height: 1200 };
  try {
    const size = imageSize(new Uint8Array(vaultReadBytes(abs)));
    return {
      width: size.width ?? 1600,
      height: size.height ?? 1200,
    };
  } catch {
    return { width: 1600, height: 1200 };
  }
}

function loadExperience(): ExperienceItem[] {
  const pairs = pairNotes(path.join(VAULT_ROOT, "experience"));
  const rows = pairs.map(({ en, by }, index) => {
    const id = str(en.data.id);
    if (!id) return null;
    const item: ExperienceItem = {
      id,
      start: str(en.data.start) ?? "",
      end: str(en.data.end) ?? "",
      company: str(en.data.company) ?? "",
      role: localized(str(en.data.role), str(by?.data.role)),
      bullets: {
        en: markdownBullets(en.body),
        by: markdownBullets(by?.body ?? en.body),
      },
    };
    return { order: orderOf(en.data, index), item };
  });
  return ranked(rows);
}

function loadYoutube(
  en: Record<string, unknown>,
  by: Record<string, unknown> | undefined,
): PortfolioYoutube | undefined {
  const youtube = en.youtube;
  if (!youtube || typeof youtube !== "object") return undefined;
  const data = youtube as Record<string, unknown>;
  const id = str(data.id);
  if (!id) return undefined;
  const byData =
    by?.youtube && typeof by.youtube === "object"
      ? (by.youtube as Record<string, unknown>)
      : undefined;
  const title = localized(str(data.title), str(byData?.title));
  const captionEn = str(data.caption);
  const captionBy = str(byData?.caption);
  return {
    id,
    title,
    ...(captionEn || captionBy
      ? { caption: localized(captionEn, captionBy) }
      : {}),
  };
}

function loadVideo(
  en: NoteFile,
  by: Record<string, unknown> | undefined,
): PortfolioVideo | undefined {
  const video = en.data.video;
  if (!video || typeof video !== "object") return undefined;
  const data = video as Record<string, unknown>;
  const src = str(data.src);
  if (!src) return undefined;
  const byData =
    by?.video && typeof by.video === "object"
      ? (by.video as Record<string, unknown>)
      : undefined;
  const poster = str(data.poster);
  const captionEn = str(data.caption);
  const captionBy = str(byData?.caption);
  return {
    src: resolveNoteAsset(en.dir, src),
    ...(poster ? { poster: resolveNoteAsset(en.dir, poster) } : {}),
    width: num(data.width) ?? 16,
    height: num(data.height) ?? 9,
    title: localized(str(data.title), str(byData?.title)),
    ...(captionEn || captionBy
      ? { caption: localized(captionEn, captionBy) }
      : {}),
    ...(data.loop === true ? { loop: true } : {}),
  };
}

function loadPages(
  en: NoteFile,
  data: Record<string, unknown>,
): PortfolioPages | undefined {
  const pages = data.pages;
  if (!pages || typeof pages !== "object") return undefined;
  const raw = pages as Record<string, unknown>;
  const files = strList(raw.files);
  const count = num(raw.count) ?? files?.length ?? 0;
  if (!count && !files?.length) return undefined;
  const first = files?.[0] ?? `page-01.jpg`;
  const probed = probeImage(en.dir, first);
  return {
    dir: noteDirMediaPrefix(en.dir),
    count: files?.length ?? count,
    width: num(raw.width) ?? probed.width,
    height: num(raw.height) ?? probed.height,
    ...(files ? { files } : {}),
  };
}

function loadPortfolioLinks(
  en: Record<string, unknown>,
  by: Record<string, unknown> | undefined,
): PortfolioLink[] | undefined {
  const links = en.links;
  if (!Array.isArray(links)) return undefined;
  const byLinks = Array.isArray(by?.links) ? by.links : [];
  const mapped = links.flatMap((link, index) => {
    if (!link || typeof link !== "object") return [];
    const data = link as Record<string, unknown>;
    const href = str(data.href);
    if (!href) return [];
    const byLink =
      byLinks[index] && typeof byLinks[index] === "object"
        ? (byLinks[index] as Record<string, unknown>)
        : undefined;
    return [
      {
        href,
        label: localized(str(data.label), str(byLink?.label)),
      },
    ];
  });
  return mapped.length ? mapped : undefined;
}

function loadPortfolio(): PortfolioShot[] {
  const pairs = pairNotes(path.join(VAULT_ROOT, "work"));
  const rows = pairs.map(({ en, by }, index) => {
    const slug = str(en.data.slug);
    if (!slug) return null;
    const coverSrc = str(en.data.cover);
    const description = en.body.trim()
      ? localized(en.body.trim(), (by?.body ?? en.body).trim())
      : undefined;
    const links = loadPortfolioLinks(en.data, by?.data);
    const youtube = loadYoutube(en.data, by?.data);
    const video = loadVideo(en, by?.data);
    const pages = loadPages(en, en.data);
    const item: PortfolioShot = {
      slug,
      title: localized(str(en.data.title), str(by?.data.title)),
      ...(coverSrc ? { cover: resolveNoteAsset(en.dir, coverSrc) } : {}),
      ...(str(en.data.href) ? { href: str(en.data.href) } : {}),
      ...(description ? { description } : {}),
      ...(str(en.data.dribbbleUrl)
        ? { dribbbleUrl: str(en.data.dribbbleUrl) }
        : {}),
      ...(links ? { links } : {}),
      ...(youtube ? { youtube } : {}),
      ...(video ? { video } : {}),
      ...(pages ? { pages } : {}),
    };
    return { order: orderOf(en.data, index), item };
  });
  return ranked(rows);
}

function detectCaseStudyCover(en: NoteFile, slug: string): string | undefined {
  const explicit = str(en.data.cover);
  if (explicit) return resolveNoteAsset(en.dir, explicit);
  const candidates = [
    `${slug}.jpg`,
    `${slug}.png`,
    `${slug}.webp`,
    `${slug}-cover.jpg`,
    `${slug}-cover.png`,
    `${slug}-cover.webp`,
  ];
  for (const name of candidates) {
    if (vaultExists(path.join(/* turbopackIgnore: true */ en.dir, name))) {
      return resolveNoteAsset(en.dir, name);
    }
  }
  return undefined;
}

function loadCaseStudies(): CaseStudy[] {
  const pairs = pairNotes(path.join(VAULT_ROOT, "case-studies"));
  const rows = pairs.map(({ en, by }, index) => {
    const slug = str(en.data.slug);
    if (!slug) return null;
    const enBody = preprocessMarkdown(en.body.trim(), en.dir);
    const byBody = preprocessMarkdown((by?.body ?? en.body).trim(), en.dir);
    const stack = strList(en.data.stack);
    const relatedSlugs = strList(en.data.related);
    const cover = detectCaseStudyCover(en, slug);
    const item: CaseStudy = {
      slug,
      experienceId: str(en.data.experienceId) ?? "",
      title: localized(str(en.data.title), str(by?.data.title)),
      summary: localized(str(en.data.summary), str(by?.data.summary)),
      ...(cover ? { cover } : {}),
      ...(stack ? { stack } : {}),
      ...(enBody ? { body: localized(enBody, byBody) } : {}),
      ...(relatedSlugs ? { relatedSlugs } : {}),
    };
    return { order: orderOf(en.data, index), item };
  });
  return ranked(rows);
}

function isStage(value: unknown): value is ProjectStage {
  return value === "release" || value === "mvp" || value === "poc" || value === "nda";
}

function isStatus(value: unknown): value is ProjectStatus {
  return (
    value === "finished" || value === "active" || value === "prototype"
  );
}

function loadProjectLinks(en: Record<string, unknown>): ProjectLink[] | undefined {
  const links = en.links;
  if (!Array.isArray(links)) return undefined;
  const mapped = links.flatMap((link) => {
    if (!link || typeof link !== "object") return [];
    const data = link as Record<string, unknown>;
    const href = str(data.href);
    const label = str(data.label);
    if (!href || !label) return [];
    return [{ label, href }];
  });
  return mapped.length ? mapped : undefined;
}

function loadGallery(
  en: NoteFile,
  by: NoteFile | undefined,
): ProjectGalleryImage[] | undefined {
  const gallery = en.data.gallery;
  if (!Array.isArray(gallery)) return undefined;
  const byGallery = Array.isArray(by?.data.gallery) ? by.data.gallery : [];
  const images = gallery.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const data = item as Record<string, unknown>;
    const src = str(data.src);
    if (!src) return [];
    const byItem =
      byGallery[index] && typeof byGallery[index] === "object"
        ? (byGallery[index] as Record<string, unknown>)
        : undefined;
    const probed = probeImage(en.dir, src);
    return [
      {
        src: resolveNoteAsset(en.dir, src),
        width: num(data.width) ?? probed.width,
        height: num(data.height) ?? probed.height,
        alt: localized(str(data.alt), str(byItem?.alt)),
      },
    ];
  });
  return images.length ? images : undefined;
}

function loadProjectMedia(
  en: NoteFile,
  by: NoteFile | undefined,
): ProjectMedia[] | undefined {
  const media = en.data.media;
  if (!Array.isArray(media)) return undefined;
  const byMedia = Array.isArray(by?.data.media) ? by.data.media : [];
  const mapped: ProjectMedia[] = [];
  media.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const data = item as Record<string, unknown>;
    const type = str(data.type);
    const byItem =
      byMedia[index] && typeof byMedia[index] === "object"
        ? (byMedia[index] as Record<string, unknown>)
        : undefined;
    if (type === "youtube") {
      const id = str(data.id);
      if (!id) return;
      const captionEn = str(data.caption);
      const captionBy = str(byItem?.caption);
      mapped.push({
        type: "youtube",
        id,
        title: localized(str(data.title), str(byItem?.title)),
        ...(captionEn || captionBy
          ? { caption: localized(captionEn, captionBy) }
          : {}),
      });
      return;
    }
    if (type === "video") {
      const src = str(data.src);
      if (!src) return;
      const poster = str(data.poster);
      const captionEn = str(data.caption);
      const captionBy = str(byItem?.caption);
      const href = str(data.href);
      mapped.push({
        type: "video",
        src: resolveNoteAsset(en.dir, src),
        ...(poster ? { poster: resolveNoteAsset(en.dir, poster) } : {}),
        title: localized(str(data.title), str(byItem?.title)),
        ...(captionEn || captionBy
          ? { caption: localized(captionEn, captionBy) }
          : {}),
        ...(data.loop === true ? { loop: true } : {}),
        ...(href ? { href } : {}),
      });
      return;
    }
    if (type === "pdf-pages") {
      const dir = str(data.dir);
      const count = num(data.count);
      if (!dir || !count) return;
      mapped.push({ type: "pdf-pages", dir, count });
      return;
    }
    if (type !== "image") return;
    const src = str(data.src);
    if (!src) return;
    const probed = probeImage(en.dir, src);
    const captionEn = str(data.caption);
    const captionBy = str(byItem?.caption);
    const href = str(data.href);
    mapped.push({
      type: "image",
      src: resolveNoteAsset(en.dir, src),
      width: num(data.width) ?? probed.width,
      height: num(data.height) ?? probed.height,
      alt: localized(str(data.alt), str(byItem?.alt)),
      ...(captionEn || captionBy
        ? { caption: localized(captionEn, captionBy) }
        : {}),
      ...(href ? { href } : {}),
    });
  });
  return mapped.length ? mapped : undefined;
}

function detectLogo(en: NoteFile): string | undefined {
  const explicit = str(en.data.logo);
  if (explicit) return resolveNoteAsset(en.dir, explicit);
  for (const name of ["logo.png", "logo.jpg", "logo.webp", "logo.svg"]) {
    if (vaultExists(path.join(/* turbopackIgnore: true */ en.dir, name))) {
      return resolveNoteAsset(en.dir, name);
    }
  }
  return undefined;
}

function loadProjects(): Project[] {
  const pairs = pairNotes(path.join(VAULT_ROOT, "projects"));
  const rows = pairs.map(({ en, by }, index) => {
    const slug = str(en.data.slug);
    const name = str(en.data.name);
    if (!slug || !name) return null;
    const stage = isStage(en.data.stage) ? en.data.stage : "poc";
    const status = isStatus(en.data.status) ? en.data.status : "finished";
    const description = localized(
      str(en.data.description) ?? en.body.trim(),
      str(by?.data.description) ?? (by?.body ?? en.body).trim(),
    );
    const roleEn = str(en.data.role);
    const roleBy = str(by?.data.role);
    const links = loadProjectLinks(en.data);
    const media = loadProjectMedia(en, by);
    const gallery = loadGallery(en, by);
    const logo = detectLogo(en);
    const item: Project = {
      slug,
      name,
      stage,
      status,
      description,
      ...(str(en.data.url) ? { url: str(en.data.url) } : {}),
      ...(links ? { links } : {}),
      ...(media ? { media } : {}),
      ...(roleEn || roleBy ? { role: localized(roleEn, roleBy) } : {}),
      ...(gallery ? { gallery } : {}),
      ...(logo ? { logo } : {}),
    };
    return { order: orderOf(en.data, index), item };
  });
  return ranked(rows);
}

function applyWikiLinks(catalog: Catalog): Catalog {
  const workSlugs = new Set([
    ...catalog.caseStudies.map((study) => study.slug),
    ...catalog.portfolio.filter(isStandaloneShot).map((shot) => shot.slug),
  ]);
  const projectSlugs = new Set(catalog.projects.map((project) => project.slug));
  for (const study of catalog.caseStudies) {
    if (!study.body) continue;
    for (const locale of locales) {
      study.body[locale] = rewriteWikiLinks(
        study.body[locale],
        locale,
        workSlugs,
        projectSlugs,
      );
    }
  }
  return catalog;
}

export function loadCatalog(): Catalog {
  if (process.env.NODE_ENV === "production" && productionCache) {
    return productionCache;
  }
  const catalog = applyWikiLinks({
    experience: loadExperience(),
    portfolio: loadPortfolio(),
    caseStudies: loadCaseStudies(),
    projects: loadProjects(),
  });
  if (process.env.NODE_ENV === "production") productionCache = catalog;
  return catalog;
}

export function getExperienceItems(): ExperienceItem[] {
  return loadCatalog().experience;
}

export function getExperience(id: string): ExperienceItem | undefined {
  return getExperienceItems().find((item) => item.id === id);
}

export function getPortfolioShots(): PortfolioShot[] {
  return loadCatalog().portfolio;
}

export function getPortfolioShot(slug: string): PortfolioShot | undefined {
  return getPortfolioShots().find((shot) => shot.slug === slug);
}

export function getCaseStudies(): CaseStudy[] {
  return loadCatalog().caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}

export function hasCaseStudyBody(study: CaseStudy): boolean {
  return Boolean(study.body?.en?.trim() || study.body?.by?.trim());
}

export function getCaseStudiesForIndex(): CaseStudy[] {
  return [...getCaseStudies()].sort(
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

export function getProjects(): Project[] {
  return loadCatalog().projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getSortedProjects(): Project[] {
  return [...getProjects()].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return 0;
  });
}

export const featuredExperienceIds = ["spribe", "ptchr", "hiveon"] as const;
export const featuredPortfolioSlugs = [
  "showreel-23",
  "brandbook",
  "ice-sculptor",
] as const;
export const featuredProjectSlugs = [
  "lacinka",
  "radar-rockets",
  "kropki-mahiliou",
] as const;

export function getFeaturedExperience(): ExperienceItem[] {
  return featuredExperienceIds
    .map((id) => getExperience(id))
    .filter((item): item is ExperienceItem => item !== undefined);
}

export function getEarlierExperience(): ExperienceItem[] {
  const featured = new Set<string>(featuredExperienceIds);
  return getExperienceItems().filter((item) => !featured.has(item.id));
}

export function getFeaturedPortfolio(): PortfolioShot[] {
  return featuredPortfolioSlugs
    .map((slug) => getPortfolioShot(slug))
    .filter((shot): shot is PortfolioShot => shot !== undefined);
}

export function getFeaturedProjects(): Project[] {
  return featuredProjectSlugs
    .map((slug) => getProject(slug))
    .filter(
      (project): project is Project =>
        project !== undefined && project.stage !== "nda",
    );
}
