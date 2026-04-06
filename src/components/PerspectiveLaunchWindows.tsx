import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const STATS = [
  { label: "Tasks Automated", value: "23", color: "#e2711d" },
  { label: "Hours Saved", value: "10.4", color: "#22c55e" },
  { label: "Active Systems", value: "6", color: "#818cf8" },
  { label: "Uptime", value: "99.9%", color: "#fbbf24" },
];

const NAV_ITEMS = ["Dashboard", "Workflows", "Reports", "Settings"];

export const PerspectiveLaunchWindows = () => {
  const frame = useCurrentFrame();

  const rotateX = interpolate(frame, [0, 600], [12, 4], {
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [0, 600], [-8, 2], {
    extrapolateRight: "clamp",
  });

  const windowScale = spring({
    frame,
    fps: 30,
    from: 0.85,
    to: 1,
    config: { damping: 20, stiffness: 60 },
  });
  const windowOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shadowX = interpolate(frame, [0, 600], [20, -5], {
    extrapolateRight: "clamp",
  });
  const shadowY = interpolate(frame, [0, 600], [40, 25], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1200,
        fontFamily,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(226,113,29,0.08) 0%, transparent 70%)",
          top: "20%",
          left: "30%",
        }}
      />

      {/* Window */}
      <div
        style={{
          width: 1100,
          opacity: windowOpacity,
          transform: `scale(${windowScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: `${shadowX}px ${shadowY}px 80px rgba(0,0,0,0.5), 0 0 40px rgba(226,113,29,0.05)`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Windows-style title bar */}
        <div
          style={{
            height: 36,
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* App icon + title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: 1,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                backgroundColor: "#e2711d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              K
            </div>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>
              KAIAK Dashboard — app.kaiak.io
            </span>
          </div>

          {/* Windows controls */}
          <div style={{ display: "flex", gap: 0 }}>
            {/* Minimize */}
            <div
              style={{
                width: 46,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="1" viewBox="0 0 10 1">
                <rect width="10" height="1" fill="#94a3b8" />
              </svg>
            </div>
            {/* Maximize */}
            <div
              style={{
                width: 46,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1"
              >
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            </div>
            {/* Close */}
            <div
              style={{
                width: 46,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0 7px 0 0",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                stroke="#94a3b8"
                strokeWidth="1.2"
              >
                <line x1="0" y1="0" x2="10" y2="10" />
                <line x1="10" y1="0" x2="0" y2="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab bar (VS Code style) */}
        <div
          style={{
            height: 35,
            backgroundColor: "#1a2332",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 8px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              padding: "7px 16px",
              borderRadius: "6px 6px 0 0",
              color: "#e2e8f0",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderTop: "2px solid #e2711d",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e2711d"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M3 9h6" />
            </svg>
            Dashboard
          </div>
          <div
            style={{
              padding: "7px 16px",
              color: "#64748b",
              fontSize: 12,
            }}
          >
            Workflows
          </div>
          <div
            style={{
              padding: "7px 16px",
              color: "#64748b",
              fontSize: 12,
            }}
          >
            Reports
          </div>
        </div>

        {/* Dashboard content */}
        <div
          style={{
            backgroundColor: "#0f172a",
            display: "flex",
            minHeight: 480,
          }}
        >
          {/* Sidebar with VS Code-style icons */}
          <div
            style={{
              width: 48,
              backgroundColor: "#1a2332",
              padding: "12px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              borderRight: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Activity bar icons */}
            {[
              "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3",
              "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0",
              "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            ].map((path, i) => {
              const iconOpacity = interpolate(
                frame,
                [10 + i * 4, 18 + i * 4],
                [0, i === 0 ? 1 : 0.4],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    opacity: iconOpacity,
                    padding: 6,
                    borderLeft: i === 0 ? "2px solid #e2711d" : "2px solid transparent",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={i === 0 ? "#e2e8f0" : "#64748b"}
                    strokeWidth="1.5"
                  >
                    <path d={path} />
                  </svg>
                </div>
              );
            })}
          </div>

          {/* Explorer panel */}
          <div
            style={{
              width: 180,
              backgroundColor: "#1e293b",
              padding: "16px 0",
              borderRight: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                padding: "0 14px",
                marginBottom: 12,
              }}
            >
              Explorer
            </div>
            {NAV_ITEMS.map((item, i) => {
              const navOpacity = interpolate(
                frame,
                [15 + i * 5, 25 + i * 5],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    padding: "6px 14px",
                    color: i === 0 ? "#e2e8f0" : "#94a3b8",
                    fontSize: 13,
                    fontWeight: i === 0 ? 500 : 400,
                    backgroundColor:
                      i === 0 ? "rgba(226,113,29,0.08)" : "transparent",
                    opacity: navOpacity,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 10, color: i === 0 ? "#e2711d" : "#64748b" }}>
                    {i === 0 ? "▼" : "▶"}
                  </span>
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main area */}
          <div style={{ flex: 1, padding: "28px 32px" }}>
            <div
              style={{
                opacity: interpolate(frame, [10, 25], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#e2e8f0",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  Good morning, Benedict
                </div>
                <div
                  style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}
                >
                  Your systems saved 10.4 hours this week
                </div>
              </div>
              <Img
                src={staticFile("kaiak-logo-png.png")}
                style={{ width: 100, objectFit: "contain", opacity: 0.8 }}
              />
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 16 }}>
              {STATS.map((stat, i) => {
                const cardDelay = 25 + i * 10;
                const cardScale = spring({
                  frame: Math.max(0, frame - cardDelay),
                  fps: 30,
                  from: 0.6,
                  to: 1,
                  config: { damping: 10, stiffness: 120 },
                });
                const cardOpacity = interpolate(
                  frame,
                  [cardDelay, cardDelay + 12],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderRadius: 14,
                      padding: "22px 20px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      opacity: cardOpacity,
                      transform: `scale(${cardScale})`,
                    }}
                  >
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 8,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        color: stat.color,
                        fontSize: 32,
                        fontWeight: 800,
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Activity */}
            <div
              style={{
                marginTop: 24,
                opacity: interpolate(frame, [70, 85], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Recent Activity
              </div>
              {[
                "Board report auto-generated",
                "Email triage completed (47 sorted)",
                "Policy docs indexed to knowledge base",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderRadius: 8,
                    marginBottom: 6,
                    color: "#cbd5e1",
                    fontSize: 13,
                    border: "1px solid rgba(255,255,255,0.03)",
                    opacity: interpolate(
                      frame,
                      [80 + i * 8, 90 + i * 8],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  <span style={{ color: "#22c55e", marginRight: 8 }}>●</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar (VS Code style) */}
        <div
          style={{
            height: 24,
            backgroundColor: "#e2711d",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: 11 }}>⚡ KAIAK Systems</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              main
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              All Systems Active
            </span>
            <span style={{ color: "#fff", fontSize: 11 }}>✓ Connected</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
