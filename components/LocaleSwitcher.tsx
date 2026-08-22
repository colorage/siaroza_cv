"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { htmlLang, swapLocalePath, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const searchParams = useSearchParams();
  const other: Locale = locale === "en" ? "by" : "en";
  const search = searchParams.toString();
  const href = `${swapLocalePath(pathname, locale, other)}${search ? `?${search}` : ""}`;

  return (
    <Link
      href={href}
      className="shrink-0 rounded-full border border-border-strong px-3 py-1 text-foreground transition-colors hover:bg-surface"
      hrefLang={htmlLang(other)}
    >
      {other.toUpperCase()}
    </Link>
  );
}
