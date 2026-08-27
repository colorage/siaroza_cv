import {
  getEarlierExperience,
  getFeaturedExperience,
} from "@/lib/vault/load";
import type { ExperienceItem } from "@/lib/vault/types";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function ExperienceRow({
  item,
  locale,
  index,
}: {
  item: ExperienceItem;
  locale: Locale;
  index: number;
}) {
  return (
    <li
      className="group relative pl-8 md:pl-10"
      style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
    >
      <span className="absolute top-10 -left-[5px] h-2.5 w-2.5 rounded-full border border-border-strong bg-surface transition-colors group-hover:border-accent group-hover:bg-accent" />
      <div className="border-b border-border py-8 group-last:border-b-0">
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
      </div>
    </li>
  );
}

export function ExperienceTimeline({ locale, dict }: Props) {
  const featured = getFeaturedExperience();
  const earlier = getEarlierExperience();

  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.experience.heading}
      </h2>

      <ol className="relative border-l border-border-strong">
        {featured.map((item, index) => (
          <ExperienceRow
            key={item.id}
            item={item}
            locale={locale}
            index={index}
          />
        ))}
      </ol>

      {earlier.length > 0 ? (
        <details className="group mt-2">
          <summary className="flex cursor-pointer list-none items-center gap-2 py-6 text-[13px] text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden
              className="inline-block transition-transform group-open:rotate-90"
            >
              →
            </span>
            {dict.experience.earlier}
          </summary>
          <ol className="relative border-l border-border-strong">
            {earlier.map((item, index) => (
              <ExperienceRow
                key={item.id}
                item={item}
                locale={locale}
                index={index}
              />
            ))}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
