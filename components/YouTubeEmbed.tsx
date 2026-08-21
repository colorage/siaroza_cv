import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  id: string;
  title: string;
  caption?: string;
};

export function YouTubeEmbed({ id, title, caption }: Props) {
  return (
    <figure className="w-full">
      <MediaFrame>
        <div className="relative aspect-video w-full bg-surface">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </MediaFrame>
      {caption ? (
        <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
