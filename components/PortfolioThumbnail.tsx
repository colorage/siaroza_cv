"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoopingVideoCover } from "@/components/LoopingVideoCover";
import { PortfolioCover } from "@/components/PortfolioCover";
import {
  getPortfolioPageSrcs,
  getPortfolioThumbnailKind,
} from "@/lib/vault/portfolio-utils";
import type { PortfolioShot } from "@/lib/vault/types";

const GALLERY_INTERVAL_MS = 3500;

const shotClass =
  "group absolute inset-0 overflow-hidden rounded-2xl bg-surface text-foreground";

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
  children,
  ariaLabel,
}: {
  href?: string;
  external?: boolean;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (!href) {
    return (
      <div className={className} aria-label={ariaLabel}>
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
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
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
}: {
  srcs: string[];
  title: string;
  href?: string;
  external?: boolean;
  goToImageLabel: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loopingRef = useRef(false);
  const loopTimerRef = useRef<number>(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const settleLoop = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || srcs.length < 2) return;
    const width = el.clientWidth;
    if (!width) return;
    if (el.scrollLeft + 2 < srcs.length * width) return;

    loopingRef.current = false;
    window.clearTimeout(loopTimerRef.current);
    el.scrollTo({ left: 0, behavior: "auto" });
    setIndex(0);
  }, [srcs.length]);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (!width) return;

    if (el.scrollLeft + 2 >= srcs.length * width) {
      settleLoop();
      return;
    }

    if (loopingRef.current) return;
    const next = Math.round(el.scrollLeft / width);
    setIndex(Math.min(Math.max(next, 0), srcs.length - 1));
  }, [settleLoop, srcs.length]);

  const goTo = useCallback(
    (next: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const wrapForward =
        !reduced && next === 0 && index === srcs.length - 1;

      window.clearTimeout(loopTimerRef.current);

      if (wrapForward) {
        loopingRef.current = true;
        el.scrollTo({
          left: srcs.length * el.clientWidth,
          behavior: "smooth",
        });
        loopTimerRef.current = window.setTimeout(() => {
          if (!loopingRef.current) return;
          loopingRef.current = false;
          el.scrollTo({ left: 0, behavior: "auto" });
          setIndex(0);
        }, 1200);
        return;
      }

      loopingRef.current = false;
      el.scrollTo({
        left: next * el.clientWidth,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [index, srcs.length],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScrollEnd = () => settleLoop();
    el.addEventListener("scrollend", onScrollEnd);
    return () => {
      el.removeEventListener("scrollend", onScrollEnd);
      window.clearTimeout(loopTimerRef.current);
    };
  }, [settleLoop]);

  useEffect(() => {
    if (paused || srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      if (document.hidden) return;
      goTo((index + 1) % srcs.length);
    }, GALLERY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [goTo, index, paused, srcs.length]);

  const slides = srcs.length > 1 ? [...srcs, srcs[0]] : srcs;

  return (
    <div
      className={shotClass}
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
        {slides.map((src, i) => {
          const clone = i >= srcs.length;
          const frameClass =
            "relative block h-full min-h-0 flex-[0_0_100%] snap-center overflow-hidden";
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              className="h-full w-full rounded-lg object-contain"
            />
          );

          if (clone) {
            return (
              <div key={`${src}-clone`} className={frameClass} aria-hidden>
                {image}
              </div>
            );
          }

          return (
            <CardLink
              key={src}
              href={href}
              external={external}
              ariaLabel={title}
              className={frameClass}
            >
              {image}
            </CardLink>
          );
        })}
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

  if (kind === "gallery" && shot.pages) {
    return (
      <GalleryThumbnail
        srcs={getPortfolioPageSrcs(shot.pages)}
        title={title}
        href={href}
        external={external}
        goToImageLabel={goToImageLabel}
      />
    );
  }

  return (
    <CardLink href={href} external={external} className={shotClass}>
      {shot.video ? (
        <LoopingVideoCover src={shot.video.src} poster={shot.video.poster} />
      ) : (
        <PortfolioCover cover={shot.cover} />
      )}
      {kind === "video" ? <PlayBadge /> : null}
      <TitleBar title={title} />
    </CardLink>
  );
}
