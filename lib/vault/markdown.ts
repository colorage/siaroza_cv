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

function isRemoteOrAbsolute(src: string): boolean {
  return (
    /^https?:\/\//.test(src) || src.startsWith("/") || src.startsWith("#")
  );
}

function rewriteGalleryFences(source: string, noteDir: string): string {
  return source.replace(/```gallery\r?\n([\s\S]*?)```/g, (_, body: string) => {
    const rewritten = body.replace(
      /^(\s*(?:-\s+)?src:\s*)(.+)$/gm,
      (_match, prefix: string, raw: string) => {
        const trimmed = raw.trim().replace(/^['"]|['"]$/g, "");
        if (!trimmed || isRemoteOrAbsolute(trimmed)) {
          return `${prefix}${trimmed || raw}`;
        }
        return `${prefix}${resolveNoteAsset(noteDir, trimmed)}`;
      },
    );
    return `\`\`\`gallery\n${rewritten}\`\`\``;
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
    (match, alt: string, dest: string) => {
      const { href, title } = splitMarkdownImageDest(dest);
      if (isRemoteOrAbsolute(href)) {
        return match;
      }
      const resolved = resolveNoteAsset(noteDir, href);
      return title === undefined
        ? `![${alt}](${resolved})`
        : `![${alt}](${resolved} "${title}")`;
    },
  );

  return rewriteGalleryFences(out, noteDir);
}

export type GalleryFenceImage = {
  src: string;
  alt: string;
};

export function parseGalleryFence(source: string): GalleryFenceImage[] {
  try {
    const parsed = yamlLoad(source, { schema: JSON_SCHEMA });
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const data = item as Record<string, unknown>;
      if (typeof data.src !== "string" || !data.src) return [];
      return [
        {
          src: data.src,
          alt: typeof data.alt === "string" ? data.alt : "",
        },
      ];
    });
  } catch {
    return [];
  }
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
