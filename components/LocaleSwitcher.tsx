"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { htmlLang, locales, swapLocalePath, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  return (
    <div className="flex shrink-0 items-center rounded-full border border-border-strong p-0.5 text-[11px] sm:text-[12px]">
      {locales.map((target) => {
        const isActive = target === locale;
        const href = `${swapLocalePath(pathname, locale, target)}${search ? `?${search}` : ""}`;
        return (
          <Link
            key={target}
            href={href}
            className={`shrink-0 rounded-full px-2.5 py-0.5 transition-colors ${
              isActive
                ? "bg-surface font-medium text-foreground"
                : "text-muted hover:text-foreground"
            }`}
            hrefLang={htmlLang(target)}
            aria-current={isActive ? "page" : undefined}
          >
            {target.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
