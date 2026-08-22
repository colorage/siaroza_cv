"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioCover } from "@/components/PortfolioCover";
import {
  getPortfolioPageSrcs,
  getPortfolioThumbnailKind,
  type PortfolioShot,
} from "@/content/portfolio";

const CARD_HEIGHT = "15rem";
const GALLERY_INTERVAL_MS = 3500;
const GALLERY_MIN_START_DELAY_MS = 400;
const GALLERY_INTERVAL_JITTER_MS = 900;

function randomGalleryTiming(): { delayMs: number; intervalMs: number } {
  return {
    delayMs:
      GALLERY_MIN_START_DELAY_MS +
      Math.floor(
        Math.random() * (GALLERY_INTERVAL_MS - GALLERY_MIN_START_DELAY_MS),
      ),
    intervalMs:
      GALLERY_INTERVAL_MS +
      Math.floor(Math.random() * (GALLERY_INTERVAL_JITTER_MS + 1)) -
      Math.floor(GALLERY_INTERVAL_JITTER_MS / 2),
  };
}

const shotClass =
  "group relative block h-60 shrink-0 overflow-hidden bg-surface text-foreground";

function getShotBox(shot: PortfolioShot): CSSProperties {
  const width = shot.pages?.width ?? (shot.youtube ? 16 : 4);
  const height = shot.pages?.height ?? (shot.youtube ? 9 : 3);
  return {
    width: `calc(${CARD_HEIGHT} * ${width} / ${height})`,
  };
}

type Props = {
  shot: PortfolioShot;
  title: string;
  href?: string;
  external?: boolean;
  goToImageLabel: string;
};

function CardLink({
  href,
  external,
  className,
  style,
  children,
  ariaLabel,
}: {
  href?: string;
  external?: boolean;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (!href) {
    return (
      <div className={className} style={style} aria-label={ariaLabel}>
        {children}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function TitleBar({
  title,
  trailing,
}: {
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-end bg-gradient-to-t from-[color-mix(in_oklab,var(--background)_78%,transparent)] via-[color-mix(in_oklab,var(--background)_12%,transparent)] to-transparent p-4 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
      <div className="flex w-full items-end justify-between gap-3">
        <h3
          className={`min-w-0 text-[15px] tracking-tight text-foreground${
            trailing ? " truncate" : ""
          }`}
        >
          {title}
        </h3>
        {trailing}
      </div>
    </div>
  );
}

function PlayBadge() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      aria-hidden
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--background)_55%,transparent)] text-foreground shadow-[0_8px_24px_color-mix(in_oklab,var(--background)_40%,transparent)] ring-1 ring-foreground/20 backdrop-blur-[2px] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <svg
          viewBox="0 0 24 24"
          className="ml-0.5 h-5 w-5"
          fill="currentColor"
        >
          <path d="M8.4 5.6v12.8L19.2 12 8.4 5.6Z" />
        </svg>
      </span>
    </div>
  );
}

function GalleryThumbnail({
  srcs,
  title,
  href,
  external,
  goToImageLabel,
  box,
}: {
  srcs: string[];
  title: string;
  href?: string;
  external?: boolean;
  goToImageLabel: string;
  box: CSSProperties;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const timingRef = useRef<ReturnType<typeof randomGalleryTiming> | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  indexRef.current = index;
  pausedRef.current = paused;

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.min(Math.max(next, 0), srcs.length - 1));
  }, [srcs.length]);

  const goTo = useCallback((next: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const current = indexRef.current;
    const wrap = next <= current && current === srcs.length - 1;
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: reduced || wrap ? "auto" : "smooth",
    });
  }, [srcs.length]);

  useEffect(() => {
    if (srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tick = () => {
      if (document.hidden || pausedRef.current) return;
      goTo((indexRef.current + 1) % srcs.length);
    };

    timingRef.current ??= randomGalleryTiming();
    const { delayMs, intervalMs } = timingRef.current;
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, intervalMs);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [goTo, srcs.length]);

  return (
    <div
      className={shotClass}
      style={box}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex h-full min-h-0 w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
      >
        {srcs.map((src) => (
          <CardLink
            key={src}
            href={href}
            external={external}
            ariaLabel={title}
            className="relative block h-full min-h-0 flex-[0_0_100%] snap-center overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full rounded-lg object-contain"
            />
          </CardLink>
        ))}
      </div>
      <TitleBar
        title={title}
        trailing={
          <div className="pointer-events-auto relative z-10 flex shrink-0 items-center gap-1.5">
            {srcs.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={goToImageLabel
                  .replace("{n}", String(i + 1))
                  .replace("{total}", String(srcs.length))}
                aria-current={i === index || undefined}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-4 bg-foreground"
                    : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
                }`}
              />
            ))}
          </div>
        }
      />
    </div>
  );
}

export function PortfolioThumbnail({
  shot,
  title,
  href,
  external,
  goToImageLabel,
}: Props) {
  const kind = getPortfolioThumbnailKind(shot);

  const box = getShotBox(shot);

  if (kind === "gallery" && shot.pages) {
    return (
      <GalleryThumbnail
        srcs={getPortfolioPageSrcs(shot.pages)}
        title={title}
        href={href}
        external={external}
        goToImageLabel={goToImageLabel}
        box={box}
      />
    );
  }

  return (
    <CardLink
      href={href}
      external={external}
      className={shotClass}
      style={box}
    >
      <PortfolioCover cover={shot.cover} />
      {kind === "video" ? <PlayBadge /> : null}
      <TitleBar title={title} />
    </CardLink>
  );
}
