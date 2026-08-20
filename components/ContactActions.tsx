import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
};

const iconLinkClassName =
  "inline-flex size-10 items-center justify-center rounded-full bg-button text-button-fg transition-opacity hover:opacity-90";

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M21.5 4.3 18.2 20.1c-.25 1.1-1.16 1.37-2.35.85l-4.4-3.24-2.12 2.04c-.23.23-.43.43-.88.43l.31-4.48 8.16-7.37c.36-.31-.08-.49-.55-.18L6.3 13.67l-4.34-1.36c-.94-.29-.96-.94.2-1.4L20.3 3.2c.79-.3 1.47.18 1.2 1.1Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}

export function ContactActions({ dict }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="mailto:colorage503@gmail.com"
        className={iconLinkClassName}
        aria-label={dict.hero.email}
      >
        <EmailIcon />
      </a>
      <a
        href="https://t.me/bardzobardzo"
        target="_blank"
        rel="noopener noreferrer"
        className={iconLinkClassName}
        aria-label={dict.hero.telegram}
      >
        <TelegramIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/siaroza"
        target="_blank"
        rel="noopener noreferrer"
        className={iconLinkClassName}
        aria-label={dict.hero.linkedin}
      >
        <LinkedInIcon />
      </a>
      <a
        href="/cv/siaroza-cv.pdf"
        download
        className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
      >
        {dict.experience.downloadCv}
      </a>
    </div>
  );
}
