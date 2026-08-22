"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  pages: string[];
  alt: string;
  width: number;
  height: number;
  indexTemplate: string;
};

export function MediaCarousel({
  pages,
  alt,
  width,
  height,
  indexTemplate,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.min(Math.max(next, 0), pages.length - 1));
  }, [pages.length]);

  const label = indexTemplate
    .replace("{current}", String(index + 1))
    .replace("{total}", String(pages.length));

  return (
    <figure className="w-full">
      <MediaFrame>
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={alt}
        >
          {pages.map((src, i) => (
            <div
              key={src}
              className="w-full shrink-0 snap-center"
              aria-hidden={i !== index}
            >
              <Image
                src={src}
                alt={`${alt} (${i + 1} / ${pages.length})`}
                width={width}
                height={height}
                className="h-auto w-full"
                sizes="(max-width: 64rem) calc(100vw - 3rem), 64rem"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </MediaFrame>
      <figcaption className="mt-3 font-mono text-[12px] tracking-wide text-muted uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
