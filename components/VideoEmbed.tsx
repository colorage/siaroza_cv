import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  src: string;
  title: string;
  poster?: string;
  caption?: string;
  loop?: boolean;
};

export function VideoEmbed({ src, title, poster, caption, loop }: Props) {
  return (
    <figure className="w-full">
      <MediaFrame className="bg-surface">
        <video
          className="h-auto w-full"
          controls
          playsInline
          autoPlay={loop}
          muted={loop}
          loop={loop}
          preload={loop ? "metadata" : "none"}
          poster={poster}
          title={title}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          {title}
        </video>
      </MediaFrame>
      {caption ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
