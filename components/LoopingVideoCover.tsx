"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
};

export function LoopingVideoCover({ src, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduced.matches) {
        el.pause();
        el.currentTime = 0;
        return;
      }
      void el.play().catch(() => {});
    };

    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, [src]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-contain"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
    />
  );
}
