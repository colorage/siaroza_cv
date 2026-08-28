import Link from "next/link";
import { JustifiedPortfolio } from "@/components/JustifiedPortfolio";
import type { PortfolioShot } from "@/lib/vault/types";
import type { Dictionary, Locale } from "@/lib/i18n";

type HeadingTag = "h1" | "h2";

type Props = {
  locale: Locale;
  dict: Dictionary;
  shots: PortfolioShot[];
  heading: string;
  headingAs?: HeadingTag;
  id?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
};

export function PortfolioGrid({
  locale,
  dict,
  shots,
  heading,
  headingAs = "h2",
  id,
  seeAllHref,
  seeAllLabel,
}: Props) {
  const Heading = headingAs;

  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Heading className="mb-12 text-3xl tracking-tight text-foreground md:text-4xl">
        {heading}
      </Heading>

      <JustifiedPortfolio shots={shots} locale={locale} dict={dict} />

      {seeAllHref && seeAllLabel ? (
        <Link
          href={seeAllHref}
          className="mt-8 inline-flex text-[13px] text-muted transition-colors hover:text-foreground"
        >
          {seeAllLabel} →
        </Link>
      ) : null}
    </section>
  );
}
