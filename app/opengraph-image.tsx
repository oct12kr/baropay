import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #071e3d 0%, #0a2a52 55%, #2878f0 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              borderRadius: 26,
              background: "#2878f0",
              color: "#ffffff",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#ffffff" }}>
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 34, color: "rgba(255,255,255,0.78)" }}>
          3분이면 입금완료, 소액결제·정보이용료 상담
        </div>
      </div>
    ),
    { ...size }
  );
}
