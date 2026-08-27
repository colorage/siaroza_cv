import Link from "next/link";
import { Suspense } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { htmlLang, type Dictionary, type Locale } from "@/lib/i18n";
import { isPetProjectsEnabled } from "@/lib/site-url";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function LocaleSwitcherFallback({ locale }: { locale: Locale }) {
  const other: Locale = locale === "en" ? "by" : "en";
  return (
    <Link
      href={`/${other}`}
      className="shrink-0 rounded-full border border-border-strong px-3 py-1 text-foreground transition-colors hover:bg-surface"
      hrefLang={htmlLang(other)}
    >
      {other.toUpperCase()}
    </Link>
  );
}

export function SiteHeader({ locale, dict }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href={`/${locale}`}
          className="shrink-0 text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          {dict.hero.shortName}
        </Link>
        <nav className="flex min-w-0 items-center gap-3 overflow-x-auto text-[12px] text-muted [scrollbar-width:none] sm:gap-5 sm:text-[13px]">
          <Link
            href={`/${locale}#case-studies`}
            className="shrink-0 whitespace-nowrap transition-colors hover:text-foreground"
          >
            {dict.nav.caseStudies}
          </Link>
          {isPetProjectsEnabled() ? (
            <Link
              href={`/${locale}/projects`}
              className="shrink-0 whitespace-nowrap transition-colors hover:text-foreground"
            >
              {dict.nav.projects}
            </Link>
          ) : null}
          <Link
            href={`/${locale}#experience`}
            className="shrink-0 transition-colors hover:text-foreground"
          >
            {dict.nav.experience}
          </Link>
          <Link
            href={`/${locale}/work`}
            className="shrink-0 transition-colors hover:text-foreground"
          >
            {dict.nav.portfolio}
          </Link>
          <Suspense fallback={<LocaleSwitcherFallback locale={locale} />}>
            <LocaleSwitcher locale={locale} />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
