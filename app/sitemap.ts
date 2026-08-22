import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { languageAlternates, localePath } from "@/lib/i18n";
import { getSiteUrl, isPetProjectsEnabled } from "@/lib/site-url";
import { getWorkSlugs } from "@/lib/work";

function sitemapEntry(path = ""): MetadataRoute.Sitemap[number] {
  const base = getSiteUrl();
  const languages = languageAlternates(path);
  return {
    url: `${base}${localePath("en", path)}`,
    alternates: {
      languages: {
        en: `${base}${languages.en}`,
        be: `${base}${languages.be}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [sitemapEntry(), ...getWorkSlugs().map((slug) => sitemapEntry(`/work/${slug}`))];

  if (isPetProjectsEnabled()) {
    for (const project of projects) {
      if (project.stage === "nda") continue;
      entries.push(sitemapEntry(`/projects/${project.slug}`));
    }
  }

  return entries;
}
