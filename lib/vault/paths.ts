import path from "node:path";

export const VAULT_ROOT = path.join(process.cwd(), "content/vault");
export const MEDIA_PREFIX = "/media";

export function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export function resolveSafeVaultFile(urlPath: string): string | null {
  const decoded = decodeURIComponent(urlPath);
  const resolved = path.resolve(VAULT_ROOT, decoded);
  const root = path.resolve(VAULT_ROOT);
  const prefix = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  if (resolved !== root && !resolved.startsWith(prefix)) return null;
  return resolved;
}

export function vaultRelative(absPath: string): string {
  return toPosix(path.relative(VAULT_ROOT, absPath));
}

export function toMediaUrl(vaultRelativePath: string): string {
  const clean = toPosix(vaultRelativePath).replace(/^\/+/, "");
  return `${MEDIA_PREFIX}/${clean}`;
}

export function resolveNoteAsset(noteDir: string, src: string): string {
  if (/^https?:\/\//.test(src) || src.startsWith("mailto:")) return src;
  if (src.startsWith(MEDIA_PREFIX + "/") || src.startsWith("#")) return src;
  if (src.startsWith("/")) return src;
  const abs = path.resolve(noteDir, src);
  return toMediaUrl(vaultRelative(abs));
}

export function noteDirMediaPrefix(noteDir: string): string {
  return toMediaUrl(vaultRelative(noteDir));
}

export const MEDIA_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
};
