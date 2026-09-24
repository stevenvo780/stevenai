import { ImageResponse } from "next/og";

export const alt = "Daímon — atlas de proyectos de inteligencia artificial de Steven Vallejo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: "#071519", color: "#f4f2e9", padding: "54px 66px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#8ee9d4", fontSize: 20, letterSpacing: 5, textTransform: "uppercase" }}>
        <span>Mouseîon / Informática</span>
        <span>Atlas de inteligencia · 2026</span>
      </div>
      <div style={{ position: "absolute", left: 65, top: 116, width: 1070, height: 1, background: "#355356" }} />
      <div style={{ display: "flex", flexDirection: "column", marginTop: 70 }}>
        <span style={{ color: "#f1bb7c", fontSize: 26, letterSpacing: 2 }}>SISTEMAS · AGENTES · EXPERIMENTOS</span>
        <span style={{ display: "flex", fontSize: 150, fontWeight: 600, lineHeight: 1.15, letterSpacing: -10, marginTop: 10 }}>Daímon<span style={{ color: "#8ee9d4" }}>.</span></span>
        <span style={{ display: "flex", maxWidth: 780, color: "#acc4c2", fontSize: 34, lineHeight: 1.3, marginTop: 8 }}>La inteligencia se construye. Aquí se puede explorar cómo.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 15, marginTop: "auto", color: "#f4f2e9", fontSize: 21 }}>
        <span style={{ display: "flex", width: 16, height: 16, borderRadius: 100, background: "#8ee9d4" }} />
        daimon.stevenvallejo.com
      </div>
      <div style={{ position: "absolute", right: -70, bottom: -135, display: "flex", width: 450, height: 450, border: "2px solid #2b5555", borderRadius: "50%" }} />
      <div style={{ position: "absolute", right: 5, bottom: -63, display: "flex", width: 300, height: 300, border: "2px solid #8ee9d4", borderRadius: "50%" }} />
      <div style={{ position: "absolute", right: 79, bottom: 12, display: "flex", width: 150, height: 150, border: "2px solid #f1bb7c", borderRadius: "50%" }} />
      <div style={{ position: "absolute", right: 139, bottom: 73, display: "flex", width: 28, height: 28, background: "#f1bb7c", transform: "rotate(45deg)" }} />
    </div>,
    size,
  );
}
