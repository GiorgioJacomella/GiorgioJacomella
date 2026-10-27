import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";
import de from "@/i18n/de.json";
import en from "@/i18n/en.json";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export only writes route handlers that opt in.
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Social preview per language, rendered once at build time.
// root-params isn't available in metadata image handlers, so read the param directly.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const description = (lang === "de" ? de : en).meta.description;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "white",
          borderBottom: "24px solid #1d4ed8",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48">
          <circle cx="16" cy="16" r="16" fill="#1d4ed8" />
          <circle cx="40" cy="40" r="8" fill="#1d4ed8" />
        </svg>
        <div style={{ marginTop: 48, fontSize: 80, color: "#334155" }}>{site.name}</div>
        <div style={{ marginTop: 16, fontSize: 36, color: "#64748b" }}>{description}</div>
      </div>
    ),
    size,
  );
}
