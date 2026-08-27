import { PortfolioThumbnail } from "@/components/PortfolioThumbnail";
import {
  getPortfolioHref,
  getPortfolioShotAspect,
  portfolioShots,
} from "@/content/portfolio";
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

      <ul className="flex flex-wrap items-start gap-3 [--row-h:11rem] sm:[--row-h:15rem]">
        {portfolioShots.map((shot, index) => {
          const href = getPortfolioHref(shot, locale);
          const title = shot.title[locale];
          const { width, height } = getPortfolioShotAspect(shot);
          const ar = width / height;

          return (
            <li
              key={shot.slug}
              className="relative min-h-0 min-w-0 max-w-full animate-fade-up"
              style={{
                aspectRatio: `${width} / ${height}`,
                flexGrow: ar,
                flexShrink: 1,
                flexBasis: `calc(var(--row-h) * ${ar})`,
                animationDelay: `${Math.min(index, 8) * 40}ms`,
              }}
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
        <li
          aria-hidden
          className="pointer-events-none h-0 max-h-0 min-h-0 flex-[999_1_0] basis-0 overflow-hidden"
        />
      </ul>
    </section>
  );
}
