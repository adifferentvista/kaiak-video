import { interpolate, useCurrentFrame } from "remotion";

export const SolutionReveal = () => {
  const frame = useCurrentFrame();

  const questionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questionY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hoursOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hoursScale = interpolate(frame, [30, 50], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse on the hours number
  const glowIntensity = interpolate(
    frame,
    [50, 65, 80],
    [0, 12, 6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeOut = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          opacity: questionOpacity,
          transform: `translateY(${questionY}px)`,
          fontFamily: "'Georgia', serif",
          fontSize: 44,
          color: "#4a5568",
          textAlign: "center",
        }}
      >
        What if you could get back
      </div>

      <div
        style={{
          opacity: hoursOpacity,
          transform: `scale(${hoursScale})`,
          display: "flex",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 120,
            fontWeight: 800,
            color: "#e2711d",
            textShadow: `0 0 ${glowIntensity}px rgba(226, 113, 29, 0.4)`,
          }}
        >
          10+
        </span>
        <span
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 52,
            color: "#1a2037",
            fontWeight: 400,
          }}
        >
          hours every week?
        </span>
      </div>
    </div>
  );
};
