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

export function getPortfolioThumbnailKind(
  shot: PortfolioShot,
): PortfolioThumbnailKind {
  if (shot.youtube) return "video";
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
