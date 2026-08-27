import type { ReactNode } from "react";
import Link from "next/link";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getRelatedCaseStudies } from "@/lib/vault/load";
import type { CaseStudy } from "@/lib/vault/types";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  study: CaseStudy;
  locale: Locale;
  dict: Dictionary;
};

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
  const related = getRelatedCaseStudies(study);
  const body = study.body?.[locale];

  return (
    <div className="max-w-2xl">
      {body ? <MarkdownBody markdown={body} locale={locale} /> : null}

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
