"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

export type CarouselSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

type Props = {
  slides: CarouselSlide[];
  previousLabel: string;
  nextLabel: string;
};

export function MediaCarousel({ slides, previousLabel, nextLabel }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const clamped = (next + slides.length) % slides.length;
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: "smooth",
      });
    },
    [slides.length],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateIndex = () => {
      const width = el.clientWidth;
      if (!width) return;
      const next = Math.round(el.scrollLeft / width);
      setIndex(Math.min(Math.max(next, 0), slides.length - 1));
    };

    el.addEventListener("scroll", updateIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateIndex);
  }, [slides.length]);

  const active = slides[index] ?? slides[0];

  return (
    <figure className="w-full">
      <MediaFrame>
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-roledescription="carousel"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.src}
              className="min-w-full shrink-0 snap-start snap-always bg-surface"
              role="group"
              aria-roledescription="slide"
              aria-label={slide.caption ?? slide.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </MediaFrame>

      {slides.length > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                aria-label={slide.caption ?? slide.alt}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  slideIndex === index
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-border-strong hover:bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] tracking-wide text-muted tabular-nums">
              {index + 1} / {slides.length}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label={previousLabel}
                onClick={() => goTo(index - 1)}
                className="rounded-full border border-border px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                ←
              </button>
              <button
                type="button"
                aria-label={nextLabel}
                onClick={() => goTo(index + 1)}
                className="rounded-full border border-border px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {active?.caption ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {active.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
