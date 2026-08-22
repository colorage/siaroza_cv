import type { ReactNode } from "react";

type Props = {
  slug: string;
  className?: string;
};

function Mark({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  "game-thumbnails": (
    <Mark>
      <rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="17" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="5" y="17" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="17" y="17" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
    </Mark>
  ),
  "chameleon-illustrations": (
    <Mark>
      <circle cx="12.5" cy="16" r="7" stroke="currentColor" strokeWidth="1.75" />
      <circle
        cx="19.5"
        cy="16"
        r="7"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.5"
      />
    </Mark>
  ),
  "photoshop-level-design": (
    <Mark>
      <rect x="5" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5 13h22M13 8v16M21 8v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8 18h2M16 16h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Mark>
  ),
};

export function CaseStudyLogo({ slug, className = "" }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-[color-mix(in_oklab,#edecec_4%,transparent)] text-foreground ${className}`}
      aria-hidden
    >
      {icons[slug] ?? null}
    </span>
  );
}
