"use client";

import Image from "next/image";
import { useEffect, useId, useState, type CSSProperties } from "react";
import { MediaFrame } from "@/components/MediaFrame";
import { isLocale, type Locale } from "@/lib/i18n";
import by from "@/messages/by.json";
import en from "@/messages/en.json";

const MEDIA_DIR = "/media/case-studies/chameleon-illustrations/widget";
const PREVIEW_SIZES = "(max-width: 64rem) calc(100vw - 3rem), 64rem";

const HUE_IDS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
] as const;
type HueId = (typeof HUE_IDS)[number];

const HUE_DEGREES = [
  5, 15, 35, 65, 90, 110, 125, 150, 190, 210, 225, 235, 250, 275, 325, 355,
] as const;

const HUE_TRACK = HUE_DEGREES.map((deg, index) => {
  const pct = (index / (HUE_DEGREES.length - 1)) * 100;
  return `hsl(${deg} 80% 52%) ${pct}%`;
}).join(", ");

const ILLUSTRATIONS = [{ id: "scooter" }] as const;
type IllustrationId = (typeof ILLUSTRATIONS)[number]["id"];

const DEFAULT_PRIMARY = 10;
const DEFAULT_SECONDARY = 2;
const PICKER_PRIMARY: HueId = "a";
const PICKER_SECONDARY: HueId = "2";

function colorwaySrc(stem: string, primary: HueId, secondary: HueId): string {
  return `${MEDIA_DIR}/${stem}_${primary}${secondary}.webp`;
}

function wrapIndex(index: number): number {
  const length = HUE_IDS.length;
  return ((index % length) + length) % length;
}

function hueColor(index: number): string {
  return `hsl(${HUE_DEGREES[index] ?? 0} 80% 52%)`;
}

function copyFor(locale: Locale) {
  return (locale === "by" ? by : en).widgets.chameleonColorways;
}

function HueSlider({
  index,
  groupLabel,
  valueText,
  onChange,
}: {
  index: number;
  groupLabel: string;
  valueText: string;
  onChange: (index: number) => void;
}) {
  const sliderId = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={sliderId}
          className="font-mono text-[11px] tracking-wide text-muted uppercase"
        >
          {groupLabel}
        </label>
        <span className="font-mono text-[11px] tracking-wide text-foreground uppercase">
          {valueText}
        </span>
      </div>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={HUE_IDS.length - 1}
        step={1}
        value={index}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value))}
        className="hue-slider"
        style={
          {
            "--hue-track": `linear-gradient(to right, ${HUE_TRACK})`,
            "--hue-thumb": hueColor(index),
          } as CSSProperties
        }
      />
    </div>
  );
}

export function ChameleonColorways(props: Record<string, unknown>) {
  const locale: Locale =
    typeof props.locale === "string" && isLocale(props.locale)
      ? props.locale
      : "en";
  const copy = copyFor(locale);
  const [stem, setStem] = useState<IllustrationId>("scooter");
  const [primary, setPrimary] = useState(DEFAULT_PRIMARY);
  const [secondary, setSecondary] = useState(DEFAULT_SECONDARY);

  const primaryId = HUE_IDS[primary] ?? "a";
  const secondaryId = HUE_IDS[secondary] ?? "2";
  const previewSrc = colorwaySrc(stem, primaryId, secondaryId);
  const filename = `${stem}_${primaryId}${secondaryId}.png`;
  const primaryName = copy.hues[primaryId];
  const secondaryName = copy.hues[secondaryId];

  useEffect(() => {
    const neighbors: Array<[number, number]> = [
      [primary, secondary],
      [wrapIndex(primary - 1), secondary],
      [wrapIndex(primary + 1), secondary],
      [primary, wrapIndex(secondary - 1)],
      [primary, wrapIndex(secondary + 1)],
    ];
    for (const [nextPrimary, nextSecondary] of neighbors) {
      const img = new window.Image();
      const nextPrimaryId = HUE_IDS[nextPrimary];
      const nextSecondaryId = HUE_IDS[nextSecondary];
      if (!nextPrimaryId || !nextSecondaryId) continue;
      img.src = colorwaySrc(stem, nextPrimaryId, nextSecondaryId);
    }
  }, [primary, secondary, stem]);

  return (
    <figure className="my-8 w-full">
      <MediaFrame className="bg-card">
        <div className="p-4 md:p-8">
          <div className="relative aspect-square w-full">
            <Image
              src={previewSrc}
              alt={copy.previewAlt[stem]}
              fill
              sizes={PREVIEW_SIZES}
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>
      </MediaFrame>
      <p className="mt-3 text-center font-mono text-[13px] text-muted">
        {filename}
      </p>
      <div className="mx-auto mt-5 flex w-full max-w-lg flex-col items-stretch gap-5">
        <HueSlider
          index={primary}
          groupLabel={copy.primary}
          valueText={`${primaryName} · ${primaryId}`}
          onChange={setPrimary}
        />
        <HueSlider
          index={secondary}
          groupLabel={copy.secondary}
          valueText={`${secondaryName} · ${secondaryId}`}
          onChange={setSecondary}
        />
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-wide text-muted uppercase">
            {copy.illustrations}
          </p>
          <ul
            aria-label={copy.illustrations}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1"
          >
            {ILLUSTRATIONS.map((item) => {
              const selected = item.id === stem;
              return (
                <li key={item.id} className="snap-center">
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={copy.previewAlt[item.id]}
                    onClick={() => setStem(item.id)}
                    className={`relative size-16 overflow-hidden rounded-xl border bg-surface transition-colors ${
                      selected
                        ? "border-accent"
                        : "border-border hover:border-border-strong"
                    }`}
                  >
                    <Image
                      src={colorwaySrc(
                        item.id,
                        PICKER_PRIMARY,
                        PICKER_SECONDARY,
                      )}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain"
                      unoptimized
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-muted">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
