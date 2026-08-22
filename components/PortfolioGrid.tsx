import { Marquee } from "@/components/Marquee";
import { PortfolioThumbnail } from "@/components/PortfolioThumbnail";
import {
  getPortfolioHref,
  portfolioShots,
  type PortfolioShot,
} from "@/content/portfolio";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const ROW_COUNT = 3;
const MIN_ROW_SLOTS = 8;
const ROW_DURATIONS = ["42s", "54s", "48s"] as const;

function splitIntoRows<T>(items: readonly T[], rowCount: number): T[][] {
  const rows: T[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, index) => {
    rows[index % rowCount].push(item);
  });
  return rows.filter((row) => row.length > 0);
}

function fillRow<T>(items: T[], minCount: number): T[] {
  const copies = Math.max(1, Math.ceil(minCount / items.length));
  return Array.from({ length: copies }, () => items).flat();
}

export function PortfolioGrid({ locale, dict }: Props) {
  const rows = splitIntoRows(portfolioShots, ROW_COUNT).map((row) =>
    fillRow(row, MIN_ROW_SLOTS),
  );

  return (
    <section id="portfolio" className="scroll-mt-20 py-24">
      <h2 className="mx-auto mb-12 max-w-5xl px-6 text-3xl tracking-tight text-foreground md:text-4xl">
        {dict.portfolio.heading}
      </h2>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24"
        />

        <div className="space-y-3">
          {rows.map((row, rowIndex) => (
            <MarqueeRow
              key={rowIndex}
              shots={row}
              locale={locale}
              dict={dict}
              reverse={rowIndex === 1}
              duration={ROW_DURATIONS[rowIndex] ?? ROW_DURATIONS[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  shots: PortfolioShot[];
  locale: Locale;
  dict: Dictionary;
  reverse: boolean;
  duration: string;
};

function MarqueeRow({
  shots,
  locale,
  dict,
  reverse,
  duration,
}: MarqueeRowProps) {
  return (
    <Marquee className="marquee-row overflow-x-hidden pl-6 motion-reduce:overflow-x-auto">
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        <ul className="flex">
          {shots.map((shot, index) => (
            <li key={`${shot.slug}-${index}`}>
              <PortfolioThumbnail
                shot={shot}
                title={shot.title[locale]}
                href={getPortfolioHref(shot, locale)}
                external={Boolean(shot.href)}
                goToImageLabel={dict.portfolio.goToImage}
              />
            </li>
          ))}
        </ul>
        <ul className="marquee-clone flex" aria-hidden inert>
          {shots.map((shot, index) => (
            <li key={`${shot.slug}-clone-${index}`}>
              <PortfolioThumbnail
                shot={shot}
                title={shot.title[locale]}
                href={getPortfolioHref(shot, locale)}
                external={Boolean(shot.href)}
                goToImageLabel={dict.portfolio.goToImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </Marquee>
  );
}
