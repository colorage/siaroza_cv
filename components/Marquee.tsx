"use client";

import { useEffect, useRef, type ReactNode } from "react";

const INERTIA_MS = 700;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

type Props = {
  children: ReactNode;
  className?: string;
};

export function Marquee({ children, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef(1);
  const fromRef = useRef(1);
  const targetRef = useRef(1);
  const startedAtRef = useRef(0);
  const rafRef = useRef(0);

  const applyRate = (rate: number) => {
    const root = rootRef.current;
    if (!root) return;
    for (const track of root.querySelectorAll<HTMLElement>(".marquee-track")) {
      for (const animation of track.getAnimations()) {
        animation.playbackRate = rate;
      }
    }
  };

  const stopTween = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  const setTarget = (target: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    fromRef.current = rateRef.current;
    targetRef.current = target;
    startedAtRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAtRef.current) / INERTIA_MS);
      rateRef.current =
        fromRef.current + (targetRef.current - fromRef.current) * easeOutCubic(t);
      applyRate(rateRef.current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      rateRef.current = targetRef.current;
      applyRate(rateRef.current);
      rafRef.current = 0;
    };

    stopTween();
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => stopTween(), []);

  return (
    <div
      ref={rootRef}
      className={className}
      onMouseEnter={() => setTarget(0)}
      onMouseLeave={() => setTarget(1)}
      onFocusCapture={() => setTarget(0)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setTarget(1);
        }
      }}
    >
      {children}
    </div>
  );
}
