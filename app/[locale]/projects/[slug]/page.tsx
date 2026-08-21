import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectLogo } from "@/components/ProjectLogo";
import { getProject, projects } from "@/content/projects";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { isPetProjectsEnabled } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  if (!isPetProjectsEnabled()) return [];
  return locales.flatMap((locale) =>
    projects
      .filter((project) => project.stage !== "nda")
      .map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function ProjectPage({ params }: Props) {
  if (!isPetProjectsEnabled()) notFound();
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const project = getProject(slug);
  if (!project || project.stage === "nda") notFound();

  const dict = await getDictionary(locale);

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
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
            className="h-14 w-14"
          />
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

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
          >
            {dict.projects.visit} →
          </a>
        ) : null}
      </div>
    </article>
  );
}
