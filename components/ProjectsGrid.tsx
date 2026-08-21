import Link from "next/link";
import { AsciiNoise } from "@/components/AsciiNoise";
import { ProjectLogo } from "@/components/ProjectLogo";
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

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const isNda = project.stage === "nda";
          const shellClass =
            "flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5";
          const ndaTitle = dict.projects.ndaPrivateTitle.replace("{name}", project.name);

          return (
            <li
              key={project.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              {isNda ? (
                <div
                  className="relative flex h-full min-h-52 items-center justify-center overflow-hidden rounded-2xl bg-surface"
                  aria-label={ndaTitle}
                >
                  <AsciiNoise />
                  <h3 className="pointer-events-none relative z-10 text-center text-[16px] tracking-tight text-foreground">
                    <span className="inline-block bg-background px-8 py-3">
                      {ndaTitle}
                    </span>
                  </h3>
                </div>
              ) : (
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className={`group ${shellClass} transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[color-mix(in_oklab,#edecec_3%,var(--surface))]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <ProjectLogo
                      slug={project.slug}
                      name={project.name}
                      className="h-11 w-11 transition-colors group-hover:border-border-strong group-hover:text-accent"
                    />
                    {project.status === "active" && (
                      <span className="rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] px-2 py-0.5 text-[11px] font-medium tracking-wide text-accent uppercase">
                        {dict.projects.active}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[16px] tracking-tight text-foreground transition-opacity group-hover:opacity-90">
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
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
