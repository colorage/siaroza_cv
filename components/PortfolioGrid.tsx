import Link from "next/link";
import { PortfolioCover } from "@/components/PortfolioCover";
import { getPortfolioHref, portfolioShots } from "@/content/portfolio";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function PortfolioGrid({ locale, dict }: Props) {
  return (
    <section id="portfolio" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <h2 className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.portfolio.heading}
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioShots.map((shot, index) => {
          const href = getPortfolioHref(shot, locale);
          const title = shot.title[locale];
          const shotClass =
            "group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-surface text-foreground";

          const inner = (
            <>
              <PortfolioCover slug={shot.slug} title={title} cover={shot.cover} />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[color-mix(in_oklab,#14120b_78%,transparent)] via-[color-mix(in_oklab,#14120b_12%,transparent)] to-transparent p-4 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
                <h3 className="text-[15px] tracking-tight text-foreground">
                  {title}
                </h3>
              </div>
            </>
          );

          return (
            <li
              key={shot.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              {href ? (
                shot.href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={shotClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={shotClass}>
                    {inner}
                  </Link>
                )
              ) : (
                <div className={shotClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
