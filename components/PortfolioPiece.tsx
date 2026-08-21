import Image from "next/image";
import Link from "next/link";
import { MediaCarousel } from "@/components/MediaCarousel";
import { MediaFrame } from "@/components/MediaFrame";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import {
  getPortfolioPageSrcs,
  type PortfolioShot,
} from "@/content/portfolio";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  shot: PortfolioShot;
  locale: Locale;
  dict: Dictionary;
};

export function PortfolioPiece({ shot, locale, dict }: Props) {
  const title = shot.title[locale];
  const youtubeWatchUrl = shot.youtube
    ? `https://www.youtube.com/watch?v=${shot.youtube.id}`
    : undefined;
  const pageMeta = shot.pages;
  const pages = pageMeta ? getPortfolioPageSrcs(pageMeta) : [];

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link
        href={`/${locale}#portfolio`}
        className="text-[13px] text-muted transition-colors hover:text-foreground"
      >
        ← {dict.portfolio.back}
      </Link>

      <div className="mt-10 animate-fade-up">
        <h1 className="text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-foreground">
          {title}
        </h1>

        {shot.youtube ? (
          <div className="mt-10">
            <YouTubeEmbed
              id={shot.youtube.id}
              title={shot.youtube.title[locale]}
              caption={shot.youtube.caption?.[locale]}
            />
          </div>
        ) : pageMeta ? (
          <div className="mt-10">
            <MediaCarousel
              pages={pages}
              alt={title}
              width={pageMeta.width}
              height={pageMeta.height}
              indexTemplate={dict.portfolio.slide}
            />
          </div>
        ) : shot.cover ? (
          <figure className="mt-10">
            <MediaFrame>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.cover}
                alt={title}
                width={1600}
                height={1200}
                className="h-auto w-full"
              />
            </MediaFrame>
          </figure>
        ) : null}

        {shot.description ? (
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
            {shot.description[locale]}
          </p>
        ) : null}

        {pageMeta ? (
          <div className="mt-12 space-y-6">
            {pages.map((src, i) => (
              <MediaFrame key={src}>
                <Image
                  src={src}
                  alt={`${title} (${i + 1} / ${pages.length})`}
                  width={pageMeta.width}
                  height={pageMeta.height}
                  className="h-auto w-full"
                  sizes="(max-width: 64rem) calc(100vw - 3rem), 64rem"
                />
              </MediaFrame>
            ))}
          </div>
        ) : null}

        {youtubeWatchUrl || shot.dribbbleUrl ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {youtubeWatchUrl ? (
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
              >
                {dict.portfolio.viewOnYouTube} →
              </a>
            ) : null}
            {shot.dribbbleUrl ? (
              <a
                href={shot.dribbbleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
              >
                {dict.portfolio.viewOnDribbble} →
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
