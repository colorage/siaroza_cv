import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  src: string;
  title: string;
  poster?: string;
  caption?: string;
  loop?: boolean;
  href?: string;
  linkLabel?: string;
};

export function VideoEmbed({
  src,
  title,
  poster,
  caption,
  loop = false,
  href,
  linkLabel,
}: Props) {
  return (
    <figure className="w-full">
      <MediaFrame className="bg-surface">
        <video
          className="h-auto w-full"
          controls={!loop}
          autoPlay={loop}
          muted={loop}
          loop={loop}
          playsInline
          preload={loop ? "auto" : "none"}
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
      {href && linkLabel ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-[13px] text-muted transition-colors hover:text-foreground"
        >
          {linkLabel} →
        </a>
      ) : null}
    </figure>
  );
}
