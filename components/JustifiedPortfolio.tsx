"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PortfolioThumbnail } from "@/components/PortfolioThumbnail";
import {
  getPortfolioHref,
  getPortfolioShotAspect,
} from "@/lib/vault/portfolio-utils";
import type { PortfolioShot } from "@/lib/vault/types";
import type { Dictionary, Locale } from "@/lib/i18n";

const GAP = 12;
const ROW_H_MOBILE = 176;
const ROW_H_DESKTOP = 240;

type Box = { width: number; height: number };

function packRow(
  aspects: number[],
  height: number,
  containerWidth: number,
  stretch: boolean,
): Box[] {
  const gaps = GAP * Math.max(0, aspects.length - 1);
  const sum = aspects.reduce((total, ar) => total + ar, 0);
  const h = stretch ? (containerWidth - gaps) / sum : height;
  const boxes = aspects.map((ar) => ({ width: h * ar, height: h }));
  if (stretch && boxes.length > 0) {
    const used = boxes.reduce((total, box) => total + box.width, 0) + gaps;
    boxes[boxes.length - 1].width += containerWidth - used;
    boxes[boxes.length - 1].width = Math.max(0, boxes[boxes.length - 1].width);
  }
  return boxes;
}

function justify(
  aspects: number[],
  containerWidth: number,
  targetH: number,
): Box[] {
  if (containerWidth <= 0) {
    return aspects.map((ar) => ({
      width: targetH * ar,
      height: targetH,
    }));
  }

  const boxes: Box[] = [];
  let start = 0;
  let arSum = 0;

  const rowScale = (sum: number, count: number) => {
    const gaps = GAP * Math.max(0, count - 1);
    return (containerWidth - gaps) / (sum * targetH);
  };

  const flush = (end: number) => {
    const slice = aspects.slice(start, end);
    const scale = rowScale(
      slice.reduce((total, ar) => total + ar, 0),
      slice.length,
    );
    // Keep row height close to the target so 4:3 tiles stay narrower,
    // not taller. Only nudge a row when it already nearly fills the well.
    const stretch = scale >= 0.88 && scale <= 1.2;
    boxes.push(...packRow(slice, targetH, containerWidth, stretch));
  };

  for (let i = 0; i < aspects.length; i += 1) {
    const nextSum = arSum + aspects[i];
    const count = i - start + 1;
    const natural = nextSum * targetH + GAP * (count - 1);
    if (count > 1 && natural > containerWidth) {
      flush(i);
      start = i;
      arSum = aspects[i];
    } else {
      arSum = nextSum;
    }
  }

  flush(aspects.length);
  return boxes;
}

type Props = {
  shots: PortfolioShot[];
  locale: Locale;
  dict: Dictionary;
};

export function JustifiedPortfolio({ shots, locale, dict }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const aspects = useMemo(
    () =>
      shots.map((shot) => {
        const { width: w, height: h } = getPortfolioShotAspect(shot);
        return w / h;
      }),
    [shots],
  );

  const targetH = width > 0 && width < 640 ? ROW_H_MOBILE : ROW_H_DESKTOP;
  const boxes = justify(aspects, width, targetH);

  return (
    <ul ref={ref} className="flex flex-wrap" style={{ gap: GAP }}>
      {shots.map((shot, index) => {
        const href = getPortfolioHref(shot, locale);
        const title = shot.title[locale];
        const { width: ratioW, height: ratioH } = getPortfolioShotAspect(shot);
        const box = boxes[index];
        const measured = width > 0;

        return (
          <li
            key={shot.slug}
            className="relative min-w-0 animate-fade-up overflow-hidden"
            style={{
              width: measured
                ? box.width
                : `min(100%, ${targetH * (ratioW / ratioH)}px)`,
              height: measured ? box.height : undefined,
              flex: measured ? `0 0 ${box.width}px` : "0 1 auto",
              maxWidth: "100%",
              animationDelay: `${Math.min(index, 8) * 40}ms`,
            }}
          >
            {measured ? null : (
              <span
                aria-hidden
                className="block w-full"
                style={{ paddingTop: `${(100 * ratioH) / ratioW}%` }}
              />
            )}
            <PortfolioThumbnail
              shot={shot}
              title={title}
              href={href}
              external={Boolean(shot.href)}
              goToImageLabel={dict.portfolio.goToImage}
            />
          </li>
        );
      })}
    </ul>
  );
}
