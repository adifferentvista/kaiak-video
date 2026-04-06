import { interpolate, useCurrentFrame } from "remotion";

export const BrowserWindow: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [15, 35], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: "92%",
          height: "88%",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 38,
            backgroundColor: "#2b2b2b",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Traffic lights */}
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />

          {/* Tab */}
          <div
            style={{
              marginLeft: 16,
              backgroundColor: "#1a1a2e",
              padding: "5px 20px",
              borderRadius: "8px 8px 0 0",
              color: "#ccc",
              fontSize: 12,
              fontFamily: "system-ui, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M3 9h6" />
            </svg>
            Claude Code
          </div>
        </div>

        {/* Address bar */}
        <div
          style={{
            height: 34,
            backgroundColor: "#2b2b2b",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 10, marginRight: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1e1e1e",
              borderRadius: 6,
              padding: "5px 12px",
              color: "#999",
              fontSize: 12,
              fontFamily: "system-ui, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            claude.ai/code
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1a1a2e",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
