import Image from "next/image";
import Link from "next/link";
import { MediaCarousel } from "@/components/MediaCarousel";
import { MediaFrame } from "@/components/MediaFrame";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import {
  getPortfolioPageSrcs,
  isAnimatedCover,
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
  const pageMeta = shot.pages;
  const pages = pageMeta ? getPortfolioPageSrcs(pageMeta) : [];
  const coverIsHero =
    Boolean(shot.cover) &&
    !shot.youtube &&
    (!pageMeta || !pages.includes(shot.cover ?? ""));
  const showCarousel = Boolean(pageMeta) && !shot.youtube && !coverIsHero;

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
        ) : coverIsHero && shot.cover ? (
          <figure className="mt-10">
            <MediaFrame className="bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.cover}
                alt={title}
                width={
                  shot.width ??
                  shot.pages?.width ??
                  (isAnimatedCover(shot) ? 400 : 1600)
                }
                height={
                  shot.height ??
                  shot.pages?.height ??
                  (isAnimatedCover(shot) ? 400 : 1200)
                }
                className="mx-auto h-auto w-full"
              />
            </MediaFrame>
          </figure>
        ) : showCarousel && pageMeta ? (
          <div className="mt-10">
            <MediaCarousel
              pages={pages}
              alt={title}
              width={pageMeta.width}
              height={pageMeta.height}
              indexTemplate={dict.portfolio.slide}
            />
          </div>
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

        {shot.links?.length || shot.dribbbleUrl || shot.youtube ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {shot.links?.length
              ? shot.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
                  >
                    {link.label[locale]} →
                  </a>
                ))
              : shot.dribbbleUrl ? (
                  <a
                    href={shot.dribbbleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
                  >
                    {dict.portfolio.viewOnDribbble} →
                  </a>
                ) : null}
            {shot.youtube ? (
              <a
                href={`https://www.youtube.com/watch?v=${shot.youtube.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
              >
                {dict.portfolio.viewOnYouTube} →
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
