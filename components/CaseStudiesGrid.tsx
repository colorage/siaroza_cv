import Link from "next/link";
import { CaseStudyLogo } from "@/components/CaseStudyLogo";
import { caseStudies } from "@/content/case-studies";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function CaseStudiesGrid({ locale, dict }: Props) {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.work.heading}
      </h2>

      <ul className="space-y-3">
        {caseStudies.map((study, index) => {
          const number = String(index + 1).padStart(2, "0");

          return (
            <li
              key={study.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
            >
              <Link
                href={`/${locale}/work/${study.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[color-mix(in_oklab,#edecec_3%,var(--surface))] sm:flex-row sm:items-start"
              >
                <div className="flex items-start gap-4 sm:contents">
                  <span className="font-mono text-[12px] tracking-wide text-muted uppercase sm:w-10 sm:pt-1">
                    {number}
                  </span>
                  <CaseStudyLogo
                    slug={study.slug}
                    className="h-11 w-11 transition-colors group-hover:border-border-strong group-hover:text-accent sm:order-none"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[18px] tracking-tight text-foreground transition-opacity group-hover:opacity-90">
                    {study.title[locale]}
                  </h3>
                  <p className="mt-1 font-mono text-[12px] tracking-wide text-muted uppercase">
                    {study.company}
                    <span className="mx-2 text-border-strong">·</span>
                    {study.start} — {study.end === "Now" ? dict.work.present : study.end}
                  </p>
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted">
                    {study.summary[locale]}
                  </p>
                </div>

                <span className="hidden text-foreground opacity-0 transition-opacity group-hover:opacity-60 sm:inline sm:pt-1">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
