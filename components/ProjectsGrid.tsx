import Link from "next/link";
import { AsciiNoise } from "@/components/AsciiNoise";
import { ProjectLogo } from "@/components/ProjectLogo";
import { projects, type Project } from "@/content/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const ROW_COUNT = 3;
const MIN_ROW_SLOTS = 8;
const ROW_DURATIONS = ["42s", "54s", "48s"] as const;

function splitIntoRows<T>(items: readonly T[], rowCount: number): T[][] {
  const rows: T[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, index) => {
    rows[index % rowCount].push(item);
  });
  return rows.filter((row) => row.length > 0);
}

function fillRow<T>(items: T[], minCount: number): T[] {
  const copies = Math.max(1, Math.ceil(minCount / items.length));
  return Array.from({ length: copies }, () => items).flat();
}

export function ProjectsGrid({ locale, dict }: Props) {
  const rows = splitIntoRows(projects, ROW_COUNT).map((row) =>
    fillRow(row, MIN_ROW_SLOTS),
  );

  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <h2 className="mx-auto mb-12 max-w-5xl px-6 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.projects.heading}
      </h2>

      <div className="marquee relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24"
        />

        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <MarqueeRow
              key={rowIndex}
              projects={row}
              locale={locale}
              dict={dict}
              reverse={rowIndex === 1}
              duration={ROW_DURATIONS[rowIndex] ?? ROW_DURATIONS[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
  reverse: boolean;
  duration: string;
};

function MarqueeRow({
  projects: rowProjects,
  locale,
  dict,
  reverse,
  duration,
}: MarqueeRowProps) {
  return (
    <div className="marquee-row overflow-x-hidden pl-6 motion-reduce:overflow-x-auto">
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        <ul className="flex gap-4 pr-4">
          {rowProjects.map((project, index) => (
            <li key={`${project.slug}-${index}`}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
        <ul className="marquee-clone flex gap-4 pr-4" aria-hidden inert>
          {rowProjects.map((project, index) => (
            <li key={`${project.slug}-clone-${index}`}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  dict: Dictionary;
};

function ProjectCard({ project, locale, dict }: ProjectCardProps) {
  const isNda = project.stage === "nda";
  const ndaTitle = dict.projects.ndaPrivateTitle.replace("{name}", project.name);
  const cardWidth = "h-52 w-max min-w-64 max-w-80 shrink-0";

  if (isNda) {
    return (
      <div
        className={`relative flex ${cardWidth} items-center justify-center overflow-hidden rounded-2xl bg-surface`}
        aria-label={ndaTitle}
      >
        <AsciiNoise />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--background)_8%,transparent)_0%,transparent_72%)]" />
        <h3 className="relative z-10 max-w-[16ch] px-6 text-center text-[22px] leading-tight tracking-tight text-foreground sm:text-[24px]">
          {ndaTitle}
        </h3>
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={`group flex ${cardWidth} flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[color-mix(in_oklab,#edecec_3%,var(--surface))]`}
    >
      <div className="flex items-start justify-between gap-3">
        <ProjectLogo
          slug={project.slug}
          name={project.name}
          className="h-11 w-11 transition-colors group-hover:border-border-strong group-hover:text-accent"
        />
        {project.status === "active" && (
          <span className="rounded-full bg-[color-mix(in_oklab,#f54e00_18%,transparent)] px-2 py-0.5 text-[11px] font-medium tracking-wide text-accent uppercase">
            {dict.projects.active}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[16px] tracking-tight whitespace-nowrap text-foreground transition-opacity group-hover:opacity-90">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {project.description[locale]}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 font-mono text-[11px] tracking-wide text-muted uppercase">
        <span>
          {dict.projects.stage[project.stage]}
          <span className="mx-2 text-border-strong">·</span>
          {dict.projects.status[project.status]}
        </span>
        <span className="text-foreground opacity-0 transition-opacity group-hover:opacity-60">
          →
        </span>
      </div>
    </Link>
  );
}
