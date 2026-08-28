"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { isLocale, type Locale } from "@/lib/i18n";
import by from "@/messages/by.json";
import en from "@/messages/en.json";

const MEDIA_DIR = "/media/case-studies/streaming-thumbnails/widget";

const TITLES = [
  { id: "stranger_things", alt: "Stranger Things" },
  { id: "wednesday", alt: "Wednesday" },
  { id: "bojack_horseman", alt: "BoJack Horseman" },
  { id: "drive_to_survive", alt: "Drive to Survive" },
  { id: "1670", alt: "1670" },
] as const;

type TitleMode = "original" | "common";
type Gradient = "none" | "dark" | "original" | "bright";

const GRADIENTS: Gradient[] = ["none", "dark", "original", "bright"];
const SIZES = ["tiny", "small", "medium", "large"] as const;
type PosterSize = (typeof SIZES)[number];
const RATIOS = [
  { token: "1_2", w: 1, h: 2, label: "1:2" },
  { token: "9_16", w: 9, h: 16, label: "9:16" },
  { token: "2_3", w: 2, h: 3, label: "2:3" },
  { token: "3_4", w: 3, h: 4, label: "3:4" },
  { token: "1_1", w: 1, h: 1, label: "1:1" },
  { token: "4_3", w: 4, h: 3, label: "4:3" },
  { token: "3_2", w: 3, h: 2, label: "3:2" },
  { token: "16_9", w: 16, h: 9, label: "16:9" },
  { token: "2_1", w: 2, h: 1, label: "2:1" },
] as const;
const DEFAULT_RATIO_INDEX = 3;
const MIN_GAP = 8;
const REF_RATIO = 3 / 4;

const SKIN_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const SKIN_BY_STATE: Record<TitleMode, Record<Gradient, string>> = {
  original: { none: "a", dark: "b", original: "c", bright: "d" },
  common: { none: "e", dark: "f", original: "g", bright: "h" },
};

function posterSrc(
  titleId: string,
  skin: string,
  ratioToken: string,
  size: PosterSize,
): string {
  return `${MEDIA_DIR}/netflix@${titleId}-style-${skin}-${ratioToken}-${size}.webp`;
}

function copyFor(locale: Locale) {
  return (locale === "by" ? by : en).widgets.thumbnailPipeline;
}

function layoutFor(containerWidth: number, ratioW: number, ratioH: number) {
  const width = containerWidth > 0 ? containerWidth : 1024;
  let height =
    (width - (TITLES.length - 1) * MIN_GAP) / TITLES.length / REF_RATIO;
  height = Math.max(height, 64);
  let thumbWidth = height * (ratioW / ratioH);
  let visible: number = TITLES.length;
  while (visible > 1) {
    const needed = visible * thumbWidth + (visible - 1) * MIN_GAP;
    if (needed <= width + 0.5) break;
    visible -= 2;
  }
  if (visible === 1 && thumbWidth > width) {
    const scale = width / thumbWidth;
    thumbWidth = width;
    height *= scale;
  }
  const gap = visible > 1 ? (width - visible * thumbWidth) / (visible - 1) : 0;
  const hide = (TITLES.length - visible) / 2;
  return { height, thumbWidth, gap, hide, visible };
}

function TitleSwitch({
  value,
  originalLabel,
  commonLabel,
  groupLabel,
  onChange,
}: {
  value: TitleMode;
  originalLabel: string;
  commonLabel: string;
  groupLabel: string;
  onChange: (value: TitleMode) => void;
}) {
  const common = value === "common";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={`font-mono text-[12px] tracking-wide uppercase transition-colors ${
          common ? "text-muted hover:text-foreground" : "text-foreground"
        }`}
        onClick={() => onChange("original")}
      >
        {originalLabel}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={common}
        aria-label={groupLabel}
        onClick={() => onChange(common ? "original" : "common")}
        className="relative h-6 w-10 shrink-0 rounded-full border border-border-strong bg-surface"
      >
        <span
          aria-hidden
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-button transition-transform motion-reduce:transition-none ${
            common ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <button
        type="button"
        className={`font-mono text-[12px] tracking-wide uppercase transition-colors ${
          common ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
        onClick={() => onChange("common")}
      >
        {commonLabel}
      </button>
    </div>
  );
}

function DiscreteSlider({
  valuesLength,
  index,
  groupLabel,
  valueText,
  onChange,
  ticks,
  endLabels,
}: {
  valuesLength: number;
  index: number;
  groupLabel: string;
  valueText: string;
  onChange: (index: number) => void;
  ticks?: readonly string[];
  endLabels?: readonly [string, string];
}) {
  const sliderId = useId();

  return (
    <div className="flex w-64 max-w-full flex-col gap-2">
      <label htmlFor={sliderId} className="sr-only">
        {groupLabel}
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={valuesLength - 1}
        step={1}
        value={index}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value))}
        className="thumbnail-gradient-slider"
      />
      {ticks ? (
        <div className="flex justify-between">
          {ticks.map((label, tickIndex) => (
            <span
              key={`${label}-${tickIndex}`}
              className={`font-mono text-[11px] tracking-wide uppercase ${
                tickIndex === index ? "text-foreground" : "text-muted"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      ) : endLabels ? (
        <div className="flex justify-between">
          <span
            className={`font-mono text-[11px] tracking-wide uppercase ${
              index === 0 ? "text-foreground" : "text-muted"
            }`}
          >
            {endLabels[0]}
          </span>
          <span
            className={`font-mono text-[11px] tracking-wide uppercase ${
              index === valuesLength - 1 ? "text-foreground" : "text-muted"
            }`}
          >
            {endLabels[1]}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function ThumbnailPipeline(props: Record<string, unknown>) {
  const locale: Locale =
    typeof props.locale === "string" && isLocale(props.locale)
      ? props.locale
      : "en";
  const copy = copyFor(locale);
  const [titleMode, setTitleMode] = useState<TitleMode>("original");
  const [gradient, setGradient] = useState<Gradient>("none");
  const [size, setSize] = useState<PosterSize>("medium");
  const [ratioIndex, setRatioIndex] = useState(DEFAULT_RATIO_INDEX);
  const [rowWidth, setRowWidth] = useState(0);
  const rowRef = useRef<HTMLUListElement>(null);
  const ratio = RATIOS[ratioIndex] ?? RATIOS[DEFAULT_RATIO_INDEX];
  const skin = SKIN_BY_STATE[titleMode][gradient];
  const layout = useMemo(
    () => layoutFor(rowWidth, ratio.w, ratio.h),
    [rowWidth, ratio.w, ratio.h],
  );

  useLayoutEffect(() => {
    const node = rowRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;
      setRowWidth((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    });
    observer.observe(node);
    setRowWidth(node.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    for (const title of TITLES) {
      for (const letter of SKIN_LETTERS) {
        const img = new window.Image();
        img.src = posterSrc(title.id, letter, ratio.token, size);
      }
    }
  }, [ratio.token, size]);

  const lastVisible = TITLES.length - 1 - layout.hide;

  return (
    <figure className="relative left-1/2 my-8 w-[min(100vw-3rem,64rem)] -translate-x-1/2">
      <ul
        ref={rowRef}
        aria-label={copy.posters}
        className="thumbnail-pipeline-row flex justify-center overflow-hidden"
        style={{ height: layout.height }}
      >
        {TITLES.map((title, index) => {
          const visible = index >= layout.hide && index <= lastVisible;
          const last = index === lastVisible;
          return (
            <li
              key={title.id}
              aria-hidden={!visible}
              className="thumbnail-pipeline-item relative overflow-hidden rounded-lg bg-surface"
              style={{
                width: visible ? layout.thumbWidth : 0,
                height: layout.height,
                marginRight: visible && !last ? layout.gap : 0,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <Image
                src={posterSrc(title.id, skin, ratio.token, size)}
                alt={visible ? title.alt : ""}
                fill
                sizes={`${Math.round(layout.thumbWidth)}px`}
                className="object-cover"
                unoptimized
              />
            </li>
          );
        })}
      </ul>
      <div className="mx-auto mt-5 flex flex-col items-center gap-4">
        <TitleSwitch
          value={titleMode}
          originalLabel={copy.titleOriginal}
          commonLabel={copy.titleCommon}
          groupLabel={copy.title}
          onChange={setTitleMode}
        />
        <DiscreteSlider
          valuesLength={SIZES.length}
          index={SIZES.indexOf(size)}
          groupLabel={copy.size}
          valueText={
            {
              tiny: copy.sizeTiny,
              small: copy.sizeSmall,
              medium: copy.sizeMedium,
              large: copy.sizeLarge,
            }[size]
          }
          ticks={[copy.sizeTiny, copy.sizeSmall, copy.sizeMedium, copy.sizeLarge]}
          onChange={(next) => {
            const value = SIZES[next];
            if (value) setSize(value);
          }}
        />
        <DiscreteSlider
          valuesLength={RATIOS.length}
          index={ratioIndex}
          groupLabel={copy.aspect}
          valueText={ratio.label}
          endLabels={[copy.aspectThin, copy.aspectWide]}
          onChange={(next) => {
            if (RATIOS[next]) setRatioIndex(next);
          }}
        />
        <DiscreteSlider
          valuesLength={GRADIENTS.length}
          index={GRADIENTS.indexOf(gradient)}
          groupLabel={copy.gradient}
          valueText={
            {
              none: copy.gradientNone,
              dark: copy.gradientDark,
              original: copy.gradientOriginal,
              bright: copy.gradientBright,
            }[gradient]
          }
          ticks={[
            copy.gradientNone,
            copy.gradientDark,
            copy.gradientOriginal,
            copy.gradientBright,
          ]}
          onChange={(next) => {
            const value = GRADIENTS[next];
            if (value) setGradient(value);
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-muted">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
