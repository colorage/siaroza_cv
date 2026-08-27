import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { MEDIA_MIME, resolveSafeVaultFile } from "@/lib/vault/paths";

export const runtime = "nodejs";

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MEDIA_MIME[ext] ?? "application/octet-stream";
}

function parseRange(
  rangeHeader: string,
  size: number,
): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!match) return null;
  const startToken = match[1];
  const endToken = match[2];
  if (!startToken && !endToken) return null;
  let start = startToken ? Number(startToken) : size - Number(endToken);
  let end = endToken ? Number(endToken) : size - 1;
  if (!startToken) start = Math.max(size - Number(endToken), 0);
  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
    return null;
  }
  end = Math.min(end, size - 1);
  return { start, end };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = resolveSafeVaultFile(segments.join("/"));
  if (!filePath || !existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const stat = statSync(filePath);
  if (!stat.isFile()) {
    return new Response("Not found", { status: 404 });
  }

  const type = contentTypeFor(filePath);
  const cacheControl =
    process.env.NODE_ENV === "production"
      ? "public, max-age=86400"
      : "no-store";
  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const range = parseRange(rangeHeader, stat.size);
    if (!range) {
      return new Response("Range not satisfiable", {
        status: 416,
        headers: {
          "Content-Range": `bytes */${stat.size}`,
        },
      });
    }
    const { start, end } = range;
    const stream = createReadStream(filePath, { start, end });
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": cacheControl,
      },
    });
  }

  const stream = createReadStream(filePath);
  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(stat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": cacheControl,
    },
  });
}
