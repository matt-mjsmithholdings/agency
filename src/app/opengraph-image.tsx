import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Cadvero — talent on the way up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#f2efe9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={72} height={72} alt="" />
          <div style={{ fontSize: 44 }}>Cadvero</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
            Talent on the&nbsp;<span style={{ color: "#ff4d2e" }}>way up.</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 32, color: "#8f8a82" }}>
            Influencers · Actors · Musicians · Presenters
          </div>
        </div>
      </div>
    ),
    size,
  );
}
