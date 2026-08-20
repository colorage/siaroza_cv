"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

type TrailPoint = {
  x: number;
  y: number;
  intensity: number;
};

type Ripple = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  startTime: number;
  duration: number;
  intensity: number;
};

type PointerSample = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lastTime: number;
};

const CELL_SIZE = 12;
const CHARACTERS = " .:+*#@";
const COLOR_GREY = "#8a8882";
const COLOR_YELLOW = "#d7b14a";
const COLOR_ORANGE = "#f54e00";
const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;

const NOISE_SCALE = 0.015;
const NOISE_OCTAVES = 2;
const NOISE_PERSISTENCE = 0.9;
const NOISE_LACUNARITY = 1.8;
const NOISE_SPEED = 1e-4;
const NOISE_CONTRAST = 0.8;
const INTENSITY_CUTOFF = 0.05;

const TRAIL_LENGTH = 50;
const TRAIL_DECAY = 0.08;
const TRAIL_INTENSITY = 0.75;
const TRAIL_SPEED_MULTIPLIER = 5;
const INFLUENCE_RADIUS = 80;
const TRAIL_FADE_MS = 300;
const TRAIL_IDLE_MS = 500;

const RIPPLE_SPEED = 450;
const RIPPLE_DURATION = 700;
const RIPPLE_INTENSITY = 1.2;
const RIPPLE_DIRECTION_FORCE = 0.1;
const RIPPLE_BAND = 50;

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const GRAD2 = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createNoise2D(seed: number) {
  const rand = mulberry32(seed);
  const source = new Uint8Array(256);
  for (let i = 0; i < 256; i++) source[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const swap = source[i];
    source[i] = source[j];
    source[j] = swap;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = source[i & 255];

  return (xin: number, yin: number) => {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;

    const n0 = contrib(x0, y0, perm[ii + perm[jj]]);
    const n1 = contrib(x1, y1, perm[ii + i1 + perm[jj + j1]]);
    const n2 = contrib(x2, y2, perm[ii + 1 + perm[jj + 1]]);
    return 70 * (n0 + n1 + n2);
  };
}

function contrib(x: number, y: number, gi: number) {
  const t = 0.5 - x * x - y * y;
  if (t < 0) return 0;
  const g = GRAD2[gi & 7];
  const t2 = t * t;
  return t2 * t2 * (g[0] * x + g[1] * y);
}

function octaveNoise(
  noise2D: (x: number, y: number) => number,
  x: number,
  y: number,
  time: number,
) {
  let sum = 0;
  let amp = 1;
  let freq = NOISE_SCALE;
  let norm = 0;
  const shift = time * 1000;

  for (let o = 0; o < NOISE_OCTAVES; o++) {
    sum += noise2D((x + shift) * freq, (y + shift) * freq) * amp;
    norm += amp;
    amp *= NOISE_PERSISTENCE;
    freq *= NOISE_LACUNARITY;
  }

  return (sum / norm + 1) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

const GREY_RGB = hexToRgb(COLOR_GREY);
const YELLOW_RGB = hexToRgb(COLOR_YELLOW);
const ORANGE_RGB = hexToRgb(COLOR_ORANGE);

function mixRgb(a: [number, number, number], b: [number, number, number], t: number) {
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `rgb(${r} ${g} ${bl})`;
}

function colorFor(intensity: number) {
  if (intensity < 0.62) {
    const t = intensity / 0.62;
    return mixRgb(GREY_RGB, YELLOW_RGB, t * t);
  }
  return mixRgb(YELLOW_RGB, ORANGE_RGB, (intensity - 0.62) / 0.38);
}

function glyphFor(intensity: number) {
  const index = Math.floor(intensity * (CHARACTERS.length - 1));
  return CHARACTERS[Math.max(0, Math.min(CHARACTERS.length - 1, index))];
}

function trailAt(points: TrailPoint[], x: number, y: number, fade: number) {
  if (points.length === 0 || fade <= 0) return 0;
  let strongest = 0;
  for (const point of points) {
    const dx = x - point.x;
    const dy = y - point.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < INFLUENCE_RADIUS) {
      strongest = Math.max(strongest, (1 - dist / INFLUENCE_RADIUS) * point.intensity);
    }
  }
  return strongest * fade;
}

function rippleAt(ripples: Ripple[], x: number, y: number, now: number) {
  if (ripples.length === 0) return 0;
  let sum = 0;
  for (const ripple of ripples) {
    const elapsed = now - ripple.startTime;
    const life = elapsed / ripple.duration;
    if (life >= 1) continue;
    const age = elapsed / 1000;
    const cx = ripple.x + ripple.vx * age;
    const cy = ripple.y + ripple.vy * age;
    const dist = Math.hypot(x - cx, y - cy);
    const radius = age * RIPPLE_SPEED;
    const band = Math.abs(dist - radius);
    if (band < RIPPLE_BAND) {
      sum += ripple.intensity * (1 - life) * (1 - band / RIPPLE_BAND);
    }
  }
  return Math.min(1, sum);
}

export function AsciiNoise({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const noise2D = createNoise2D(0x61736369);
    const trail: TrailPoint[] = [];
    const ripples: Ripple[] = [];

    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let raf = 0;
    let lastFrame = 0;
    let visible = true;
    let reduced = media.matches;
    let pointer: PointerSample | null = null;
    let trailFade = 0;
    let lastMove = 0;
    let font = `${CELL_SIZE}px ui-monospace, monospace`;
    let fadeAnchor = 0;
    let fadeFrom = 0;
    let fadeTo = 0;

    const context = canvas.getContext("2d");
    if (!context) return;

    const setTrailTarget = (next: number) => {
      fadeFrom = trailFade;
      fadeTo = next;
      fadeAnchor = performance.now();
    };

    const currentFade = (now: number) => {
      const t = Math.min(1, (now - fadeAnchor) / TRAIL_FADE_MS);
      trailFade = lerp(fadeFrom, fadeTo, t);
      return trailFade;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.ceil(width / CELL_SIZE));
      rows = Math.max(1, Math.ceil(height / CELL_SIZE));
      const family = getComputedStyle(canvas).fontFamily || "ui-monospace, monospace";
      font = `${CELL_SIZE}px ${family}`;
    };

    const draw = (now: number) => {
      if (!cols || !rows) return;
      context.clearRect(0, 0, width, height);
      context.font = font;
      context.textAlign = "center";
      context.textBaseline = "middle";

      const fade = currentFade(now);
      if (now - lastMove > TRAIL_IDLE_MS && fadeTo !== 0) {
        setTrailTarget(0);
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * CELL_SIZE + CELL_SIZE / 2;
          const y = row * CELL_SIZE + CELL_SIZE / 2;
          let intensity = (1 - octaveNoise(noise2D, col, row, time)) * NOISE_CONTRAST;
          intensity += trailAt(trail, x, y, fade) * TRAIL_INTENSITY;
          intensity = Math.min(1, intensity + rippleAt(ripples, x, y, now) * RIPPLE_INTENSITY);
          if (intensity < INTENSITY_CUTOFF) continue;
          context.fillStyle = colorFor(intensity);
          context.fillText(glyphFor(intensity), x, y);
        }
      }
    };

    const tick = (now: number) => {
      if (now - lastFrame >= FRAME_MS) {
        time += NOISE_SPEED;
        for (const point of trail) point.intensity *= 1 - TRAIL_DECAY;
        let write = 0;
        for (const point of trail) {
          if (point.intensity > 0.02) trail[write++] = point;
        }
        trail.length = write;
        let rippleWrite = 0;
        for (const ripple of ripples) {
          if (now - ripple.startTime < ripple.duration) ripples[rippleWrite++] = ripple;
        }
        ripples.length = rippleWrite;
        draw(now);
        lastFrame = now;
      }
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (reduced || !visible || raf) return;
      lastFrame = 0;
      raf = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const localPoint = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onMove = (event: MouseEvent) => {
      if (reduced) return;
      const { x, y } = localPoint(event);
      const now = performance.now();
      lastMove = now;
      if (fadeTo !== 1) setTrailTarget(1);
      let vx = 0;
      let vy = 0;
      if (pointer) {
        const dt = Math.max(now - pointer.lastTime, 1) / 1000;
        vx = (x - pointer.x) / dt;
        vy = (y - pointer.y) / dt;
        const gap = Math.hypot(x - pointer.x, y - pointer.y);
        const step = INFLUENCE_RADIUS * 0.5;
        if (gap > step) {
          const count = Math.ceil(gap / step);
          for (let i = 1; i < count; i++) {
            const t = i / count;
            trail.push({
              x: pointer.x + (x - pointer.x) * t,
              y: pointer.y + (y - pointer.y) * t,
              intensity: TRAIL_INTENSITY * (0.8 + 0.2 * t),
            });
          }
        }
      }
      const speedBoost = Math.min(1, (Math.hypot(vx, vy) / 1000) * TRAIL_SPEED_MULTIPLIER);
      trail.push({ x, y, intensity: TRAIL_INTENSITY * (1 + speedBoost) });
      if (trail.length > TRAIL_LENGTH) trail.splice(0, trail.length - TRAIL_LENGTH);
      pointer = { x, y, vx, vy, lastTime: now };
    };

    const onLeave = () => {
      pointer = null;
      setTrailTarget(0);
    };

    const onDown = (event: MouseEvent) => {
      if (reduced) return;
      const { x, y } = localPoint(event);
      ripples.push({
        x,
        y,
        vx: (pointer?.vx ?? 0) * RIPPLE_DIRECTION_FORCE,
        vy: (pointer?.vy ?? 0) * RIPPLE_DIRECTION_FORCE,
        startTime: performance.now(),
        duration: RIPPLE_DURATION,
        intensity: 1,
      });
    };

    const renderStatic = () => {
      resize();
      time = 0;
      trail.length = 0;
      ripples.length = 0;
      trailFade = 0;
      draw(performance.now());
    };

    const applyMotionPreference = () => {
      reduced = media.matches;
      stopLoop();
      if (reduced) {
        renderStatic();
        return;
      }
      resize();
      startLoop();
    };

    resize();
    if (reduced) {
      renderStatic();
    } else {
      startLoop();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (!visible) {
        stopLoop();
        return;
      }
      if (reduced) {
        draw(performance.now());
        return;
      }
      startLoop();
    });
    intersectionObserver.observe(canvas);

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousedown", onDown);
    media.addEventListener("change", applyMotionPreference);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousedown", onDown);
      media.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "font-mono absolute inset-0 h-full w-full rounded-[inherit]"}
      style={{ imageRendering: "pixelated", touchAction: "pan-y", cursor: "crosshair" }}
    />
  );
}
