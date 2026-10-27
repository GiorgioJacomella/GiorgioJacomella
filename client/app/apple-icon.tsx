import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
// Static export only writes route handlers that opt in.
export const dynamic = "force-static";

// iOS fills transparency with black, so the logo sits on white.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
        <svg width="120" height="120" viewBox="0 0 48 48">
          <circle cx="16" cy="16" r="16" fill="#1d4ed8" />
          <circle cx="40" cy="40" r="8" fill="#1d4ed8" />
        </svg>
      </div>
    ),
    size,
  );
}
