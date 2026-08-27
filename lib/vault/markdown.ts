import type { Locale } from "@/lib/i18n";
import { resolveNoteAsset } from "@/lib/vault/paths";

export function localized(
  en: string | undefined,
  by: string | undefined,
): Record<Locale, string> {
  const english = en ?? "";
  return { en: english, by: by ?? english };
}

export function markdownBullets(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .flatMap((line) => {
      const match = /^(?:[-*]|\d+\.)\s+(.*)$/.exec(line);
      return match?.[1] ? [match[1].trim()] : [];
    });
}

export function preprocessMarkdown(source: string, noteDir: string): string {
  let out = source.replace(/!\[\[([^\]]+)\]\]/g, (_, target: string) => {
    const file = target.split("|")[0]?.trim() ?? "";
    const alt = target.split("|")[1]?.trim() ?? "";
    return `![${alt}](${resolveNoteAsset(noteDir, file)})`;
  });

  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt: string, href: string) => {
      const trimmed = href.trim();
      if (
        /^https?:\/\//.test(trimmed) ||
        trimmed.startsWith("/") ||
        trimmed.startsWith("#")
      ) {
        return match;
      }
      return `![${alt}](${resolveNoteAsset(noteDir, trimmed)})`;
    },
  );

  return out;
}

export function rewriteWikiLinks(
  markdown: string,
  locale: Locale,
  workSlugs: Set<string>,
  projectSlugs: Set<string>,
): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_, inner: string) => {
    const [raw, label] = inner.split("|").map((part) => part.trim());
    const slug = (raw ?? "")
      .replace(/\.md$/, "")
      .split("/")
      .filter(Boolean)
      .at(-1);
    if (!slug) return inner;
    const text = label || slug;
    if (workSlugs.has(slug)) return `[${text}](/${locale}/work/${slug})`;
    if (projectSlugs.has(slug)) return `[${text}](/${locale}/projects/${slug})`;
    return text;
  });
}
