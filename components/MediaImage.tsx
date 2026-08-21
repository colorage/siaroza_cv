import Image from "next/image";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function MediaImage({ src, alt, width, height, caption }: Props) {
  return (
    <figure className="w-full">
      <MediaFrame>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full bg-surface"
          sizes="(min-width: 1024px) 64rem, 100vw"
        />
      </MediaFrame>
      {caption ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
