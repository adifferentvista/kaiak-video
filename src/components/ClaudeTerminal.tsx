import { interpolate, useCurrentFrame } from "remotion";

const TYPING_START_FRAME = 50;
const CHARS_PER_FRAME = 0.4;
const MESSAGE = "This is way too cool.";

export const ClaudeTerminal: React.FC = () => {
  const frame = useCurrentFrame();

  const terminalOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const charsToShow = Math.min(
    Math.max(0, Math.floor((frame - TYPING_START_FRAME) * CHARS_PER_FRAME)),
    MESSAGE.length
  );

  const typedText = MESSAGE.slice(0, charsToShow);
  const isTyping = frame >= TYPING_START_FRAME && charsToShow < MESSAGE.length;
  const cursorVisible = frame >= TYPING_START_FRAME && Math.floor(frame / 8) % 2 === 0;
  const showCursor = isTyping || (charsToShow >= MESSAGE.length && cursorVisible);

  // Blinking cursor before typing starts
  const idleCursor =
    frame >= 35 &&
    frame < TYPING_START_FRAME &&
    Math.floor(frame / 10) % 2 === 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: terminalOpacity,
        padding: "20px 24px",
        fontFamily: "'Courier New', 'Consolas', monospace",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Terminal header area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{ color: "#d4a574", fontSize: 14, fontWeight: 600 }}>
          ╭─
        </span>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>
          Claude Code
        </span>
        <span style={{ color: "#64748b", fontSize: 12 }}>v1.0.16</span>
      </div>

      {/* Working directory */}
      <div style={{ marginBottom: 4, marginTop: 8 }}>
        <span style={{ color: "#64748b", fontSize: 13 }}>
          cwd: ~/projects/ai-course
        </span>
      </div>

      {/* Session info */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ color: "#475569", fontSize: 12 }}>
          ────────────────────────────────────────
        </span>
      </div>

      {/* Previous "conversation" context */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "#d4a574", fontSize: 15 }}>❯</span>
          <span style={{ color: "#e2e8f0", fontSize: 15 }}>
            What do you think about Claude Code?
          </span>
        </div>
        <div style={{ marginLeft: 22, marginBottom: 12 }}>
          <span style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Let me share my thoughts...
          </span>
        </div>
      </div>

      {/* Typing response area */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#d4a574",
            marginTop: 8,
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#f1f5f9",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: 0.3,
            }}
          >
            {typedText}
            {(showCursor || (frame < TYPING_START_FRAME && idleCursor)) && (
              <span
                style={{
                  color: "#d4a574",
                  fontWeight: 300,
                  marginLeft: 1,
                }}
              >
                ▎
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Bottom prompt hint */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: 0.4,
        }}
      >
        <span style={{ color: "#64748b", fontSize: 11 }}>
          Press Enter to send · /help for commands
        </span>
      </div>
    </div>
  );
};
