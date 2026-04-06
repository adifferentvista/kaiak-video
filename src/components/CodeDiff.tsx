import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const BEFORE_CODE = [
  { text: "// Monday morning routine", type: "comment" },
  { text: "function processEmails() {", type: "keyword" },
  { text: "  for (const email of inbox) {", type: "code" },
  { text: "    readEmail(email);", type: "code" },
  { text: "    categorize(email);", type: "code" },
  { text: "    draftReply(email);", type: "highlight-red" },
  { text: "    forwardToTeam(email);", type: "highlight-red" },
  { text: "    updateSpreadsheet(email);", type: "highlight-red" },
  { text: "  }", type: "code" },
  { text: "  // Time: 3+ hours", type: "comment-red" },
  { text: "}", type: "keyword" },
];

const AFTER_CODE = [
  { text: "// Monday morning routine", type: "comment" },
  { text: "function processEmails() {", type: "keyword" },
  { text: "  const sorted = ai.triage(inbox);", type: "highlight-green" },
  { text: "  const replies = ai.draft(sorted);", type: "highlight-green" },
  { text: "  ai.notify(team, sorted);", type: "highlight-green" },
  { text: "  ai.log(dashboard);", type: "highlight-green" },
  { text: "", type: "code" },
  { text: "", type: "code" },
  { text: "", type: "code" },
  { text: "  // Time: 0 minutes ✓", type: "comment-green" },
  { text: "}", type: "keyword" },
];

const getColor = (type: string) => {
  switch (type) {
    case "comment": return "#64748b";
    case "comment-red": return "#ef4444";
    case "comment-green": return "#22c55e";
    case "keyword": return "#c4b5fd";
    case "highlight-red": return "#fca5a5";
    case "highlight-green": return "#86efac";
    default: return "#cbd5e1";
  }
};

const getBg = (type: string) => {
  if (type === "highlight-red") return "rgba(239,68,68,0.08)";
  if (type === "highlight-green") return "rgba(34,197,94,0.08)";
  return "transparent";
};

const CodeBlock = ({
  title,
  lines,
  side,
}: {
  title: string;
  lines: typeof BEFORE_CODE;
  side: "before" | "after";
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: side === "before" ? "#ef4444" : "#22c55e",
          }}
        />
        <span style={{ color: "#94a3b8", fontSize: 13, fontFamily }}>
          {title}
        </span>
      </div>

      {/* Code lines */}
      <div
        style={{
          backgroundColor: "#0f172a",
          padding: "16px 0",
          flex: 1,
          fontFamily: "'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace",
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        {lines.map((line, i) => {
          const lineOpacity = interpolate(
            frame,
            [i * 3, i * 3 + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Highlight animation for changed lines
          const isHighlight = line.type.includes("highlight");
          const highlightWidth = isHighlight
            ? interpolate(
                frame,
                [i * 3 + 5, i * 3 + 15],
                [0, 100],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

          return (
            <div
              key={i}
              style={{
                opacity: lineOpacity,
                padding: "0 18px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Line number */}
              <span
                style={{
                  color: "#334155",
                  width: 30,
                  textAlign: "right",
                  marginRight: 16,
                  fontSize: 12,
                  userSelect: "none",
                }}
              >
                {i + 1}
              </span>

              {/* Highlight bar */}
              {isHighlight && (
                <div
                  style={{
                    position: "absolute",
                    left: 46,
                    top: 0,
                    width: `${highlightWidth}%`,
                    height: "100%",
                    backgroundColor: getBg(line.type),
                    borderLeft: `2px solid ${line.type.includes("red") ? "#ef4444" : "#22c55e"}`,
                  }}
                />
              )}

              <span
                style={{
                  color: getColor(line.type),
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {line.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CodeDiff = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Panels
  const panelOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Commit badge
  const commitScale = spring({
    frame: Math.max(0, frame - 100),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150 },
  });
  const commitOpacity = interpolate(frame, [100, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow between panels
  const arrowOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 60px",
        gap: 24,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ color: "#e2e8f0", fontSize: 32, fontWeight: 700 }}>
          From Manual to
        </span>
        <span
          style={{
            color: "#fbbf24",
            fontSize: 32,
            fontWeight: 700,
            backgroundColor: "rgba(251,191,36,0.1)",
            padding: "4px 16px",
            borderRadius: 8,
          }}
        >
          Automated
        </span>
      </div>

      {/* Code panels */}
      <div
        style={{
          display: "flex",
          gap: 24,
          width: "100%",
          maxWidth: 1300,
          opacity: panelOpacity,
          alignItems: "center",
        }}
      >
        <Sequence from={10}>
          <CodeBlock title="email-handler.ts — Before" lines={BEFORE_CODE} side="before" />
        </Sequence>

        {/* Arrow */}
        <div
          style={{
            opacity: arrowOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
            KAIAK
          </span>
        </div>

        <Sequence from={35}>
          <CodeBlock title="email-handler.ts — After" lines={AFTER_CODE} side="after" />
        </Sequence>
      </div>

      {/* Commit badge */}
      <div
        style={{
          opacity: commitOpacity,
          transform: `scale(${commitScale})`,
          backgroundColor: "#22c55e",
          color: "#0f172a",
          padding: "10px 24px",
          borderRadius: 20,
          fontSize: 15,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 0 20px rgba(34,197,94,0.3)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
        Committed — 3 hours saved per week
      </div>
    </AbsoluteFill>
  );
};
