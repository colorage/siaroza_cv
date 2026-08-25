"use client";

import { useEffect, useId, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  source: string;
  caption?: string;
};

let mermaidReady = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!mermaidReady) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "dark",
      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      flowchart: {
        htmlLabels: true,
        wrappingWidth: 240,
        curve: "basis",
        padding: 16,
      },
      themeVariables: {
        darkMode: true,
        background: "#0d1918",
        primaryColor: "#1a2b28",
        primaryTextColor: "#c8d4d0",
        primaryBorderColor: "#4a5f5b",
        lineColor: "#8aa09a",
        secondaryColor: "#1a2b28",
        tertiaryColor: "#0a1414",
        nodeBorder: "#4a5f5b",
        mainBkg: "#1a2b28",
        nodeTextColor: "#c8d4d0",
        titleColor: "#c8d4d0",
        edgeLabelBackground: "#0d1918",
        clusterBkg: "#0a1414",
        clusterBorder: "#4a5f5b",
        tertiaryTextColor: "#c8d4d0",
        textColor: "#c8d4d0",
      },
    });
    mermaidReady = true;
  }
  return mermaid;
}

export function MermaidDiagram({ source, caption }: Props) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = `mmd${reactId}`;

    (async () => {
      try {
        const mermaid = await getMermaid();
        const { svg: rendered } = await mermaid.render(id, source.trim());
        if (!cancelled) {
          setError(false);
          setSvg(rendered);
        }
      } catch {
        if (!cancelled) {
          setSvg(null);
          setError(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reactId, source]);

  return (
    <figure className="w-full">
      <MediaFrame className="bg-card">
        <div className="mermaid-diagram overflow-x-auto p-4 md:p-6">
          {error ? (
            <p className="text-[13px] text-muted">Diagram unavailable.</p>
          ) : svg ? (
            <div
              role="img"
              aria-label={caption}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="min-h-40" aria-hidden />
          )}
        </div>
      </MediaFrame>
      {caption ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
