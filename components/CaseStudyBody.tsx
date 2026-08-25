import type { ReactNode } from "react";
import Link from "next/link";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import {
  getRelatedCaseStudies,
  type CaseStudy,
  type CaseStudyDiagram,
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
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-14 ${className}`.trim()}>
      <h2 className="mb-4 max-w-2xl font-mono text-[11px] tracking-wide text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl">{children}</div>;
}

function DiagramStack({
  diagrams,
  locale,
}: {
  diagrams: CaseStudyDiagram[];
  locale: Locale;
}) {
  return (
    <div className="mt-6 space-y-8">
      {diagrams.map((diagram, index) => (
        <MermaidDiagram
          key={`${diagram.source.slice(0, 24)}-${index}`}
          source={diagram.source}
          caption={diagram.caption?.[locale]}
        />
      ))}
    </div>
  );
}

export function CaseStudyBody({ study, locale, dict }: Props) {
  const context = study.context?.[locale];
  const problem = study.problem?.[locale];
  const process = study.process?.[locale];
  const processSteps = study.processSteps;
  const solution = study.solution?.[locale];
  const solutionItems = study.solutionItems?.[locale];
  const impact = study.impact?.[locale];
  const related = getRelatedCaseStudies(study);
  const effort = study.effort;

  const showContext = hasText(context) || hasText(problem);
  const showSolution =
    hasText(solution) || hasList(solutionItems) || Boolean(study.solutionDiagram);
  const showProcess = Boolean(processSteps?.length) || hasList(process);

  return (
    <div>
      {showContext ? (
        <Section title={dict.caseStudies.context}>
          <Prose>
            <div className="space-y-4 text-[16px] leading-relaxed text-muted">
              {hasText(context) ? <p>{context}</p> : null}
              {hasText(problem) ? <p>{problem}</p> : null}
            </div>
          </Prose>
        </Section>
      ) : null}

      {effort ? (
        <Section title={dict.caseStudies.effort}>
          <Prose>
            <p className="text-[16px] leading-relaxed text-muted">
              {effort.role[locale]}
            </p>
            {hasList(effort.constraints[locale]) ? (
              <div className="mt-6">
                <h3 className="mb-3 font-mono text-[11px] tracking-wide text-muted uppercase">
                  {dict.caseStudies.constraints}
                </h3>
                <ul className="space-y-2">
                  {effort.constraints[locale].map((item) => (
                    <li
                      key={item}
                      className="text-[16px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {hasList(effort.hard[locale]) ? (
              <div className="mt-6">
                <h3 className="mb-3 font-mono text-[11px] tracking-wide text-muted uppercase">
                  {dict.caseStudies.hard}
                </h3>
                <ul className="space-y-2">
                  {effort.hard[locale].map((item) => (
                    <li
                      key={item}
                      className="text-[16px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Prose>
        </Section>
      ) : null}

      {showProcess ? (
        <Section title={dict.caseStudies.process}>
          {processSteps?.length ? (
            <ol className="list-none space-y-16 p-0">
              {processSteps.map((step) => (
                <li key={step.heading.en}>
                  <Prose>
                    <h3 className="text-[18px] tracking-tight text-foreground">
                      {step.heading[locale]}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted">
                      {step.body[locale]}
                    </p>
                  </Prose>
                  <DiagramStack diagrams={step.diagrams} locale={locale} />
                </li>
              ))}
            </ol>
          ) : hasList(process) ? (
            <Prose>
              <ol className="list-decimal space-y-3 pl-5 text-[16px] leading-relaxed text-muted">
                {process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Prose>
          ) : null}
        </Section>
      ) : null}

      {showSolution ? (
        <Section title={dict.caseStudies.solution}>
          <Prose>
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
          </Prose>
          {study.solutionDiagram ? (
            <DiagramStack diagrams={[study.solutionDiagram]} locale={locale} />
          ) : null}
        </Section>
      ) : null}

      {hasList(impact) ? (
        <Section title={dict.caseStudies.impact}>
          <Prose>
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
          </Prose>
        </Section>
      ) : null}

      {related.length ? (
        <Section title={dict.caseStudies.related}>
          <Prose>
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
          </Prose>
        </Section>
      ) : null}
    </div>
  );
}
