import type { GraphColors } from "@/components/widgets/obsidian-graph/types";

function toHex(channel: number): string {
  return Math.max(0, Math.min(255, Math.round(channel)))
    .toString(16)
    .padStart(2, "0");
}

function parseRgb(value: string): [number, number, number, number] | null {
  const parts = value.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  const r = Number(parts[0]);
  const g = Number(parts[1]);
  const b = Number(parts[2]);
  const a = parts[3] === undefined ? 1 : Number(parts[3]);
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return [r, g, b, a > 1 ? a / 100 : a];
}

export function cssColorHex(variable: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const probe = document.createElement("span");
  probe.style.color = `var(${variable})`;
  document.body.append(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  if (!computed.startsWith("rgb")) return fallback;

  const parsed = parseRgb(computed);
  if (!parsed) return fallback;
  const [r, g, b, a] = parsed;
  if (a >= 1) return `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  const background = cssColorHex("--background", "#0a1414");
  const br = Number.parseInt(background.slice(1, 3), 16);
  const bg = Number.parseInt(background.slice(3, 5), 16);
  const bb = Number.parseInt(background.slice(5, 7), 16);
  return `#${toHex(r * a + br * (1 - a))}${toHex(g * a + bg * (1 - a))}${toHex(b * a + bb * (1 - a))}`;
}

export function readGraphColors(): GraphColors {
  return {
    background: cssColorHex("--background", "#0a1414"),
    foreground: cssColorHex("--foreground", "#c8d4d0"),
    stroke: cssColorHex("--chart-stroke", "#7c8785"),
    accent: cssColorHex("--accent", "#00d4b8"),
    surface: cssColorHex("--surface", "#1a2b28"),
  };
}

export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
