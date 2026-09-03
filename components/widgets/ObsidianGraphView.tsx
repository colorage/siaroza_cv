"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { MediaFrame } from "@/components/MediaFrame";
import { readGraphColors, withAlpha } from "@/components/widgets/obsidian-graph/colors";
import graphDataRaw from "@/components/widgets/obsidian-graph/graph-data.json";
import {
  buildNeighborMap,
  highlightSet,
} from "@/components/widgets/obsidian-graph/neighbors";
import type {
  GraphColors,
  GraphData,
  SimLink,
  SimNode,
} from "@/components/widgets/obsidian-graph/types";
import { isLocale, type Locale } from "@/lib/i18n";
import by from "@/messages/by.json";
import en from "@/messages/en.json";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const GRAPH_HEIGHT = 560;
const data = graphDataRaw as GraphData;

type ForceGraphRef = {
  d3Force: (
    name: string,
    force?: unknown,
  ) => unknown;
  zoom: (scale?: number, durationMs?: number) => number;
  centerAt: (x?: number, y?: number, durationMs?: number) => void;
  zoomToFit: (durationMs?: number, padding?: number) => void;
};

function copyFor(locale: Locale) {
  return (locale === "by" ? by : en).widgets.designSystemGraph;
}

function linkEndpointId(value: string | SimNode): string {
  return typeof value === "object" ? value.id : value;
}

function PreviewPanel({
  node,
  copy,
  onClose,
  onLinkClick,
}: {
  node: SimNode;
  copy: ReturnType<typeof copyFor>;
  onClose: () => void;
  onLinkClick: (id: string) => void;
}) {
  return (
    <aside
      className="obsidian-graph-preview pointer-events-auto absolute inset-y-0 right-0 z-20 flex w-[min(100%,280px)] flex-col border-l border-border bg-surface/95 backdrop-blur-sm"
      aria-label={copy.previewLabel}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {node.resolved ? copy.noteLabel : copy.unresolvedLabel}
          </p>
          <h3 className="mt-1 text-[15px] font-medium leading-snug text-foreground">
            {node.label}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="obsidian-graph-preview-close shrink-0 rounded-full border border-border px-2 py-1 text-[12px] text-muted hover:text-foreground"
          aria-label={copy.closePreview}
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {!node.resolved ? (
          <p className="text-[13px] leading-relaxed text-muted">{copy.noFile}</p>
        ) : null}
        {node.links.length > 0 ? (
          <div className="mt-1">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
              {copy.linksLabel}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {node.links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => onLinkClick(link)}
                    className="rounded-full border border-border px-2.5 py-1 text-[12px] text-foreground hover:border-border-strong hover:text-accent"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[13px] leading-relaxed text-muted">{copy.noLinks}</p>
        )}
      </div>
    </aside>
  );
}

export function ObsidianGraphView(props: Record<string, unknown>) {
  const locale: Locale =
    typeof props.locale === "string" && isLocale(props.locale)
      ? props.locale
      : "en";
  const copy = copyFor(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraphRef | null>(null);
  const [width, setWidth] = useState(0);
  const [colors] = useState<GraphColors>(() => readGraphColors());
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const viewCenter = useRef({ x: 0, y: 0 });
  const suppressBackgroundClick = useRef(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const neighbors = useMemo(() => buildNeighborMap(data.links), []);
  const nodeById = useMemo(
    () => new Map(data.nodes.map((node) => [node.id, node])),
    [],
  );
  const activeHighlight = useMemo(
    () => highlightSet(hoverId ?? selectedId, neighbors),
    [hoverId, selectedId, neighbors],
  );
  const selectedNode = selectedId ? nodeById.get(selectedId) : undefined;

  const graphData = useMemo(
    () => ({
      nodes: data.nodes.map((node) => ({ ...node })),
      links: data.links.map((link) => ({ ...link })),
    }),
    [],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;
      setWidth((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    });
    observer.observe(node);
    setWidth(node.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;
    const charge = fg.d3Force("charge") as { strength?: (value: number) => unknown };
    const link = fg.d3Force("link") as {
      distance?: (value: number) => unknown;
      strength?: (value: number) => unknown;
    };
    const center = fg.d3Force("center") as { strength?: (value: number) => unknown };
    charge?.strength?.(-(data.settings.repelStrength ?? 14.77) * 100);
    link?.distance?.(data.settings.linkDistance ?? 160);
    link?.strength?.(data.settings.linkStrength ?? 1);
    center?.strength?.(data.settings.centerStrength ?? 0.51);
  }, [width]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      graphRef.current?.zoomToFit(400, 48);
      setZoomLevel(graphRef.current?.zoom() ?? 1);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, width]);

  const focusNode = useCallback((id: string) => {
    suppressBackgroundClick.current = true;
    setSelectedId(id);
    setHoverId(null);
    const node = graphRef.current
      ? (graphData.nodes.find((entry) => entry.id === id) as SimNode | undefined)
      : undefined;
    if (node && typeof node.x === "number" && typeof node.y === "number") {
      viewCenter.current = { x: node.x, y: node.y };
      graphRef.current?.centerAt(node.x, node.y, 400);
      graphRef.current?.zoom(Math.max(graphRef.current.zoom(), 1.4), 400);
      setZoomLevel(graphRef.current?.zoom() ?? 1);
    }
  }, [graphData.nodes]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const fg = graphRef.current;
    if (!fg) return;
    const step = event.shiftKey ? 48 : 16;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      fg.zoom(fg.zoom() * 1.15, 200);
      setZoomLevel(fg.zoom());
      return;
    }
    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      fg.zoom(fg.zoom() / 1.15, 200);
      setZoomLevel(fg.zoom());
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      viewCenter.current.y -= step / zoomLevel;
      fg.centerAt(viewCenter.current.x, viewCenter.current.y, 0);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      viewCenter.current.y += step / zoomLevel;
      fg.centerAt(viewCenter.current.x, viewCenter.current.y, 0);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      viewCenter.current.x -= step / zoomLevel;
      fg.centerAt(viewCenter.current.x, viewCenter.current.y, 0);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      viewCenter.current.x += step / zoomLevel;
      fg.centerAt(viewCenter.current.x, viewCenter.current.y, 0);
    }
    if (event.key === "Escape") {
      setSelectedId(null);
    }
  };

  const drawNode = useCallback(
    (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const simNode = node as SimNode;
      const radius = simNode.size;
      const highlighted = !activeHighlight || activeHighlight.has(simNode.id);
      const isFocus = simNode.id === hoverId || simNode.id === selectedId;
      const alpha = highlighted ? 1 : 0.15;
      const isNeighbor =
        !!activeHighlight &&
        activeHighlight.has(simNode.id) &&
        !isFocus &&
        !!(hoverId ?? selectedId);
      const nodeFill = isFocus || isNeighbor ? colors.accent : colors.stroke;

      ctx.beginPath();
      ctx.arc(simNode.x ?? 0, simNode.y ?? 0, radius, 0, 2 * Math.PI, false);
      if (simNode.resolved) {
        ctx.fillStyle = withAlpha(nodeFill, alpha);
        ctx.fill();
      } else {
        ctx.strokeStyle = withAlpha(nodeFill, highlighted ? 0.55 : 0.12);
        ctx.lineWidth = 1.5 / globalScale;
        ctx.stroke();
      }

      if (isFocus) {
        ctx.strokeStyle = withAlpha(colors.accent, 0.95);
        ctx.lineWidth = 2 / globalScale;
        ctx.stroke();
      }

      const labelFade = data.settings.textFadeMultiplier ?? 0;
      const labelAlpha =
        labelFade === 0
          ? Math.min(1, (globalScale - 0.35) / 0.45)
          : Math.min(1, globalScale * (1 - labelFade));
      if (labelAlpha > 0.05) {
        const fontSize = Math.max(10 / globalScale, 3);
        ctx.font = `${fontSize}px var(--font-geist-sans, sans-serif)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = withAlpha(colors.foreground, labelAlpha * alpha);
        ctx.fillText(
          simNode.label,
          simNode.x ?? 0,
          (simNode.y ?? 0) + radius + 2 / globalScale,
        );
      }
    },
    [activeHighlight, colors, hoverId, selectedId],
  );

  const linkColor = useCallback(
    (link: object) => {
      const simLink = link as SimLink;
      if (!activeHighlight) return withAlpha(colors.stroke, 0.35);
      const source = linkEndpointId(simLink.source);
      const target = linkEndpointId(simLink.target);
      const focusId = hoverId ?? selectedId;
      const lit =
        !!focusId &&
        activeHighlight.has(source) &&
        activeHighlight.has(target) &&
        (source === focusId || target === focusId);
      return withAlpha(lit ? colors.accent : colors.stroke, lit ? 0.85 : 0.12);
    },
    [activeHighlight, colors, hoverId, selectedId],
  );

  return (
    <figure className="my-8 w-full">
      <MediaFrame className="bg-card">
        <div
          ref={containerRef}
          className="obsidian-graph-canvas relative"
          style={{ height: GRAPH_HEIGHT }}
          role="application"
          tabIndex={0}
          aria-label={copy.canvasLabel}
          onKeyDown={handleKeyDown}
        >
          {width > 0 ? (
            <ForceGraph2D
              ref={graphRef as never}
              width={width}
              height={GRAPH_HEIGHT}
              graphData={graphData}
              backgroundColor={colors.background}
              nodeId="id"
              nodeRelSize={1}
              nodeVal={(node) => (node as SimNode).size}
              nodeCanvasObjectMode={() => "replace"}
              nodeCanvasObject={drawNode}
              nodePointerAreaPaint={(node, color, ctx) => {
                const simNode = node as SimNode;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(
                  simNode.x ?? 0,
                  simNode.y ?? 0,
                  simNode.size + 4,
                  0,
                  2 * Math.PI,
                  false,
                );
                ctx.fill();
              }}
              linkColor={linkColor}
              linkWidth={(link) => {
                const simLink = link as SimLink;
                if (!activeHighlight) return data.settings.lineSizeMultiplier ?? 1;
                const source = linkEndpointId(simLink.source);
                const target = linkEndpointId(simLink.target);
                const lit =
                  activeHighlight.has(source) && activeHighlight.has(target);
                return lit ? 1.6 : 0.8;
              }}
              linkDirectionalParticles={0}
              enableNodeDrag
              enableZoomInteraction
              enablePanInteraction
              cooldownTicks={reducedMotion ? 0 : undefined}
              onEngineStop={() => {
                if (reducedMotion) graphRef.current?.zoomToFit(0, 48);
              }}
              onNodeHover={(node) => setHoverId(node ? (node as SimNode).id : null)}
              onNodeClick={(node) => focusNode((node as SimNode).id)}
              onBackgroundClick={() => {
                if (suppressBackgroundClick.current) {
                  suppressBackgroundClick.current = false;
                  return;
                }
                setSelectedId(null);
              }}
              onZoom={(transform) => setZoomLevel(transform.k)}
            />
          ) : null}
          {selectedNode ? (
            <PreviewPanel
              node={selectedNode}
              copy={copy}
              onClose={() => setSelectedId(null)}
              onLinkClick={focusNode}
            />
          ) : null}
        </div>
      </MediaFrame>
      <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-muted">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
