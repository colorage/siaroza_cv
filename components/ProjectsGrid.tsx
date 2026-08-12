import Link from "next/link";
import { projects } from "@/content/projects";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ProjectsGrid({ locale, dict }: Props) {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.projects.heading}
      </h2>

      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-[color-mix(in_oklab,#edecec_3%,transparent)] md:flex-row md:items-center md:justify-between md:gap-6 md:px-6"
            >
              <div className="flex min-w-0 flex-1 gap-4">
                {project.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="mt-0.5 size-10 shrink-0 rounded-[10px]"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[16px] tracking-tight text-foreground transition-opacity group-hover:opacity-80">
                      {project.name}
                    </h3>
                    {project.status === "active" && (
                      <span className="rounded-full bg-[color-mix(in_oklab,#f54e00_18%,transparent)] px-2 py-0.5 text-[11px] font-medium tracking-wide text-accent uppercase">
                        {dict.projects.active}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    {project.description[locale]}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] tracking-wide text-muted uppercase">
                <span>{dict.projects.stage[project.stage]}</span>
                <span className="text-border-strong">·</span>
                <span>{dict.projects.status[project.status]}</span>
                <span className="ml-1 text-foreground opacity-0 transition-opacity group-hover:opacity-60">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
