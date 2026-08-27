import Link from "next/link";
import {
  getCaseStudiesForIndex,
  hasCaseStudyBody,
} from "@/lib/vault/load";
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

      <ul className="max-w-3xl divide-y divide-border">
        {studies.map((study) => {
          const featured = hasCaseStudyBody(study);

          return (
            <li
              key={study.slug}
              className={featured ? "py-10 first:pt-0" : "py-6 first:pt-0"}
            >
              <Link
                href={`/${locale}/work/${study.slug}`}
                className="group flex items-start justify-between gap-5 md:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <h3
                    className={`tracking-tight text-foreground transition-opacity group-hover:opacity-70 ${
                      featured
                        ? "text-2xl leading-tight md:text-3xl"
                        : "text-lg leading-snug"
                    }`}
                  >
                    {study.title[locale]}
                  </h3>
                  <p
                    className={`line-clamp-2 leading-relaxed text-muted ${
                      featured ? "mt-3 text-[16px]" : "mt-2 text-[14px]"
                    }`}
                  >
                    {study.summary[locale]}
                  </p>
                </div>
                <div
                  className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-surface md:h-28 md:w-40"
                  aria-hidden
                >
                  {study.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={study.cover}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
