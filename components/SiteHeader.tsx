import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: Props) {
  const other: Locale = locale === "en" ? "by" : "en";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          {dict.hero.shortName}
        </Link>
        <nav className="flex items-center gap-6 text-[13px] text-muted">
          <a href="#experience" className="transition-colors hover:text-foreground">
            {dict.nav.experience}
          </a>
          <a href="#projects" className="transition-colors hover:text-foreground">
            {dict.nav.projects}
          </a>
          <Link
            href={`/${other}`}
            className="rounded-full border border-border-strong px-3 py-1 text-foreground transition-colors hover:bg-surface"
            hrefLang={other}
          >
            {other.toUpperCase()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
