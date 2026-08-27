"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
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

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const labelId = useId();
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group || !group.contains(document.activeElement)) return;
    group
      .querySelector<HTMLButtonElement>(`[data-value="${value}"]`)
      ?.focus();
  }, [value]);

  function move(delta: number) {
    const index = options.findIndex((option) => option.value === value);
    const next = options[(index + delta + options.length) % options.length];
    if (next) onChange(next.value);
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        id={labelId}
        className="w-20 shrink-0 font-mono text-[11px] tracking-wide text-muted uppercase"
      >
        {label}
      </span>
      <div
        ref={groupRef}
        role="radiogroup"
        aria-labelledby={labelId}
        className="flex flex-wrap gap-2"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              data-value={option.value}
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.value)}
              className={
                selected
                  ? "rounded-full border border-transparent bg-button px-3 py-1 font-mono text-[12px] tracking-wide text-button-fg uppercase"
                  : "rounded-full border border-border px-3 py-1 font-mono text-[12px] tracking-wide text-muted uppercase transition-colors hover:text-foreground"
              }
            >
              {option.label}
            </button>
          );
        })}
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
    <div className="flex flex-col gap-5 p-4 md:p-6">
      <div className="flex flex-col gap-3">
        <SegmentedControl
          label={copy.title}
          value={titleMode}
          onChange={setTitleMode}
          options={[
            { value: "original", label: copy.titleOriginal },
            { value: "common", label: copy.titleCommon },
          ]}
        />
        <SegmentedControl
          label={copy.gradient}
          value={gradient}
          onChange={setGradient}
          options={[
            { value: "none", label: copy.gradientNone },
            { value: "dark", label: copy.gradientDark },
            { value: "original", label: copy.gradientOriginal },
            { value: "bright", label: copy.gradientBright },
          ]}
        />
      </div>
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
              sizes="(min-width: 768px) 104px, 108px"
              className="object-cover"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
