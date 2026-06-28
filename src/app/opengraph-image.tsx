import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-coloured social share card, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #14110d 0%, #1c1813 55%, #14110d 100%)",
          color: "#f5efe6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c9a227",
            fontWeight: 600,
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          Maruti Plywood &amp; Hardware
        </div>

        <div
          style={{ display: "flex", marginTop: 36, height: 6, width: 220, background: "#c9a227" }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 34,
            color: "#b8b0a4",
          }}
        >
          {site.address.city}, {site.address.region} · Open all 7 days
        </div>
      </div>
    ),
    { ...size },
  );
}
