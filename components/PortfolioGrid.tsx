import { PortfolioThumbnail } from "@/components/PortfolioThumbnail";
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

          return (
            <li
              key={shot.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              <PortfolioThumbnail
                shot={shot}
                title={title}
                href={href}
                external={Boolean(shot.href)}
                goToImageLabel={dict.portfolio.goToImage}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
