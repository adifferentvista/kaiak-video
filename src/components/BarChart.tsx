import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const BAR_VALUES = [40, 80, 65, 90, 50];
const BAR_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const MAX_HEIGHT = 400;
const GROW_START = 10;


const COLORS = [
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
];

const GLOW_COLORS = [
  "rgba(139,92,246,0.4)",
  "rgba(124,58,237,0.4)",
  "rgba(109,40,217,0.4)",
  "rgba(91,33,182,0.4)",
  "rgba(76,29,149,0.4)",
];

export const BarChart = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      {/* Subtle gradient overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#e2e8f0",
            fontSize: 42,
            fontWeight: 700,
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Weekly Performance
        </h1>
        <p
          style={{
            color: "#7c3aed",
            fontSize: 18,
            margin: "8px 0 0",
            fontWeight: 500,
          }}
        >
          Tasks completed per day
        </p>
      </div>

      {/* Chart area */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 40,
          height: MAX_HEIGHT + 60,
          position: "relative",
        }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              bottom: pct * (MAX_HEIGHT / 100),
              left: -30,
              right: -30,
              height: 1,
              backgroundColor: "rgba(139,92,246,0.08)",
            }}
          />
        ))}

        {BAR_VALUES.map((value, i) => {
          const stagger = i * 4;
          const barProgress = spring({
            frame: Math.max(0, frame - GROW_START - stagger),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 60, mass: 0.8 },
          });

          const targetHeight = (value / 100) * MAX_HEIGHT;
          const currentHeight = targetHeight * barProgress;
          const currentValue = Math.round(value * barProgress);

          const labelOpacity = interpolate(
            frame,
            [GROW_START + stagger, GROW_START + stagger + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Counter label */}
              <div
                style={{
                  color: COLORS[i],
                  fontSize: 24,
                  fontWeight: 700,
                  opacity: labelOpacity,
                  minHeight: 32,
                }}
              >
                {currentValue}
              </div>

              {/* Bar */}
              <div
                style={{
                  width: 80,
                  height: currentHeight,
                  borderRadius: "8px 8px 4px 4px",
                  background: `linear-gradient(180deg, ${COLORS[i]} 0%, ${COLORS[i]}cc 100%)`,
                  boxShadow: `0 0 20px ${GLOW_COLORS[i]}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  position: "relative",
                }}
              >
                {/* Shine effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40%",
                    height: "100%",
                    borderRadius: "8px 0 0 4px",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Day label */}
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  fontWeight: 500,
                  opacity: labelOpacity,
                }}
              >
                {BAR_LABELS[i]}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
