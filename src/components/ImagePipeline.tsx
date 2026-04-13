import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";

const { fontFamily } = loadFont();
const { fontFamily: serifFont } = loadSerif();

const CREAM = "#FFF7ED";
const CREAM_DARK = "#FEF0E0";
const NAVY = "#0F172A";
const ORANGE = "#EA580C";
const GRAY_500 = "#64748B";
const BORDER = "rgba(15, 23, 42, 0.08)";

/**
 * Image Pipeline Visual — shows the 3-command flow
 * Prompt → generate-image.js → CSV hook text → composite-featured.js → Deploy
 */
export const ImagePipeline: React.FC = () => {
  const frame = useCurrentFrame();

  const stages = [
    {
      step: "01",
      label: "Generate",
      command: "node generate-image.js",
      description: "AI prompt → illustration PNG",
      icon: null,
      color: ORANGE,
      detail: "Imagen 4 API • 16:9 • Brand palette locked",
    },
    {
      step: "02",
      label: "Hook Text",
      command: "featured-image-data.csv",
      description: "Add two-line magazine-cover hook",
      icon: null,
      color: "#2563EB",
      detail: "Line 1: navy setup • Line 2: orange punch",
    },
    {
      step: "03",
      label: "Composite",
      command: "node composite-featured.js",
      description: "Text + illustration → branded WebP",
      icon: null,
      color: "#7C3AED",
      detail: "1280×720 • Auto-trim • Pixel colour match",
    },
    {
      step: "04",
      label: "Deploy",
      command: "cp → git push",
      description: "Copy to blog → push to production",
      icon: null,
      color: "#059669",
      detail: "Vercel auto-deploys • Live in 60 seconds",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${CREAM} 0%, ${CREAM_DARK} 100%)`,
        fontFamily,
        padding: "40px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 6 }}>
          The Full Pipeline
        </div>
        <div style={{ color: NAVY, fontSize: 32, fontWeight: 400, letterSpacing: -1, fontFamily: serifFont }}>
          From prompt to production in 4 steps
        </div>
      </div>

      {/* Pipeline flow */}
      <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
        {stages.map((stage, i) => {
          const delay = i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
              <div style={{
                opacity,
                transform: `translateY(${y}px)`,
                flex: 1,
                background: "white",
                border: `1px solid ${BORDER}`,
                borderRadius: 14,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                position: "relative",
              }}>
                {/* Step number badge */}
                <div style={{
                  position: "absolute",
                  top: -10,
                  left: 20,
                  background: stage.color,
                  color: "white",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 6,
                  letterSpacing: 0.5,
                }}>
                  {stage.step}
                </div>

                {/* Spacer below badge */}
                <div style={{ height: 8 }} />

                {/* Label */}
                <div style={{
                  color: NAVY,
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 6,
                  letterSpacing: -0.3,
                }}>
                  {stage.label}
                </div>

                {/* Description */}
                <div style={{
                  color: GRAY_500,
                  fontSize: 12,
                  lineHeight: 1.5,
                  marginBottom: 12,
                  flex: 1,
                }}>
                  {stage.description}
                </div>

                {/* Command */}
                <div style={{
                  background: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 11,
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  color: NAVY,
                  fontWeight: 600,
                  marginBottom: 8,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap" as const,
                }}>
                  {stage.command}
                </div>

                {/* Detail */}
                <div style={{
                  fontSize: 10,
                  color: stage.color,
                  fontWeight: 600,
                  letterSpacing: 0.2,
                }}>
                  {stage.detail}
                </div>
              </div>

              {/* Arrow between cards */}
              {i < stages.length - 1 && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 2px",
                  opacity: interpolate(frame, [delay + 8, delay + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}>
                  <div style={{
                    color: ORANGE,
                    fontSize: 20,
                    fontWeight: 700,
                  }}>
                    →
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom summary */}
      <div style={{
        textAlign: "center",
        marginTop: 28,
        opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "white",
          border: `1px solid ${BORDER}`,
          borderRadius: 100,
          padding: "8px 20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <span style={{ color: GRAY_500, fontSize: 13 }}>3 commands</span>
          <span style={{ color: ORANGE, fontSize: 13, fontWeight: 700 }}>•</span>
          <span style={{ color: GRAY_500, fontSize: 13 }}>43 images</span>
          <span style={{ color: ORANGE, fontSize: 13, fontWeight: 700 }}>•</span>
          <span style={{ color: NAVY, fontSize: 13, fontWeight: 700 }}>Under 2 minutes</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
