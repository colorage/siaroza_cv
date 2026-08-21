"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/content/skills";

const COLORS = [
  "#d9d4c8",
  "#b8b2a4",
  "#9a9488",
  "#f4cf5b",
  "#e8b84a",
  "#ff8a3d",
  "#f54e00",
  "#e07a2f",
] as const;

const SPAWN_DISTANCE = 70;
const SPAWN_INTERVAL_MS = 100;
const MAX_BUBBLES = 12;
const LIFETIME_MS = 6000;

type Bubble = {
  id: number;
  x: number;
  y: number;
  skill: string;
  color: string;
};

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function pickSkill(exclude: string | null): string {
  const pool = exclude ? skills.filter((skill) => skill !== exclude) : skills;
  return pick(pool);
}

export function SkillCursorTrail() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastSkillRef = useRef<string | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

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

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
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

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      for (const timeout of timeouts) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none">
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
          <span className="skill-cursor-caret" />
        </span>
      ))}
    </div>
  );
}
