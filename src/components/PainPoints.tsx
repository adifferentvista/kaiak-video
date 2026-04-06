import { interpolate, useCurrentFrame } from "remotion";

const LINES = [
  { text: "60+ hours a week", highlight: "on admin.", delay: 0 },
  { text: "Emails. Reports. Policies.", highlight: "Repeat.", delay: 25 },
  {
    text: "You became a leader to lead —",
    highlight: "not to drown in busywork.",
    delay: 50,
  },
];

export const PainPoints = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        padding: "0 120px",
      }}
    >
      {LINES.map((line, i) => {
        const lineFrame = frame - line.delay;
        const opacity = interpolate(lineFrame, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(lineFrame, [0, 18], [30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Fade out at the end
        const fadeOut = interpolate(frame, [130, 155], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              opacity: opacity * fadeOut,
              transform: `translateY(${y}px)`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: 48,
                color: "#1a2037",
                fontWeight: 400,
              }}
            >
              {line.text}{" "}
            </span>
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: 48,
                color: "#e2711d",
                fontWeight: 700,
              }}
            >
              {line.highlight}
            </span>
          </div>
        );
      })}
    </div>
  );
};
