"use client";

import { useEffect, useId, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  source: string;
  title?: string;
};

let mermaidInit: Promise<typeof import("mermaid").default> | null = null;

function loadMermaid() {
  if (!mermaidInit) {
    mermaidInit = import("mermaid").then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          darkMode: true,
          background: "#1a2b28",
          primaryColor: "#0d1918",
          primaryTextColor: "#c8d4d0",
          primaryBorderColor: "#3d524e",
          lineColor: "#7a8f8a",
          secondaryColor: "#0a1414",
          tertiaryColor: "#0a1414",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        },
      });
      return mermaid;
    });
  }
  return mermaidInit;
}

export function MermaidDiagram({ source, title }: Props) {
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMermaid()
      .then((mermaid) => mermaid.render(`diagram-${reactId}`, source))
      .then(({ svg: nextSvg }) => {
        if (!cancelled) setSvg(nextSvg);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reactId, source]);

  if (failed) return null;

  return (
    <figure className="w-full">
      <MediaFrame className="bg-surface">
        {svg ? (
          <div
            className="mermaid-diagram overflow-x-auto p-4 md:p-6"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="h-48 bg-surface" aria-hidden />
        )}
      </MediaFrame>
      {title ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
