import { existsSync, readFileSync } from "node:fs";
import { imageSize } from "image-size";
import "server-only";
import { MediaCarousel } from "@/components/MediaCarousel";
import { parseGalleryFence } from "@/lib/vault/markdown";
import { MEDIA_PREFIX, resolveSafeVaultFile } from "@/lib/vault/paths";

type Props = {
  source: string;
  indexTemplate: string;
};

const FALLBACK = { width: 2160, height: 1080 };

function probeSrc(src: string): { width: number; height: number } {
  if (!src.startsWith(`${MEDIA_PREFIX}/`)) return FALLBACK;
  const filePath = resolveSafeVaultFile(src.slice(MEDIA_PREFIX.length + 1));
  if (!filePath || !existsSync(/* turbopackIgnore: true */ filePath)) {
    return FALLBACK;
  }
  try {
    const size = imageSize(
      new Uint8Array(readFileSync(/* turbopackIgnore: true */ filePath)),
    );
    return {
      width: size.width ?? FALLBACK.width,
      height: size.height ?? FALLBACK.height,
    };
  } catch {
    return FALLBACK;
  }
}

export function GalleryEmbed({ source, indexTemplate }: Props) {
  const images = parseGalleryFence(source);
  if (images.length === 0) return null;

  const first = probeSrc(images[0].src);
  const label = images.find((image) => image.alt)?.alt ?? "Gallery";

  return (
    <div className="my-8 w-full">
      <MediaCarousel
        pages={images.map((image) => image.src)}
        alt={label}
        alts={images.map((image) => image.alt)}
        width={first.width}
        height={first.height}
        indexTemplate={indexTemplate}
      />
    </div>
  );
}
