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

  // 3D rotation that slowly shifts over time — identical to macOS version
  const rotateX = interpolate(frame, [0, 600], [12, 4], {
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [0, 600], [-8, 2], {
    extrapolateRight: "clamp",
  });

  // Window entrance
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

  // Floating shadow shifts with rotation
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

      {/* Window — same size and border radius as macOS */}
      <div
        style={{
          width: 1100,
          opacity: windowOpacity,
          transform: `scale(${windowScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `${shadowX}px ${shadowY}px 80px rgba(0,0,0,0.5), 0 0 40px rgba(226,113,29,0.05)`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Windows title bar */}
        <div
          style={{
            height: 44,
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* App icon + title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                backgroundColor: "#e2711d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              K
            </div>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>
              KAIAK Dashboard — app.kaiak.io
            </span>
          </div>

          {/* Windows controls: ─ □ ✕ */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 46,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="1" viewBox="0 0 10 1">
                <rect width="10" height="1" fill="#94a3b8" />
              </svg>
            </div>
            <div
              style={{
                width: 46,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#94a3b8" strokeWidth="1">
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            </div>
            <div
              style={{
                width: 46,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" stroke="#94a3b8" strokeWidth="1.2">
                <line x1="0" y1="0" x2="10" y2="10" />
                <line x1="10" y1="0" x2="0" y2="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dashboard content — same layout as macOS */}
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "0",
            display: "flex",
            minHeight: 500,
          }}
        >
          {/* Sidebar — same as macOS but with KAIAK orange */}
          <div
            style={{
              width: 200,
              backgroundColor: "#1e293b",
              padding: "24px 0",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                color: "#e2711d",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 2,
                padding: "0 20px",
                marginBottom: 20,
              }}
            >
              KAIAK
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
                    padding: "10px 20px",
                    color: i === 0 ? "#e2711d" : "#94a3b8",
                    fontSize: 14,
                    fontWeight: i === 0 ? 600 : 400,
                    backgroundColor: i === 0 ? "rgba(226,113,29,0.08)" : "transparent",
                    borderLeft: i === 0 ? "3px solid #e2711d" : "3px solid transparent",
                    opacity: navOpacity,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main area — identical to macOS */}
          <div style={{ flex: 1, padding: "28px 32px" }}>
            {/* Header */}
            <div
              style={{
                opacity: interpolate(frame, [10, 25], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 24, fontWeight: 700 }}>
                    Good morning, Benedict
                  </div>
                  <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                    Your systems saved 10.4 hours this week
                  </div>
                </div>
                <Img
                  src={staticFile("kaiak-logo-png.png")}
                  style={{ width: 100, objectFit: "contain", opacity: 0.8 }}
                />
              </div>
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

            {/* Recent Activity */}
            <div
              style={{
                marginTop: 24,
                opacity: interpolate(frame, [70, 85], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12, fontWeight: 600 }}>
                Recent Activity
              </div>
              {["Board report auto-generated", "Email triage completed (47 sorted)", "Policy docs indexed to knowledge base"].map(
                (item, i) => (
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
                )
              )}
            </div>
          </div>
        </div>

        {/* Status bar — VS Code orange */}
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
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>⚡ KAIAK Systems</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>main</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>All Systems Active</span>
            <span style={{ color: "#fff", fontSize: 11 }}>✓ Connected</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
