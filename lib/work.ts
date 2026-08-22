import { caseStudies } from "@/content/case-studies";
import { isStandaloneShot, portfolioShots } from "@/content/portfolio";

export function getWorkSlugs(): string[] {
  const slugs = new Set(caseStudies.map((study) => study.slug));
  for (const shot of portfolioShots) {
    if (isStandaloneShot(shot)) slugs.add(shot.slug);
  }
  return [...slugs];
}
