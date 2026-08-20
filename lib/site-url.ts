export function isPreviewBranch(): boolean {
  return process.env.VERCEL_GIT_COMMIT_REF === "preview";
}

/** Pet projects stay off production until they are ready. */
export function isPetProjectsEnabled(): boolean {
  if (isPreviewBranch()) return true;
  if (process.env.VERCEL) return false;
  return true;
}

export function getSiteUrl(): string {
  if (isPreviewBranch()) {
    return "https://preview.siaroza.com";
  }
  if (process.env.VERCEL_ENV === "production") {
    return "https://siaroza.com";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
