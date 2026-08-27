import { notFound } from "next/navigation";
import { CaseStudiesIndex } from "@/components/CaseStudiesIndex";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getFeaturedPortfolio } from "@/content/portfolio";
import { getFeaturedProjects } from "@/content/projects";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { isPetProjectsEnabled } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <CaseStudiesIndex locale={locale} dict={dict} />
      {isPetProjectsEnabled() ? (
        <ProjectsGrid
          locale={locale}
          dict={dict}
          items={getFeaturedProjects()}
          heading={dict.projects.heading}
          id="projects"
          seeAllHref={`/${locale}/projects`}
          seeAllLabel={dict.projects.seeAll}
        />
      ) : null}
      <ExperienceTimeline locale={locale} dict={dict} />
      <PortfolioGrid
        locale={locale}
        dict={dict}
        shots={getFeaturedPortfolio()}
        heading={dict.portfolio.heading}
        id="portfolio"
        seeAllHref={`/${locale}/work`}
        seeAllLabel={dict.portfolio.seeAll}
      />
    </>
  );
}
