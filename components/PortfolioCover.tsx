import type { ReactNode } from "react";

type Props = {
  slug: string;
  title: string;
  cover?: string;
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const marks: Record<string, ReactNode> = {
  "game-thumbnails": (
    <Frame>
      <rect x="48" y="44" width="140" height="96" rx="14" stroke="currentColor" strokeWidth="2" />
      <rect x="212" y="44" width="140" height="96" rx="14" stroke="currentColor" strokeWidth="2" />
      <rect x="48" y="160" width="140" height="96" rx="14" stroke="currentColor" strokeWidth="2" />
      <rect x="212" y="160" width="140" height="96" rx="14" fill="currentColor" opacity="0.16" />
    </Frame>
  ),
  "icons-pack": (
    <Frame>
      <circle cx="120" cy="110" r="28" stroke="currentColor" strokeWidth="2" />
      <rect x="236" y="82" width="56" height="56" rx="8" stroke="currentColor" strokeWidth="2" />
      <path d="M120 188h.01M200 188h56M256 160v56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="88" y="168" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
    </Frame>
  ),
  "chameleon-illustrations": (
    <Frame>
      <path
        d="M70 170c18-62 70-96 130-88 48 6 86 40 96 86 8 38-12 78-54 90-46 14-86-8-110-38-18-22-22-48-18-62 8-28 42-22 50 4 6 20-4 42-24 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="268" cy="132" r="7" fill="currentColor" />
    </Frame>
  ),
  "pitchdeck-app-design": (
    <Frame>
      <rect x="72" y="58" width="168" height="184" rx="12" stroke="currentColor" strokeWidth="2" />
      <rect x="92" y="84" width="128" height="10" rx="5" fill="currentColor" opacity="0.28" />
      <rect x="92" y="108" width="96" height="8" rx="4" fill="currentColor" opacity="0.16" />
      <rect x="220" y="88" width="96" height="154" rx="22" stroke="currentColor" strokeWidth="2" />
      <rect x="238" y="112" width="60" height="88" rx="8" fill="currentColor" opacity="0.16" />
    </Frame>
  ),
  brandbook: (
    <Frame>
      <text
        x="200"
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="92"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontWeight="500"
      >
        Aa
      </text>
    </Frame>
  ),
};

export function PortfolioCover({ slug, title, cover }: Props) {
  if (cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cover}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-foreground transition-transform duration-500 group-hover:scale-[1.04]">
      {marks[slug] ?? (
        <span className="max-w-[12ch] text-center text-2xl tracking-tight">
          {title}
        </span>
      )}
    </div>
  );
}
