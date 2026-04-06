import { Img, interpolate, useCurrentFrame, spring, staticFile } from "remotion";

export const BrandOutro = () => {
  const frame = useCurrentFrame();

  const logoScale = spring({
    frame,
    fps: 30,
    from: 0.6,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [20, 38], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [10, 35], [0, 180], {
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
        gap: 20,
      }}
    >
      {/* Logo image */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{
            width: 420,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: "#e2711d",
          borderRadius: 2,
          opacity: logoOpacity,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 32,
            color: "#1a2037",
            fontWeight: 400,
            letterSpacing: 3,
          }}
        >
          AI & Systems for Leaders
        </span>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          marginTop: 32,
        }}
      >
        <div
          style={{
            backgroundColor: "#e2711d",
            color: "#ffffff",
            padding: "16px 40px",
            borderRadius: 30,
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            boxShadow: "0 0 30px rgba(226,113,29,0.25)",
          }}
        >
          Book Your Free Strategy Call
        </div>
      </div>
    </div>
  );
};
