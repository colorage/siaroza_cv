import { load as yamlLoad, JSON_SCHEMA } from "js-yaml";
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

function splitMarkdownImageDest(dest: string): { href: string; title?: string } {
  const trimmed = dest.trim();
  const quoted =
    /^(\S+)\s+("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')$/.exec(trimmed);
  if (!quoted) return { href: trimmed };
  return { href: quoted[1], title: quoted[2].slice(1, -1) };
}

export function preprocessMarkdown(source: string, noteDir: string): string {
  let out = source.replace(/!\[\[([^\]]+)\]\]/g, (_, target: string) => {
    const file = target.split("|")[0]?.trim() ?? "";
    const alt = target.split("|")[1]?.trim() ?? "";
    return `![${alt}](${resolveNoteAsset(noteDir, file)})`;
  });

  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt: string, dest: string) => {
      const { href, title } = splitMarkdownImageDest(dest);
      if (
        /^https?:\/\//.test(href) ||
        href.startsWith("/") ||
        href.startsWith("#")
      ) {
        return match;
      }
      const resolved = resolveNoteAsset(noteDir, href);
      return title === undefined
        ? `![${alt}](${resolved})`
        : `![${alt}](${resolved} "${title}")`;
    },
  );

  return out;
}

export function parseWidgetFence(
  source: string,
): { id: string; props: Record<string, unknown> } | null {
  try {
    const parsed = yamlLoad(source, { schema: JSON_SCHEMA });
    if (!parsed || typeof parsed !== "object") return null;
    const data = parsed as Record<string, unknown>;
    if (typeof data.id !== "string" || !data.id) return null;
    const { id, ...props } = data;
    return { id, props };
  } catch {
    return null;
  }
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
