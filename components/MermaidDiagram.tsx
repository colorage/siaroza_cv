"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function ensureMermaid() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "dark",
    themeVariables: {
      darkMode: true,
      background: "#0a1414",
      primaryColor: "#1a2b28",
      primaryTextColor: "#c8d4d0",
      primaryBorderColor: "#4d7a75",
      lineColor: "#7a908c",
      secondaryColor: "#0d1918",
      tertiaryColor: "#1a2b28",
      mainBkg: "#1a2b28",
      nodeBorder: "#4d7a75",
      clusterBkg: "#0d1918",
      titleColor: "#c8d4d0",
      edgeLabelBackground: "#0a1414",
      tertiaryTextColor: "#c8d4d0",
    },
  });
  initialized = true;
}

type Props = {
  chart: string;
};

export function MermaidDiagram({ chart }: Props) {
  const reactId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    ensureMermaid();
    const id = `mermaid-${reactId}`;
    const run = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Mermaid error");
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-2xl border border-border bg-surface p-4 font-mono text-[13px] text-muted">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto rounded-2xl border border-border bg-surface p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
    />
  );
}
