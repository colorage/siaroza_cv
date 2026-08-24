import type { ReactNode } from "react";
import Link from "next/link";
import { MermaidDiagram } from "@/components/MermaidDiagram";
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="text-[16px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyBody({ study, locale, dict }: Props) {
  const context = study.context?.[locale];
  const problem = study.problem?.[locale];
  const process = study.process?.[locale];
  const solution = study.solution?.[locale];
  const solutionItems = study.solutionItems?.[locale];
  const impact = study.impact?.[locale];
  const effort = study.effort;
  const sections = study.sections;
  const diagrams = study.diagrams;
  const related = getRelatedCaseStudies(study);

  const showContext = hasText(context) || hasText(problem);
  const showSolution = hasText(solution) || hasList(solutionItems);
  const showProcess = hasList(process) || Boolean(sections?.length);

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

      {effort ? (
        <Section title={dict.caseStudies.effort}>
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted uppercase">
                {dict.caseStudies.duration}
              </dt>
              <dd className="mt-1 text-[16px] leading-relaxed text-foreground">
                {effort.duration[locale]}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted uppercase">
                {dict.caseStudies.role}
              </dt>
              <dd className="mt-1 text-[16px] leading-relaxed text-foreground">
                {effort.role[locale]}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted uppercase">
                {dict.caseStudies.team}
              </dt>
              <dd className="mt-1 text-[16px] leading-relaxed text-foreground">
                {effort.team[locale]}
              </dd>
            </div>
          </dl>
          {hasList(effort.constraints[locale]) ? (
            <div className="mt-8">
              <h3 className="mb-3 font-mono text-[11px] tracking-wide text-muted uppercase">
                {dict.caseStudies.constraints}
              </h3>
              <BulletList items={effort.constraints[locale]} />
            </div>
          ) : null}
          {hasList(effort.hard[locale]) ? (
            <div className="mt-8">
              <h3 className="mb-3 font-mono text-[11px] tracking-wide text-muted uppercase">
                {dict.caseStudies.hard}
              </h3>
              <BulletList items={effort.hard[locale]} />
            </div>
          ) : null}
        </Section>
      ) : null}

      {diagrams?.length ? (
        <div className="mt-14 space-y-10">
          {diagrams.map((diagram) => (
            <MermaidDiagram
              key={diagram.source}
              source={diagram.source}
              title={diagram.title?.[locale]}
            />
          ))}
        </div>
      ) : null}

      {showProcess ? (
        <Section title={dict.caseStudies.process}>
          {hasList(process) ? (
            <ol className="list-decimal space-y-3 pl-5 text-[16px] leading-relaxed text-muted">
              {process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
          {sections?.length ? (
            <div className={hasList(process) ? "mt-10 space-y-10" : "space-y-10"}>
              {sections.map((section) => {
                const body = section.body?.[locale];
                const items = section.items?.[locale];
                return (
                  <div key={section.title.en}>
                    <h3 className="text-lg tracking-tight text-foreground">
                      {section.title[locale]}
                    </h3>
                    {hasText(body) ? (
                      <p className="mt-3 text-[16px] leading-relaxed text-muted">
                        {body}
                      </p>
                    ) : null}
                    {hasList(items) ? (
                      <div className="mt-4">
                        <BulletList items={items} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </Section>
      ) : null}

      {showSolution ? (
        <Section title={dict.caseStudies.solution}>
          {hasText(solution) ? (
            <p className="text-[16px] leading-relaxed text-muted">{solution}</p>
          ) : null}
          {hasList(solutionItems) ? (
            <div className={hasText(solution) ? "mt-4" : undefined}>
              <BulletList items={solutionItems} />
            </div>
          ) : null}
        </Section>
      ) : null}

      {hasList(impact) ? (
        <Section title={dict.caseStudies.impact}>
          <BulletList items={impact} />
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
