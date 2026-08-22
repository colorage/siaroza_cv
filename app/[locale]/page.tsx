import { notFound } from "next/navigation";
import { CaseStudiesGrid } from "@/components/CaseStudiesGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
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
      <CaseStudiesGrid locale={locale} dict={dict} />
      <ExperienceTimeline locale={locale} dict={dict} />
      {isPetProjectsEnabled() ? (
        <ProjectsGrid locale={locale} dict={dict} />
      ) : null}
    </>
  );
}
