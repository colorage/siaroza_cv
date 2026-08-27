"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
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

const SKIN_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const SKIN_BY_STATE: Record<TitleMode, Record<Gradient, string>> = {
  original: { none: "a", dark: "b", original: "c", bright: "d" },
  common: { none: "e", dark: "f", original: "g", bright: "h" },
};

function posterSrc(titleId: string, skin: string): string {
  return `${MEDIA_DIR}/netflix@${titleId}-style-${skin}-3_4-medium.png`;
}

function copyFor(locale: Locale) {
  return (locale === "by" ? by : en).widgets.thumbnailPipeline;
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

function GradientSlider({
  value,
  labels,
  groupLabel,
  onChange,
}: {
  value: Gradient;
  labels: Record<Gradient, string>;
  groupLabel: string;
  onChange: (value: Gradient) => void;
}) {
  const sliderId = useId();
  const index = GRADIENTS.indexOf(value);

  return (
    <div className="flex w-64 max-w-full flex-col gap-2">
      <label htmlFor={sliderId} className="sr-only">
        {groupLabel}
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={GRADIENTS.length - 1}
        step={1}
        value={index}
        aria-valuetext={labels[value]}
        onChange={(event) => {
          const next = GRADIENTS[Number(event.target.value)];
          if (next) onChange(next);
        }}
        className="thumbnail-gradient-slider"
      />
      <div className="flex justify-between">
        {GRADIENTS.map((gradient) => (
          <span
            key={gradient}
            className={`font-mono text-[11px] tracking-wide uppercase ${
              gradient === value ? "text-foreground" : "text-muted"
            }`}
          >
            {labels[gradient]}
          </span>
        ))}
      </div>
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
  const skin = SKIN_BY_STATE[titleMode][gradient];

  useEffect(() => {
    for (const title of TITLES) {
      for (const letter of SKIN_LETTERS) {
        const img = new window.Image();
        img.src = posterSrc(title.id, letter);
      }
    }
  }, []);

  return (
    <figure className="relative left-1/2 my-8 w-[min(100vw-3rem,64rem)] -translate-x-1/2">
      <ul
        aria-label={copy.posters}
        className="flex gap-2 overflow-x-auto overscroll-x-contain snap-x snap-proximity [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {TITLES.map((title) => (
          <li
            key={title.id}
            className="relative aspect-[3/4] h-36 shrink-0 snap-start overflow-hidden rounded-lg bg-surface md:h-auto md:w-full"
          >
            <Image
              src={posterSrc(title.id, skin)}
              alt={title.alt}
              fill
              sizes="(min-width: 768px) 160px, 108px"
              className="object-cover"
              unoptimized
            />
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-5 flex flex-col items-center gap-4">
        <TitleSwitch
          value={titleMode}
          originalLabel={copy.titleOriginal}
          commonLabel={copy.titleCommon}
          groupLabel={copy.title}
          onChange={setTitleMode}
        />
        <GradientSlider
          value={gradient}
          groupLabel={copy.gradient}
          onChange={setGradient}
          labels={{
            none: copy.gradientNone,
            dark: copy.gradientDark,
            original: copy.gradientOriginal,
            bright: copy.gradientBright,
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-muted">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
