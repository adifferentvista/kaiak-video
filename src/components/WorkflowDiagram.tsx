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
 * The Three-Document System: Brand Guide + Workflow + Brief
 * Shows how they connect and what each one answers
 */
export const WorkflowDiagram: React.FC = () => {
  const frame = useCurrentFrame();

  const docs = [
    {
      step: "01",
      label: "BRANDING.md",
      question: "Does this look like us?",
      items: ["Colours + typography", "Prompt prefix rules", "Animation patterns", "What to avoid"],
      color: ORANGE,
      type: "HOW IT LOOKS",
    },
    {
      step: "02",
      label: "WORKFLOW.md",
      question: "What do I do next?",
      items: ["Step-by-step commands", "Locked vs swappable", "File locations", "Deploy process"],
      color: "#2563EB",
      type: "WHAT TO DO",
    },
    {
      step: "03",
      label: "BRIEF.md",
      question: "What am I building?",
      items: ["Context + constraints", "Templates for AI", "Example prompts", "Quality criteria"],
      color: "#7C3AED",
      type: "WHY + WHAT",
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
          The System
        </div>
        <div style={{ color: NAVY, fontSize: 32, fontWeight: 400, letterSpacing: -1, fontFamily: serifFont }}>
          Three documents that run everything
        </div>
      </div>

      {/* Three document cards */}
      <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
        {docs.map((doc, i) => {
          const delay = i * 12;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ display: "flex", flex: 1 }}>
              <div style={{
                opacity,
                transform: `translateY(${y}px)`,
                flex: 1,
                background: "white",
                border: `1px solid ${BORDER}`,
                borderRadius: 14,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                position: "relative",
              }}>
                {/* Step badge */}
                <div style={{
                  position: "absolute",
                  top: -10,
                  left: 22,
                  background: doc.color,
                  color: "white",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 6,
                  letterSpacing: 0.5,
                }}>
                  {doc.step}
                </div>

                {/* Type label */}
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase" as const,
                  color: doc.color,
                  marginTop: 8,
                  marginBottom: 8,
                }}>
                  {doc.type}
                </div>

                {/* Document name */}
                <div style={{
                  background: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 14,
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  color: NAVY,
                  fontWeight: 700,
                  marginBottom: 12,
                }}>
                  {doc.label}
                </div>

                {/* Question it answers */}
                <div style={{
                  color: NAVY,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 14,
                  fontStyle: "italic",
                  fontFamily: serifFont,
                  letterSpacing: -0.3,
                }}>
                  "{doc.question}"
                </div>

                {/* What it contains */}
                <div style={{ flex: 1 }}>
                  {doc.items.map((item, j) => {
                    const itemDelay = delay + 8 + j * 4;
                    const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return (
                      <div key={j} style={{
                        opacity: itemOpacity,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "5px 0",
                        fontSize: 12,
                        color: GRAY_500,
                      }}>
                        <span style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          background: doc.color,
                          flexShrink: 0,
                          opacity: 0.5,
                        }} />
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom connector */}
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
          <span style={{ color: GRAY_500, fontSize: 13 }}>Anyone can follow the system</span>
          <span style={{ color: ORANGE, fontSize: 13, fontWeight: 700 }}>—</span>
          <span style={{ color: NAVY, fontSize: 13, fontWeight: 700 }}>people or AI</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
