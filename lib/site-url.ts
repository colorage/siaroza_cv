export function getSiteUrl(): string {
  if (process.env.VERCEL_GIT_COMMIT_REF === "preview") {
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
