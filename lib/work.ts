import { getCaseStudies, getPortfolioShots } from "@/lib/vault/load";
import { isStandaloneShot } from "@/lib/vault/portfolio-utils";

export function getWorkSlugs(): string[] {
  const slugs = new Set(getCaseStudies().map((study) => study.slug));
  for (const shot of getPortfolioShots()) {
    if (isStandaloneShot(shot)) slugs.add(shot.slug);
  }
  return [...slugs];
}
