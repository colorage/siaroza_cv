import type { ReactNode } from "react";
import Link from "next/link";
import {
  getRelatedCaseStudies,
  type CaseStudy,
} from "@/content/case-studies";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  study: CaseStudy;
  locale: Locale;
  dict: Dictionary;
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function hasList(value: string[] | undefined): value is string[] {
  return Boolean(value?.length);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-4 font-mono text-[11px] tracking-wide text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CaseStudyBody({ study, locale, dict }: Props) {
  const context = study.context?.[locale];
  const problem = study.problem?.[locale];
  const process = study.process?.[locale];
  const solution = study.solution?.[locale];
  const solutionItems = study.solutionItems?.[locale];
  const impact = study.impact?.[locale];
  const related = getRelatedCaseStudies(study);

  const showContext = hasText(context) || hasText(problem);
  const showSolution = hasText(solution) || hasList(solutionItems);

  return (
    <div className="max-w-2xl">
      {showContext ? (
        <Section title={dict.caseStudies.context}>
          <div className="space-y-4 text-[16px] leading-relaxed text-muted">
            {hasText(context) ? <p>{context}</p> : null}
            {hasText(problem) ? <p>{problem}</p> : null}
          </div>
        </Section>
      ) : null}

      {hasList(process) ? (
        <Section title={dict.caseStudies.process}>
          <ol className="list-decimal space-y-3 pl-5 text-[16px] leading-relaxed text-muted">
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Section>
      ) : null}

      {showSolution ? (
        <Section title={dict.caseStudies.solution}>
          {hasText(solution) ? (
            <p className="text-[16px] leading-relaxed text-muted">{solution}</p>
          ) : null}
          {hasList(solutionItems) ? (
            <ul className="mt-4 space-y-2">
              {solutionItems.map((item) => (
                <li
                  key={item}
                  className="text-[16px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      {hasList(impact) ? (
        <Section title={dict.caseStudies.impact}>
          <ul className="space-y-2">
            {impact.map((item) => (
              <li
                key={item}
                className="text-[16px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {related.length ? (
        <Section title={dict.caseStudies.related}>
          <ul className="space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${locale}/work/${item.slug}`}
                  className="text-[16px] text-foreground underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {item.title[locale]} →
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  );
}
