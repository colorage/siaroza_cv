import Image from "next/image";
import type { ProjectGalleryImage } from "@/lib/vault/types";
import type { Locale } from "@/lib/i18n";

type Props = {
  images: ProjectGalleryImage[];
  locale: Locale;
  label: string;
};

export function ProjectGallery({ images, locale, label }: Props) {
  if (images.length === 0) return null;

  return (
    <section aria-label={label} className="animate-fade-up-delay mt-10">
      <div
        tabIndex={0}
        className="project-gallery overflow-x-auto overscroll-x-contain snap-x snap-proximity"
      >
        <ul className="flex w-max gap-4 pt-1 pb-3">
          {images.map((image, index) => (
            <li
              key={image.src}
              className="relative h-[420px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface md:h-[520px]"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
            >
              <Image
                src={image.src}
                alt={image.alt[locale]}
                fill
                sizes="(min-width: 768px) 240px, 194px"
                className="object-cover"
                preload={index === 0}
                unoptimized={image.src.startsWith("/media/")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
