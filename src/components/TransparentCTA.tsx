import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export const TransparentCTA = () => {
  const frame = useCurrentFrame();

  // Lower third slide in from bottom
  const slideY = spring({
    frame,
    fps: 30,
    from: 120,
    to: 0,
    config: { damping: 18, stiffness: 80 },
  });

  const barOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe button state
  const buttonPressFrame = 90;
  const isPressed = frame >= buttonPressFrame;

  // Press-in: ease-out shrink
  const pressScale = isPressed
    ? interpolate(
        frame,
        [buttonPressFrame, buttonPressFrame + 6, buttonPressFrame + 12],
        [1, 0.92, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  // Bounce after press
  const bounceScale = isPressed
    ? spring({
        frame: Math.max(0, frame - buttonPressFrame - 6),
        fps: 30,
        from: 0.92,
        to: 1,
        config: { damping: 8, stiffness: 200 },
      })
    : 1;

  const finalButtonScale = isPressed ? bounceScale : pressScale;

  // Text change
  const showSubscribed = frame >= buttonPressFrame + 6;

  // Checkmark appear
  const checkScale = spring({
    frame: Math.max(0, frame - buttonPressFrame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150 },
  });

  // Fade out
  const fadeOut = interpolate(frame, [170, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscriber count tick up
  const subCount = isPressed
    ? interpolate(
        frame,
        [buttonPressFrame + 6, buttonPressFrame + 20],
        [1243, 1244],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1243;

  return (
    <AbsoluteFill
      style={{
        // Transparent background — this would render as ProRes with alpha
        backgroundColor: "rgba(0,0,0,0)",
        fontFamily,
      }}
    >
      {/* Demo background so we can see it in Studio */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        }}
      />

      {/* Lower third container */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${slideY}px)`,
          opacity: barOpacity * fadeOut,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            minWidth: 420,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a2037, #e2711d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              K
            </span>
          </div>

          {/* Channel info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f0f0f",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              KAIAK
              {/* Verified badge */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#606060">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div style={{ fontSize: 12, color: "#606060" }}>
              {Math.floor(subCount).toLocaleString()} subscribers
            </div>
          </div>

          {/* Subscribe button */}
          <div
            style={{
              transform: `scale(${finalButtonScale})`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: showSubscribed ? "#f2f2f2" : "#0f0f0f",
                color: showSubscribed ? "#606060" : "#ffffff",
                padding: "10px 20px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 110,
                justifyContent: "center",
                transition: "none",
              }}
            >
              {showSubscribed && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#606060"
                  strokeWidth="2.5"
                  style={{
                    transform: `scale(${checkScale})`,
                  }}
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
              {showSubscribed ? "Subscribed" : "Subscribe"}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
