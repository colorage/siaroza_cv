"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { PortfolioCover } from "@/components/PortfolioCover";
import {
  getPortfolioPageSrcs,
  getPortfolioThumbnailKind,
  type PortfolioShot,
} from "@/content/portfolio";

const shotClass =
  "group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-surface text-foreground";

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
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-end bg-gradient-to-t from-[color-mix(in_oklab,#14120b_78%,transparent)] via-[color-mix(in_oklab,#14120b_12%,transparent)] to-transparent p-4 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
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
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--background)_55%,transparent)] text-foreground shadow-[0_8px_24px_color-mix(in_oklab,#14120b_40%,transparent)] ring-1 ring-foreground/20 backdrop-blur-[2px] transition-transform duration-200 group-hover:scale-105">
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
  const [index, setIndex] = useState(0);

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
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <div className={shotClass}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className="relative block h-full min-w-full shrink-0 snap-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
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
      <PortfolioCover slug={shot.slug} title={title} cover={shot.cover} />
      {kind === "video" ? <PlayBadge /> : null}
      <TitleBar title={title} />
    </CardLink>
  );
}
