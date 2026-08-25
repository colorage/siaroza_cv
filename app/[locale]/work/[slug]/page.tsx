import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/CaseStudyBody";
import { PortfolioPiece } from "@/components/PortfolioPiece";
import { getCaseStudy } from "@/content/case-studies";
import { getExperience } from "@/content/experience";
import { getPortfolioShot, isStandaloneShot } from "@/content/portfolio";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getWorkSlugs } from "@/lib/work";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getWorkSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const path = `/work/${slug}`;
  const shot = getPortfolioShot(slug);
  if (shot && isStandaloneShot(shot)) {
    return pageMetadata({
      locale,
      title: shot.title[locale],
      description: shot.description?.[locale],
      path,
    });
  }
  const study = getCaseStudy(slug);
  const job = study ? getExperience(study.experienceId) : undefined;
  if (!study || !job) return {};
  return pageMetadata({
    locale,
    title: `${study.title[locale]} — ${job.company}`,
    description: study.summary[locale],
    path,
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  const shot = getPortfolioShot(slug);
  if (shot && isStandaloneShot(shot)) {
    return <PortfolioPiece shot={shot} locale={locale} dict={dict} />;
  }

  const study = getCaseStudy(slug);
  const job = study ? getExperience(study.experienceId) : undefined;
  if (!study || !job) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link
        href={`/${locale}#case-studies`}
        className="text-[13px] text-muted transition-colors hover:text-foreground"
      >
        ← {dict.caseStudies.back}
      </Link>

      <header className="mt-10 max-w-2xl animate-fade-up">
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
          {study.title[locale]}
        </h1>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12px] tracking-wide text-muted uppercase">
          <span>{job.company}</span>
          <span className="text-border-strong">·</span>
          <span>
            {job.start} — {job.end}
          </span>
        </div>
        {study.stack?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-3 py-1 font-mono text-[12px] tracking-wide text-muted uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-8 text-[18px] leading-relaxed text-muted">
          {study.summary[locale]}
        </p>
      </header>

      <div className="animate-fade-up">
        <CaseStudyBody study={study} locale={locale} dict={dict} />
      </div>
    </article>
  );
}
