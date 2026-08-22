import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyLogo } from "@/components/CaseStudyLogo";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { experience } from "@/content/experience";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title[locale]} — Siaroža`,
    description: study.summary[locale],
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const dict = await getDictionary(locale);
  const role = experience.find((item) => item.id === study.experienceId)?.role[locale];
  const endLabel = study.end === "Now" ? dict.work.present : study.end;

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link
        href={`/${locale}#work`}
        className="text-[13px] text-muted transition-colors hover:text-foreground"
      >
        ← {dict.work.back}
      </Link>

      <div className="mt-10 animate-fade-up">
        <div className="flex flex-wrap items-center gap-4">
          <CaseStudyLogo slug={study.slug} className="h-14 w-14" />
          <h1 className="max-w-3xl text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
            {study.title[locale]}
          </h1>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 font-mono text-[12px] tracking-wide text-muted uppercase">
          <span className="rounded-full border border-border px-3 py-1">{study.company}</span>
          <span className="rounded-full border border-border px-3 py-1">
            {study.start} — {endLabel}
          </span>
          {role ? (
            <span className="rounded-full border border-border px-3 py-1">{role}</span>
          ) : null}
        </div>

        <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
          {study.summary[locale]}
        </p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-x-12 md:gap-y-14">
        <h2 className="text-[13px] tracking-[0.08em] text-muted uppercase">
          {dict.work.context}
        </h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground">
          {study.context[locale]}
        </p>

        <h2 className="text-[13px] tracking-[0.08em] text-muted uppercase">
          {dict.work.approach}
        </h2>
        <ul className="max-w-2xl space-y-3">
          {study.approach[locale].map((step) => (
            <li
              key={step}
              className="text-[15px] leading-relaxed text-foreground before:mr-2 before:text-border-strong before:content-['–']"
            >
              {step}
            </li>
          ))}
        </ul>

        <h2 className="text-[13px] tracking-[0.08em] text-muted uppercase">
          {dict.work.outcome}
        </h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground">
          {study.outcome[locale]}
        </p>

        <h2 className="text-[13px] tracking-[0.08em] text-muted uppercase">
          {dict.work.tools}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {study.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-border px-3 py-1 font-mono text-[12px] tracking-wide text-muted uppercase"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
