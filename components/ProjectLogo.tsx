import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  slug: string;
  name: string;
  className?: string;
};

const markClass = "h-full w-full";

function RasterMark({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
  );
}

function Mark({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={markClass}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  "yadoma-bel": (
    <RasterMark src="/projects/yadoma-bel.png" />
  ),
  "spasem-bel": (
    <RasterMark src="/projects/spasem-bel.png" />
  ),
  bloodlabs: (
    <RasterMark src="/projects/bloodlabs.png" />
  ),
  pavetra: (
    <RasterMark src="/projects/pavetra.png" />
  ),
  "pah-bot": (
    <RasterMark src="/projects/pah-bot.png" />
  ),
  dc: (
    <Mark>
      <path
        d="M8 8h5.2c3.8 0 6.3 2.4 6.3 8s-2.5 8-6.3 8H8V8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M21 10.5c1.3 1.5 2 3.6 2 5.5s-.7 4-2 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  "kropki-mahiliou": (
    <RasterMark src="/projects/kropki-mahiliou.png" />
  ),
  "radar-rockets": (
    <RasterMark src="/projects/radar-rockets.png" />
  ),
  "hejka-app": (
    <Mark>
      <path
        d="M7 18c2.2-4.5 5-6.8 9-6.8S22.8 13.5 25 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 21.5c1.5-2.8 3.3-4.2 6-4.2s4.5 1.4 6 4.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="16" cy="11" r="2" fill="currentColor" />
    </Mark>
  ),
  halasy: (
    <RasterMark src="/projects/halasy.png" />
  ),
  impact: (
    <Mark>
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <path
        d="M16 5v4M16 23v4M5 16h4M23 16h4M8.2 8.2l2.8 2.8M21 21l2.8 2.8M23.8 8.2 21 11M11 21l-2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  "polny-trash": (
    <RasterMark src="/projects/polny-trash.png" />
  ),
  cobike: (
    <Mark>
      <circle cx="9" cy="21" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="23" cy="21" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M13 21h4.5l3-8H14l-2 5M17.5 13l-2.5-5H12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mark>
  ),
  losque: (
    <RasterMark src="/projects/losque.png" />
  ),
  "my-ostalis": (
    <RasterMark src="/projects/my-ostalis.png" />
  ),
  "mogilev-norm": (
    <RasterMark src="/projects/mogilev-norm.png" />
  ),
  tedxmahilyow: (
    <RasterMark src="/projects/tedxmahilyow.png" />
  ),
  akanicy: (
    <Mark>
      <rect
        x="6"
        y="7"
        width="20"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6 13h20M16 13v12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  "sunsethunters-club": (
    <RasterMark src="/projects/sunsethunters-club.png" />
  ),
  lacinka: (
    <RasterMark src="/projects/lacinka.png" />
  ),
  "pavuk-club": (
    <Mark>
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12.5 13.5 7 8M19.5 13.5 25 8M12.5 18.5 7 24M19.5 18.5 25 24M11.5 16H6M20.5 16H26M16 11.5V6M16 20.5V26"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  inx: (
    <Mark>
      <path
        d="M8 24V8h3.2l7.6 10.8V8H22v16h-3.2L11.2 13.2V24H8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </Mark>
  ),
  photoplay: (
    <Mark>
      <rect
        x="5"
        y="9"
        width="22"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M10 9 12.2 6h7.6L22 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 14.2v5.6L19 17l-5.5-2.8Z"
        fill="currentColor"
      />
    </Mark>
  ),
  "belarus-bw": (
    <RasterMark src="/projects/belarus-bw.png" />
  ),
};

function FallbackMark({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={markClass}
      aria-hidden
    >
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontWeight="500"
      >
        {letter}
      </text>
    </svg>
  );
}

const imageLogos = new Set([
  "lacinka",
  "kropki-mahiliou",
  "bloodlabs",
  "losque",
  "my-ostalis",
  "pavetra",
  "radar-rockets",
  "spasem-bel",
  "mogilev-norm",
  "yadoma-bel",
  "belarus-bw",
  "pah-bot",
  "polny-trash",
  "sunsethunters-club",
  "tedxmahilyow",
  "halasy",
]);

export function ProjectLogo({ slug, name, className = "" }: Props) {
  const isImageLogo = imageLogos.has(slug);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${
        isImageLogo
          ? "border-0 bg-transparent p-0"
          : "border border-border bg-[color-mix(in_oklab,#edecec_4%,transparent)] text-foreground"
      } ${className}`}
      aria-hidden
    >
      {icons[slug] ?? <FallbackMark name={name} />}
    </span>
  );
}
