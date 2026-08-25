"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  source: string;
  title?: string;
};

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

function cssColorHex(variable: string, fallback: string): string {
  const probe = document.createElement("span");
  probe.style.color = `var(${variable})`;
  document.body.append(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

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

function mermaidTheme() {
  const background = cssColorHex("--background", "#0a1414");
  const surface = cssColorHex("--surface", "#1a2b28");
  const foreground = cssColorHex("--foreground", "#c8d4d0");
  const muted = cssColorHex("--foreground-muted", "#78807d");
  const fontFamily =
    getComputedStyle(document.body).fontFamily ||
    "ui-sans-serif, system-ui, sans-serif";

  return {
    fontFamily,
    themeVariables: {
      darkMode: true,
      background,
      primaryColor: surface,
      primaryTextColor: foreground,
      primaryBorderColor: muted,
      secondaryColor: surface,
      secondaryTextColor: foreground,
      secondaryBorderColor: muted,
      tertiaryColor: background,
      tertiaryTextColor: foreground,
      tertiaryBorderColor: muted,
      lineColor: muted,
      arrowheadColor: muted,
      defaultLinkColor: muted,
      textColor: foreground,
      nodeTextColor: foreground,
      mainBkg: surface,
      nodeBorder: muted,
      clusterBkg: background,
      clusterBorder: muted,
      titleColor: foreground,
      edgeLabelBackground: background,
      fontFamily,
    },
  };
}

export function MermaidDiagram({ source, title }: Props) {
  const reactId = useId().replace(/:/g, "");
  const renderCount = useRef(0);
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    renderCount.current += 1;
    const renderId = `mermaid-${reactId}-${renderCount.current}`;

    async function draw() {
      const mermaid = (await import("mermaid")).default;
      const { fontFamily, themeVariables } = mermaidTheme();
      const themedChart = `${source.trim()}\n  classDef notify fill:${themeVariables.primaryColor},stroke:${themeVariables.lineColor},color:${themeVariables.primaryTextColor}`;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily,
        htmlLabels: true,
        themeVariables,
        flowchart: {
          curve: "basis",
          diagramPadding: 8,
          nodeSpacing: 28,
          rankSpacing: 40,
          wrappingWidth: 200,
          useMaxWidth: true,
        },
      });

      const { svg: next } = await mermaid.render(renderId, themedChart);
      if (!cancelled) {
        setFailed(false);
        setSvg(next);
      }
    }

    draw().catch(() => {
      if (!cancelled) {
        setSvg("");
        setFailed(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [reactId, source]);

  if (failed) return null;

  return (
    <figure className="w-full">
      <MediaFrame className="bg-card">
        <div
          className="overflow-x-auto p-6 md:p-8"
          role="img"
          aria-label={title}
          aria-busy={!svg}
        >
          {svg ? (
            <div
              className="mermaid-diagram w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="min-h-[28rem]" />
          )}
        </div>
      </MediaFrame>
      {title ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
