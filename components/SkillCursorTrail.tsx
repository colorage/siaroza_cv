"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { skills } from "@/content/skills";

const COLORS = [
  "#c8d4d0",
  "#a3b5b0",
  "#7a908c",
  "#4d7a75",
  "#2a6b66",
  "#20b2aa",
  "#00d4b8",
  "#00e5bc",
] as const;

const SPAWN_DISTANCE = 70;
const SPAWN_INTERVAL_MS = 100;
const MAX_BUBBLES = 24;
const LIFETIME_MS = 6000;

type Bubble = {
  id: number;
  x: number;
  y: number;
  skill: string;
  color: string;
};

type Props = {
  children: ReactNode;
};

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function pickSkill(exclude: string | null): string {
  const pool = exclude ? skills.filter((skill) => skill !== exclude) : skills;
  return pick(pool);
}

export function SkillCursorTrail({ children }: Props) {
  const hostRef = useRef<HTMLElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastSkillRef = useRef<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let hasSpawned = false;
    let nextId = 0;
    const timeouts = new Set<number>();

    const spawn = (x: number, y: number) => {
      const id = nextId++;
      const skill = pickSkill(lastSkillRef.current);
      lastSkillRef.current = skill;
      const bubble: Bubble = {
        id,
        x,
        y,
        skill,
        color: pick(COLORS),
      };

      setBubbles((prev) => {
        const next = [...prev, bubble];
        return next.length > MAX_BUBBLES ? next.slice(-MAX_BUBBLES) : next;
      });

      const timeout = window.setTimeout(() => {
        timeouts.delete(timeout);
        setBubbles((prev) => prev.filter((item) => item.id !== id));
      }, LIFETIME_MS);
      timeouts.add(timeout);
    };

    const onPoint = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const now = performance.now();

      if (!hasSpawned) {
        hasSpawned = true;
        lastX = x;
        lastY = y;
        lastTime = now;
        spawn(x, y);
        return;
      }

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < SPAWN_DISTANCE || now - lastTime < SPAWN_INTERVAL_MS) return;

      lastX = x;
      lastY = y;
      lastTime = now;
      spawn(x, y);
    };

    const onPointer = (event: PointerEvent) => {
      // iOS Safari often withholds touch pointermove while panning.
      // Finger movement is handled via touchmove so the page can still scroll.
      if (event.pointerType === "touch" && event.type === "pointermove") return;
      onPoint(event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) return;
      onPoint(touch.clientX, touch.clientY);
    };

    host.addEventListener("pointerdown", onPointer, { passive: true });
    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("touchstart", onTouch, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      host.removeEventListener("pointerdown", onPointer);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("touchstart", onTouch);
      host.removeEventListener("touchmove", onTouch);
      for (const timeout of timeouts) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <section
      ref={hostRef}
      className="relative isolate overflow-hidden md:min-h-[calc(100vh-3.5rem)]"
    >
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="skill-cursor-bubble"
            style={{
              left: bubble.x,
              top: bubble.y,
              backgroundColor: bubble.color,
            }}
          >
            {bubble.skill}
          </span>
        ))}
      </div>
    </section>
  );
}
