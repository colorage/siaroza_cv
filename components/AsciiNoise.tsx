"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  cols?: number;
  rows?: number;
};

type DotCell = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  shape: "circle" | "square";
  color: string;
};

const CELL_SIZE = 18;
const MIN_RADIUS = 0.9;
const MAX_RADIUS = 4.8;
const SURFACE_COLOR = "#14120b";
const BRIGHT_DOT = "#ffb627";
const DIM_DOT = "#d08a19";

function buildCells(width: number, height: number, densityScale: number): DotCell[] {
  const cols = Math.max(1, Math.ceil(width / CELL_SIZE));
  const rows = Math.max(1, Math.ceil(height / CELL_SIZE));
  const cells: DotCell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const roll = Math.random();
      if (roll < 0.7) continue;

      const x = (col + 0.5) * CELL_SIZE;
      const y = (row + 0.5) * CELL_SIZE;
      const shape = roll > 0.9 ? "square" : "circle";
      const sizeBias = Math.random() ** 0.7;
      cells.push({
        x,
        y,
        size: MIN_RADIUS + sizeBias * MAX_RADIUS * densityScale,
        alpha: shape === "square" ? 0.45 + Math.random() * 0.22 : 0.7 + Math.random() * 0.28,
        shape,
        color: shape === "square" ? DIM_DOT : BRIGHT_DOT,
      });
    }
  }

  return cells;
}

function drawFrame(canvas: HTMLCanvasElement, width: number, height: number, densityScale: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  if (!context) return;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = SURFACE_COLOR;
  context.fillRect(0, 0, width, height);

  const cells = buildCells(width, height, densityScale);
  for (const cell of cells) {
    context.globalAlpha = cell.alpha;
    context.fillStyle = cell.color;
    if (cell.shape === "square") {
      const squareSize = Math.max(1, cell.size * 0.9);
      context.fillRect(cell.x - squareSize / 2, cell.y - squareSize / 2, squareSize, squareSize);
      continue;
    }

    context.beginPath();
    context.arc(cell.x, cell.y, cell.size, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
}

export function AsciiNoise({ className, cols = 28, rows = 6 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const densityScale = Math.max(0.75, Math.min(1.4, (cols * rows) / (28 * 6)));
    let frameWidth = 0;
    let frameHeight = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      frameWidth = rect.width;
      frameHeight = rect.height;
      drawFrame(canvas, rect.width, rect.height, densityScale);
    };

    const observer = new ResizeObserver(() => render());
    observer.observe(canvas);
    render();

    if (reduced.matches) {
      return () => observer.disconnect();
    }

    const id = window.setInterval(() => {
      if (frameWidth && frameHeight) {
        drawFrame(canvas, frameWidth, frameHeight, densityScale);
      } else {
        render();
      }
    }, 240);

    return () => {
      observer.disconnect();
      window.clearInterval(id);
    };
  }, [cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full rounded-[inherit]"}
    />
  );
}
