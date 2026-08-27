import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { MediaCarousel } from "@/components/MediaCarousel";
import { MediaFrame } from "@/components/MediaFrame";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import {
  getPortfolioPageSrcs,
  getPortfolioShotAspect,
  type PortfolioShot,
} from "@/content/portfolio";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  shot: PortfolioShot;
  locale: Locale;
  dict: Dictionary;
};

function previewWellStyle(width: number, height: number): CSSProperties {
  return {
    maxWidth: `min(90rem, calc((100dvh - 10rem) * ${width} / ${height}))`,
  };
}

function PreviewWell({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <div className="flex justify-center px-4 sm:px-6">
      <div className="w-full" style={previewWellStyle(width, height)}>
        {children}
      </div>
    </div>
  );
}

export function PortfolioPiece({ shot, locale, dict }: Props) {
  const title = shot.title[locale];
  const pageMeta = shot.pages;
  const pages = pageMeta ? getPortfolioPageSrcs(pageMeta) : [];
  const aspect = getPortfolioShotAspect(shot);

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href={`/${locale}#portfolio`}
          className="text-[13px] text-muted transition-colors hover:text-foreground"
        >
          ← {dict.portfolio.back}
        </Link>

        <h1 className="mt-10 animate-fade-up text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-foreground">
          {title}
        </h1>
      </div>

      <div className="mt-10 animate-fade-up">
        {shot.youtube ? (
          <PreviewWell width={aspect.width} height={aspect.height}>
            <YouTubeEmbed
              id={shot.youtube.id}
              title={shot.youtube.title[locale]}
              caption={shot.youtube.caption?.[locale]}
            />
          </PreviewWell>
        ) : pageMeta ? (
          <PreviewWell width={pageMeta.width} height={pageMeta.height}>
            <MediaCarousel
              pages={pages}
              alt={title}
              width={pageMeta.width}
              height={pageMeta.height}
              indexTemplate={dict.portfolio.slide}
            />
          </PreviewWell>
        ) : shot.cover ? (
          <PreviewWell width={aspect.width} height={aspect.height}>
            <figure>
              <MediaFrame>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.cover}
                  alt={title}
                  width={1600}
                  height={1200}
                  className="h-auto w-full object-contain"
                />
              </MediaFrame>
            </figure>
          </PreviewWell>
        ) : null}

        {shot.description ? (
          <div className="mx-auto mt-8 max-w-5xl px-6">
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted">
              {shot.description[locale]}
            </p>
          </div>
        ) : null}

        {pageMeta ? (
          <div className="mt-12 space-y-6">
            {pages.map((src, i) => (
              <PreviewWell
                key={src}
                width={pageMeta.width}
                height={pageMeta.height}
              >
                <MediaFrame>
                  <Image
                    src={src}
                    alt={`${title} (${i + 1} / ${pages.length})`}
                    width={pageMeta.width}
                    height={pageMeta.height}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 90rem) calc(100vw - 2rem), 90rem"
                  />
                </MediaFrame>
              </PreviewWell>
            ))}
          </div>
        ) : null}

        {shot.links?.length || shot.dribbbleUrl || shot.youtube ? (
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3 px-6">
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
