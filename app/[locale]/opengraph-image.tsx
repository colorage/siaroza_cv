import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export const alt = "Siaroža — Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dict = await getDictionary(locale);

  const [regular, medium] = await Promise.all([
    readFile(
      join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf"),
    ),
    readFile(
      join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14120b",
          color: "#edecec",
          padding: 72,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(237, 236, 236, 0.6)",
          }}
        >
          {dict.hero.shortName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            {dict.hero.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "rgba(237, 236, 236, 0.6)",
            }}
          >
            {dict.hero.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 64,
            height: 6,
            background: "#f54e00",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
