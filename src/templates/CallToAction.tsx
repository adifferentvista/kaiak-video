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

export type CallToActionProps = {
  headline: string;
  subtext?: string;
  buttonText: string;
  buttonUrl?: string;
  style?: "default" | "minimal" | "bold";
};

export const CallToAction: React.FC<CallToActionProps> = ({
  headline,
  subtext,
  buttonText,
  style = "default",
}) => {
  const frame = useCurrentFrame();

  // Card entrance
  const cardScale = spring({
    frame,
    fps: 30,
    from: 0.9,
    to: 1,
    config: { damping: 16, stiffness: 80 },
  });
  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoScale = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const logoOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [12, 28], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtext
  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button
  const btnScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    from: 0.6,
    to: 1,
    config: { damping: 8, stiffness: 120 },
  });
  const btnOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineWidth = interpolate(frame, [15, 35], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isBold = style === "bold";

  return (
    <AbsoluteFill
      style={{
        background: isBold
          ? "linear-gradient(135deg, #1a2037 0%, #2a3050 100%)"
          : "linear-gradient(135deg, #faf7f2 0%, #f0ebe3 60%, #faf7f2 100%)",
        fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: isBold
            ? "linear-gradient(rgba(226,113,29,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(226,113,29,0.04) 1px, transparent 1px)"
            : "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          backgroundColor: isBold ? "rgba(255,255,255,0.04)" : "#ffffff",
          borderRadius: 24,
          padding: "60px 80px",
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: isBold
            ? "0 0 60px rgba(226,113,29,0.08)"
            : "0 4px 40px rgba(26,32,55,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          border: isBold
            ? "1px solid rgba(226,113,29,0.15)"
            : "1px solid rgba(26,32,55,0.06)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 8,
          }}
        >
          <Img
            src={staticFile("kaiak-logo-png.png")}
            style={{ width: 180, objectFit: "contain" }}
          />
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: "#e2711d",
            borderRadius: 2,
          }}
        />

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 36,
            fontWeight: 700,
            color: isBold ? "#e2e8f0" : "#1a2037",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
          }}
        >
          {headline}
        </h2>

        {/* Subtext */}
        {subtext && (
          <p
            style={{
              fontSize: 18,
              color: isBold ? "#94a3b8" : "#64748b",
              margin: 0,
              textAlign: "center",
              maxWidth: 500,
              lineHeight: 1.6,
              opacity: subOpacity,
            }}
          >
            {subtext}
          </p>
        )}

        {/* Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            marginTop: 12,
          }}
        >
          <div
            style={{
              backgroundColor: "#e2711d",
              color: "#ffffff",
              padding: "16px 40px",
              borderRadius: 30,
              fontSize: 18,
              fontWeight: 700,
              boxShadow: "0 0 30px rgba(226,113,29,0.25)",
            }}
          >
            {buttonText}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
