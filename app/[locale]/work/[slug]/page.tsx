import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getExperience } from "@/content/experience";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const study = getCaseStudy(slug);
  const job = study ? getExperience(study.experienceId) : undefined;
  if (!study || !job) return {};
  return {
    title: `${study.title[locale]} — ${job.company}`,
    description: study.summary[locale],
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const study = getCaseStudy(slug);
  const job = study ? getExperience(study.experienceId) : undefined;
  if (!study || !job) notFound();

  const dict = await getDictionary(locale);

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link
        href={`/${locale}#experience`}
        className="text-[13px] text-muted transition-colors hover:text-foreground"
      >
        ← {dict.experience.caseStudyBack}
      </Link>

      <div className="mt-10 animate-fade-up">
        <h1 className="max-w-3xl text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
          {study.title[locale]}
        </h1>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12px] tracking-wide text-muted uppercase">
          <span>{job.company}</span>
          <span className="text-border-strong">·</span>
          <span>
            {job.start} — {job.end}
          </span>
        </div>
        <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
          {study.summary[locale]}
        </p>
      </div>
    </article>
  );
}
