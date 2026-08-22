import Link from "next/link";
import { getCaseStudiesForExperience } from "@/content/case-studies";
import { experience } from "@/content/experience";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ExperienceTimeline({ locale, dict }: Props) {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.experience.heading}
      </h2>

      <ol className="relative space-y-0 border-l border-border-strong pl-0">
        {experience.map((item, index) => {
          const related = getCaseStudiesForExperience(item.id);

          return (
            <li
              key={item.id}
              className="group relative border-b border-border py-8 pl-8 last:border-b-0 md:pl-10"
              style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
            >
              <span className="absolute top-10 -left-[5px] h-2.5 w-2.5 rounded-full border border-border-strong bg-surface transition-colors group-hover:border-accent group-hover:bg-accent" />
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-lg tracking-tight text-foreground">
                    {item.role[locale]}
                  </h3>
                  <p className="mt-1 text-[15px] text-muted">{item.company}</p>
                </div>
                <p className="font-mono text-[12px] tracking-wide text-muted uppercase">
                  {item.start} — {item.end}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {item.bullets[locale].map((bullet) => (
                  <li
                    key={bullet}
                    className="text-[14px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['–']"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              {related.length > 0 ? (
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                    {dict.experience.relatedWork}
                  </span>
                  {related.map((study) => (
                    <Link
                      key={study.slug}
                      href={`/${locale}/work/${study.slug}`}
                      className="text-[13px] text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {study.title[locale]}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
