import Link from "next/link";
import {
  getCaseStudiesForIndex,
  hasCaseStudyBody,
} from "@/content/case-studies";
import { getExperience } from "@/content/experience";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function CaseStudiesIndex({ locale, dict }: Props) {
  const studies = getCaseStudiesForIndex();

  return (
    <section
      id="case-studies"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.caseStudies.heading}
      </h2>

      <ul className="max-w-2xl divide-y divide-border">
        {studies.map((study) => {
          const job = getExperience(study.experienceId);
          const featured = hasCaseStudyBody(study);

          return (
            <li key={study.slug} className={featured ? "py-10 first:pt-0" : "py-6 first:pt-0"}>
              <Link
                href={`/${locale}/work/${study.slug}`}
                className="group block"
              >
                <h3
                  className={`tracking-tight text-foreground transition-opacity group-hover:opacity-70 ${
                    featured
                      ? "text-2xl leading-tight md:text-3xl"
                      : "text-lg leading-snug"
                  }`}
                >
                  {study.title[locale]}
                </h3>
                {job ? (
                  <p className="mt-2 font-mono text-[12px] tracking-wide text-muted uppercase">
                    {job.company}
                    <span className="mx-2 text-border-strong">·</span>
                    {job.start} — {job.end}
                  </p>
                ) : null}
                <p
                  className={`leading-relaxed text-muted ${
                    featured ? "mt-4 text-[16px]" : "mt-2 line-clamp-2 text-[14px]"
                  }`}
                >
                  {study.summary[locale]}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
