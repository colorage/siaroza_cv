import { JustifiedPortfolio } from "@/components/JustifiedPortfolio";
import { portfolioShots } from "@/content/portfolio";
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

      <JustifiedPortfolio shots={portfolioShots} locale={locale} dict={dict} />
    </section>
  );
}
