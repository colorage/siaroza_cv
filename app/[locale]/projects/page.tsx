import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getSortedProjects } from "@/lib/vault/load";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { isPetProjectsEnabled } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isPetProjectsEnabled()) return {};
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    title: dict.projects.archiveTitle,
    description: dict.projects.archiveDescription,
    path: "/projects",
  });
}

export default async function ProjectsIndexPage({ params }: Props) {
  if (!isPetProjectsEnabled()) notFound();
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <ProjectsGrid
      locale={locale}
      dict={dict}
      items={getSortedProjects()}
      heading={dict.projects.archiveTitle}
      headingAs="h1"
    />
  );
}
