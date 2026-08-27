import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/MediaFrame";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectLogo } from "@/components/ProjectLogo";
import { VideoEmbed } from "@/components/VideoEmbed";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getProject, getProjects } from "@/lib/vault/load";
import type { ProjectMedia } from "@/lib/vault/types";
import {
  getDictionary,
  isLocale,
  locales,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { isPetProjectsEnabled } from "@/lib/site-url";
import { pageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function projectLinkLabel(label: string, dict: Dictionary): string {
  if (label === "instagram") return dict.projects.instagram;
  if (label === "telegram") return dict.projects.telegram;
  if (label === "dribbble") return dict.projects.dribbble;
  return label;
}

function ProjectMediaBlock({
  item,
  locale,
  dict,
}: {
  item: ProjectMedia;
  locale: Locale;
  dict: Dictionary;
}) {
  if (item.type === "youtube") {
    return (
      <YouTubeEmbed
        id={item.id}
        title={item.title[locale]}
        caption={item.caption?.[locale]}
      />
    );
  }

  if (item.type === "video") {
    return (
      <VideoEmbed
        src={item.src}
        poster={item.poster}
        title={item.title[locale]}
        caption={item.caption?.[locale]}
      />
    );
  }

  if (item.type !== "image") return null;

  const image = (
    <Image
      src={item.src}
      alt={item.alt[locale]}
      width={item.width}
      height={item.height}
      className="h-auto w-full"
      sizes="(max-width: 64rem) calc(100vw - 3rem), 64rem"
      unoptimized={item.src.startsWith("/media/")}
    />
  );

  return (
    <figure>
      <MediaFrame>
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {image}
          </a>
        ) : (
          image
        )}
      </MediaFrame>
      {item.caption ? (
        <figcaption className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted">
          {item.caption[locale]}
        </figcaption>
      ) : null}
      {item.href?.includes("dribbble.com") ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-[13px] text-muted transition-colors hover:text-foreground"
        >
          {dict.projects.dribbble} →
        </a>
      ) : null}
    </figure>
  );
}

export function generateStaticParams() {
  if (!isPetProjectsEnabled()) return [];
  return locales.flatMap((locale) =>
    getProjects()
      .filter((project) => project.stage !== "nda")
      .map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isPetProjectsEnabled()) return {};
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const project = getProject(slug);
  if (!project || project.stage === "nda") return {};
  return pageMetadata({
    locale,
    title: `${project.name} — Siaroža`,
    description: project.description[locale],
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  if (!isPetProjectsEnabled()) notFound();
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const project = getProject(slug);
  if (!project || project.stage === "nda") notFound();

  const dict = await getDictionary(locale);
  const gallery = project.gallery;

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href={`/${locale}#projects`}
          className="text-[13px] text-muted transition-colors hover:text-foreground"
        >
          ← {dict.projects.back}
        </Link>

        <div className="mt-10 animate-fade-up">
          <div className="flex flex-wrap items-center gap-4">
            <ProjectLogo
              slug={project.slug}
              name={project.name}
              logoSrc={project.logo}
              className="h-14 w-14"
            />
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <h1 className="text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-foreground">
                  {project.name}
                </h1>
                {project.status === "active" && (
                  <span className="rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent uppercase">
                    {dict.projects.active}
                  </span>
                )}
              </div>
              {project.role ? (
                <p className="mt-2 text-[15px] text-muted">
                  {project.role[locale]}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 font-mono text-[12px] tracking-wide text-muted uppercase">
            <span className="rounded-full border border-border px-3 py-1">
              {dict.projects.stage[project.stage]}
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              {dict.projects.status[project.status]}
            </span>
          </div>

          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
            {project.description[locale]}
          </p>
        </div>
      </div>

      {gallery?.length ? (
        <ProjectGallery
          images={gallery}
          locale={locale}
          label={dict.projects.gallery}
        />
      ) : null}

      {project.media?.length ? (
        <div className="mx-auto mt-10 max-w-5xl space-y-8 px-6">
          {project.media.map((item) => (
            <ProjectMediaBlock
              key={
                item.type === "image" || item.type === "video"
                  ? item.src
                  : item.type === "youtube"
                    ? item.id
                    : item.type
              }
              item={item}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      ) : null}

      {project.url || project.links?.length ? (
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3 px-6">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
            >
              {dict.projects.visit} →
            </a>
          ) : null}
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
            >
              {projectLinkLabel(link.label, dict)} →
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
