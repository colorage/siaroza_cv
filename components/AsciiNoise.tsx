"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Columns of glyphs. Keep modest so noise stays soft, not grainy. */
  cols?: number;
  /** Rows of glyphs. */
  rows?: number;
};

/** Soft static: mostly empty / light marks, slow refresh. */
const GLYPHS = "  ··..::░░▒";

function fillFrame(cols: number, rows: number): string {
  let out = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Bias toward lighter/empty cells so the field stays open, not grainy.
      const roll = Math.random();
      if (roll < 0.55) {
        out += " ";
      } else {
        out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
    }
    if (y < rows - 1) out += "\n";
  }
  return out;
}

export function AsciiNoise({ className, cols = 28, rows = 6 }: Props) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.textContent = fillFrame(cols, rows);
    if (reduced) return;

    const id = window.setInterval(() => {
      el.textContent = fillFrame(cols, rows);
    }, 140);

    return () => window.clearInterval(id);
  }, [cols, rows]);

  return (
    <pre
      ref={preRef}
      aria-hidden
      className={
        className ??
        "overflow-hidden rounded-xl border border-border bg-[color-mix(in_oklab,#edecec_3%,var(--surface))] p-2 font-mono text-[10px] leading-[1.35] tracking-[0.12em] text-muted select-none"
      }
    />
  );
}
