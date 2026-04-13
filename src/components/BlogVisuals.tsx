import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";

const { fontFamily } = loadFont();
const { fontFamily: serifFont } = loadSerif();

// Re-export for Root.tsx registration
export { ImagePipeline } from "./ImagePipeline";

// KAIAK blog colour palette
const CREAM = "#FFF7ED";
const CREAM_DARK = "#FEF0E0";
const NAVY = "#0F172A";
const NAVY_LIGHT = "#1E293B";
const ORANGE = "#EA580C";
const GRAY_500 = "#64748B";
const GRAY_400 = "#94A3B8";
const BORDER = "rgba(15, 23, 42, 0.08)";

/**
 * Visual 1: The Claude Code Feedback Loop
 */
export const ClaudeCodeLoop: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { label: "Describe", sub: "Plain English", color: ORANGE },
    { label: "Build", sub: "Claude writes code", color: "#2563EB" },
    { label: "Test", sub: "Runs automatically", color: "#7C3AED" },
    { label: "Feedback", sub: "\"Too slow\" / \"Wrong colour\"", color: "#D97706" },
    { label: "Done", sub: "Ship it", color: "#059669" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${CREAM} 0%, ${CREAM_DARK} 100%)`,
        fontFamily,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: ORANGE, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 8 }}>
          How It Actually Works
        </div>
        <div style={{ color: NAVY, fontSize: 36, fontWeight: 400, letterSpacing: -1, fontFamily: serifFont }}>
          The Claude Code Loop
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
        {steps.map((step, i) => {
          const delay = i * 8;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 140,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${step.color}10`,
                  border: `2px solid ${step.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900, color: step.color,
                  fontFamily, marginBottom: 12,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ color: NAVY, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                  {step.label}
                </div>
                <div style={{ color: GRAY_500, fontSize: 11, textAlign: "center" as const, lineHeight: 1.4 }}>
                  {step.sub}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  opacity: interpolate(frame, [delay + 6, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  color: GRAY_400,
                  fontSize: 24,
                  margin: "0 4px",
                  marginBottom: 32,
                }}>
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loop label */}
      <div style={{
        textAlign: "center", marginTop: 32,
        opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "white", border: `1px solid ${BORDER}`,
          borderRadius: 100, padding: "6px 16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          color: ORANGE, fontSize: 12, fontWeight: 600,
        }}>
          ↺ Most projects: 3-4 loops to perfection
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Visual 2: Before/After — Manual vs Automated
 */
export const ManualVsAutomated: React.FC = () => {
  const frame = useCurrentFrame();

  const beforeItems = [
    { task: "Open ChatGPT, paste prompt", time: "2 min" },
    { task: "Wait for generation", time: "1 min" },
    { task: "Download, rename file", time: "1 min" },
    { task: "Open Canva, create canvas", time: "2 min" },
    { task: "Position image, add text", time: "5 min" },
    { task: "Export, upload to blog", time: "3 min" },
  ];

  const afterItems = [
    { task: "Run generate script", time: "10 sec" },
    { task: "Add hook text to CSV", time: "30 sec" },
    { task: "Run composite script", time: "5 sec" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${CREAM} 0%, ${CREAM_DARK} 100%)`,
        fontFamily,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: 24, height: "100%" }}>
        {/* Before */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            background: "white", border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: 28, flex: 1, display: "flex", flexDirection: "column",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ color: "#DC2626", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 4 }}>
              Before
            </div>
            <div style={{ color: NAVY, fontSize: 22, fontWeight: 800, marginBottom: 20, letterSpacing: -0.5 }}>
              The Manual Way
            </div>
            <div style={{ flex: 1 }}>
              {beforeItems.map((item, i) => {
                const delay = i * 6;
                const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <div key={i} style={{
                    opacity,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: `1px solid ${BORDER}`,
                  }}>
                    <span style={{ color: GRAY_500, fontSize: 13 }}>{item.task}</span>
                    <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 16, padding: "12px 16px",
              background: "#FEF2F2", borderRadius: 10, border: "1px solid #FECACA",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: GRAY_500, fontSize: 13, fontWeight: 600 }}>Per image</span>
              <span style={{ color: "#DC2626", fontSize: 20, fontWeight: 900 }}>~15 min</span>
            </div>
          </div>
        </div>

        {/* After */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            background: "white", border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: 28, flex: 1, display: "flex", flexDirection: "column",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ color: "#059669", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 4 }}>
              After
            </div>
            <div style={{ color: NAVY, fontSize: 22, fontWeight: 800, marginBottom: 20, letterSpacing: -0.5 }}>
              The Pipeline
            </div>
            <div style={{ flex: 1 }}>
              {afterItems.map((item, i) => {
                const delay = 30 + i * 6;
                const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <div key={i} style={{
                    opacity,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: `1px solid ${BORDER}`,
                  }}>
                    <span style={{ color: GRAY_500, fontSize: 13 }}>{item.task}</span>
                    <span style={{ color: "#059669", fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 16, padding: "12px 16px",
              background: "#ECFDF5", borderRadius: 10, border: "1px solid #A7F3D0",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: GRAY_500, fontSize: 13, fontWeight: 600 }}>Per image</span>
              <span style={{ color: "#059669", fontSize: 20, fontWeight: 900 }}>~45 sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat */}
      <div style={{
        textAlign: "center", marginTop: 24,
        opacity: interpolate(frame, [55, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <span style={{ color: GRAY_500, fontSize: 13 }}>43 blog images: </span>
        <span style={{ color: "#DC2626", fontSize: 13, fontWeight: 700, textDecoration: "line-through" }}>11+ hours</span>
        <span style={{ color: GRAY_500, fontSize: 13 }}> → </span>
        <span style={{ color: "#059669", fontSize: 13, fontWeight: 700 }}>32 minutes</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Visual 3: Time Saved — What Leaders Reclaim
 */
export const TimeSavedDashboard: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    { task: "Weekly report formatting", before: "2 hrs", after: "5 min", saved: "1h 55m", accent: ORANGE },
    { task: "Blog featured images", before: "15 min each", after: "45 sec", saved: "14 min", accent: "#2563EB" },
    { task: "Monthly data processing", before: "1 hr", after: "10 sec", saved: "59 min", accent: "#7C3AED" },
    { task: "Social media cards", before: "10 min each", after: "1 command", saved: "9 min", accent: "#D97706" },
    { task: "Image resizing (batch)", before: "30 min", after: "3 sec", saved: "30 min", accent: "#059669" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${CREAM} 0%, ${CREAM_DARK} 100%)`,
        fontFamily,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ color: ORANGE, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 8 }}>
          What You Get Back
        </div>
        <div style={{ color: NAVY, fontSize: 36, fontWeight: 400, letterSpacing: -1, fontFamily: serifFont }}>
          Time saved per task
        </div>
      </div>

      <div style={{
        background: "white", border: `1px solid ${BORDER}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", padding: "12px 24px",
          borderBottom: `1px solid ${BORDER}`,
          background: CREAM,
        }}>
          <span style={{ flex: 2, color: GRAY_500, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Task</span>
          <span style={{ flex: 1, color: GRAY_500, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5, textAlign: "center" as const }}>Manual</span>
          <span style={{ flex: 1, color: GRAY_500, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5, textAlign: "center" as const }}>Automated</span>
          <span style={{ flex: 1, color: GRAY_500, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5, textAlign: "right" as const }}>Saved</span>
        </div>

        {/* Rows */}
        {items.map((item, i) => {
          const delay = i * 8;
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              opacity,
              display: "flex", padding: "14px 24px", alignItems: "center",
              borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : "none",
            }}>
              <span style={{ flex: 2, color: NAVY, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: item.accent, flexShrink: 0 }} />
                {item.task}
              </span>
              <span style={{ flex: 1, color: "#DC2626", fontSize: 13, fontWeight: 600, textAlign: "center" as const }}>{item.before}</span>
              <span style={{ flex: 1, color: "#059669", fontSize: 13, fontWeight: 600, textAlign: "center" as const }}>{item.after}</span>
              <span style={{ flex: 1, color: ORANGE, fontSize: 14, fontWeight: 800, textAlign: "right" as const }}>{item.saved}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
