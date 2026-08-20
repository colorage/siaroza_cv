import type { ReactNode } from "react";

type Props = {
  slug: string;
  name: string;
  className?: string;
};

const markClass = "h-full w-full";

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
    <Mark>
      <path
        d="M6 14.5 16 6l10 8.5V26a1 1 0 0 1-1 1h-6v-7h-6v7H7a1 1 0 0 1-1-1V14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </Mark>
  ),
  yavolonter: (
    <Mark>
      <path
        d="M16 27s-9-5.6-9-12.2A5.4 5.4 0 0 1 16 10a5.4 5.4 0 0 1 9 4.8C25 21.4 16 27 16 27Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </Mark>
  ),
  bloodlabs: (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/bloodlabs.png"
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
  ),
  pavetra: (
    <Mark>
      <path
        d="M5 11h14a3.5 3.5 0 1 0-1.2-6.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M5 17h18a3 3 0 1 0-.9-5.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M5 23h12a2.5 2.5 0 1 1-.8 4.9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  "pah-bot": (
    <Mark>
      <path
        d="M8 20c2.5-3.5 5-5.2 8-5.2S21.5 16.5 24 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 14c1.8-2.4 3.6-3.6 6-3.6s4.2 1.2 6 3.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12.5 9c1.2-1.5 2.3-2.2 3.5-2.2S18.3 7.5 19.5 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="16" cy="23.5" r="1.4" fill="currentColor" />
    </Mark>
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/kropki-mahiliou.svg"
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
  ),
  "radar-rockets": (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/radar-rockets.png"
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
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
    <Mark>
      <path
        d="M8 12v8M12.5 9v14M17 11v10M21.5 13.5v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Mark>
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
    <Mark>
      <path
        d="M8 10h16l-1.5 15H9.5L8 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M6 10h20M12 10V7.5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 20 7.5V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mark>
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/losque.png"
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
  ),
  "my-ostalis": (
    <Mark>
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="21" cy="11" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.5 24c.8-3.5 3-5.5 5.5-5.5s4.7 2 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M15.5 24c.8-3.5 3-5.5 5.5-5.5s4.7 2 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  "kulturny-mogilev": (
    <Mark>
      <path
        d="M6 25V11l10-6 10 6v14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 25v-7h8v7M12 14h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mark>
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
    <Mark>
      <path
        d="M6 20h20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9 20a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 6v3M8.5 9.5l2 2M23.5 9.5l-2 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Mark>
  ),
  lacinka: (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/lacinka.png"
      alt=""
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
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
  "radar-rockets",
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
