"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  chart: string;
  title: string;
};

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function mermaidTheme() {
  const background = cssVar("--background", "#0a1414");
  const surface = cssVar("--surface", "#1a2b28");
  const foreground = cssVar("--foreground", "#c8d4d0");
  const border = cssVar("--border-strong", "#c8d4d0");
  const fontFamily =
    cssVar("--font-geist-sans", "") ||
    "ui-sans-serif, system-ui, sans-serif";

  return {
    fontFamily,
    themeVariables: {
      darkMode: true,
      background,
      primaryColor: surface,
      primaryTextColor: foreground,
      primaryBorderColor: border,
      secondaryColor: surface,
      secondaryTextColor: foreground,
      secondaryBorderColor: border,
      tertiaryColor: background,
      tertiaryTextColor: foreground,
      tertiaryBorderColor: border,
      lineColor: border,
      textColor: foreground,
      nodeTextColor: foreground,
      mainBkg: surface,
      nodeBorder: border,
      clusterBkg: background,
      titleColor: foreground,
      edgeLabelBackground: background,
      fontFamily,
    },
  };
}

export function MermaidDiagram({ chart, title }: Props) {
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

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily,
        htmlLabels: false,
        themeVariables,
        flowchart: {
          curve: "basis",
          diagramPadding: 8,
          nodeSpacing: 36,
          rankSpacing: 48,
          useMaxWidth: false,
        },
      });

      const { svg: next } = await mermaid.render(renderId, chart);
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
  }, [chart, reactId]);

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
              className="mermaid-diagram mx-auto w-fit min-w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="min-h-[28rem]" />
          )}
        </div>
      </MediaFrame>
    </figure>
  );
}
