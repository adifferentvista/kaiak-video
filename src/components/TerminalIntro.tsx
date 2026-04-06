import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";

const COMMAND = "npx create-remotion-app";
const TYPING_START = 15;
const CHARS_PER_FRAME = 0.6;
const TYPING_END = TYPING_START + Math.ceil(COMMAND.length / CHARS_PER_FRAME);
const CHECK_FRAME = TYPING_END + 10;
const FADE_START = 120;

export const TerminalIntro = () => {
  const frame = useCurrentFrame();

  // Window fade in
  const windowOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = spring({
    frame,
    fps: 30,
    from: 0.92,
    to: 1,
    config: { damping: 18, stiffness: 90 },
  });

  // Typewriter
  const charsToShow = Math.min(
    Math.max(0, Math.floor((frame - TYPING_START) * CHARS_PER_FRAME)),
    COMMAND.length
  );
  const typedText = COMMAND.slice(0, charsToShow);
  const isTyping = frame >= TYPING_START && charsToShow < COMMAND.length;
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;
  const showCursor =
    frame >= TYPING_START &&
    (isTyping || (charsToShow >= COMMAND.length && cursorBlink && frame < CHECK_FRAME));

  // Success checkmark
  const checkScale = spring({
    frame: Math.max(0, frame - CHECK_FRAME),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150, mass: 0.8 },
  });
  const checkOpacity = interpolate(
    frame,
    [CHECK_FRAME, CHECK_FRAME + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Success text
  const successOpacity = interpolate(
    frame,
    [CHECK_FRAME + 8, CHECK_FRAME + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const successY = interpolate(
    frame,
    [CHECK_FRAME + 8, CHECK_FRAME + 18],
    [10, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out
  const fadeOut = interpolate(frame, [FADE_START, 148], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          width: 820,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.08)",
          opacity: windowOpacity,
          transform: `scale(${windowScale})`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 44,
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
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
          <span
            style={{
              color: "#64748b",
              fontSize: 13,
              fontFamily:
                "'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace",
              marginLeft: 12,
            }}
          >
            Terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "28px 28px 32px",
            minHeight: 180,
          }}
        >
          {/* Prompt line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily:
                "'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace",
              fontSize: 20,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "#22c55e", marginRight: 10 }}>$</span>
            <span style={{ color: "#e2e8f0" }}>{typedText}</span>
            {showCursor && (
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 24,
                  backgroundColor: "#e2e8f0",
                  marginLeft: 2,
                  borderRadius: 1,
                }}
              />
            )}
          </div>

          {/* Success row */}
          {frame >= CHECK_FRAME && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 24,
              }}
            >
              {/* Checkmark circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkOpacity,
                  transform: `scale(${checkScale})`,
                  boxShadow: "0 0 20px rgba(34,197,94,0.3)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Success text */}
              <span
                style={{
                  color: "#22c55e",
                  fontSize: 18,
                  fontFamily:
                    "'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace",
                  opacity: successOpacity,
                  transform: `translateY(${successY}px)`,
                }}
              >
                Project created successfully!
              </span>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
