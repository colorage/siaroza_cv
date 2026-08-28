import type { Locale } from "@/lib/i18n";
import type {
  PortfolioPages,
  PortfolioShot,
  PortfolioThumbnailKind,
} from "@/lib/vault/types";

export function getPortfolioPageSrcs(pages: PortfolioPages): string[] {
  if (pages.files?.length) {
    return pages.files.map((file) => `${pages.dir}/${file}`);
  }
  return Array.from({ length: pages.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${pages.dir}/page-${n}.jpg`;
  });
}

export function isAnimatedCover(shot: PortfolioShot): boolean {
  return Boolean(shot.cover?.toLowerCase().endsWith(".gif"));
}

export function getPortfolioThumbnailKind(
  shot: PortfolioShot,
): PortfolioThumbnailKind {
  if (shot.youtube) return "video";
  if (shot.video) return "image";
  if (isAnimatedCover(shot)) return "image";
  if (shot.pages && getPortfolioPageSrcs(shot.pages).length > 1) {
    return "gallery";
  }
  return "image";
}

export function isStandaloneShot(shot: PortfolioShot): boolean {
  return !shot.href;
}

export function getPortfolioHref(shot: PortfolioShot, locale: Locale): string {
  return shot.href ?? `/${locale}/work/${shot.slug}`;
}

export function getPortfolioShotAspect(shot: PortfolioShot): {
  width: number;
  height: number;
} {
  if (shot.pages) {
    return { width: shot.pages.width, height: shot.pages.height };
  }
  if (shot.video) {
    return { width: shot.video.width, height: shot.video.height };
  }
  if (shot.youtube) {
    return { width: 16, height: 9 };
  }
  return { width: 4, height: 3 };
}
