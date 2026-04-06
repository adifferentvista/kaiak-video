import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export type StatHighlightProps = {
  value: number;
  suffix: string;
  label: string;
  description?: string;
  source?: string;
  accentColor?: string;
};

export const StatHighlight: React.FC<StatHighlightProps> = ({
  value,
  suffix,
  label,
  description,
  source,
  accentColor = "#e2711d",
}) => {
  const frame = useCurrentFrame();

  // Count up with eased progress
  const countProgress = interpolate(frame, [15, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const currentValue = Math.round(value * countProgress);
  const formatted = currentValue.toLocaleString();

  // Number scale punch
  const numberScale = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const numberOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Suffix appears slightly after
  const suffixOpacity = interpolate(frame, [25, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const suffixScale = spring({
    frame: Math.max(0, frame - 25),
    fps: 30,
    from: 0.3,
    to: 1,
    config: { damping: 8, stiffness: 150 },
  });

  // Label
  const labelOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [35, 50], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Description
  const descOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineWidth = interpolate(frame, [30, 55], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background ring
  const ringScale = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 0.3,
    to: 1,
    config: { damping: 20, stiffness: 40 },
  });
  const ringOpacity = interpolate(frame, [5, 20], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Source
  const sourceOpacity = interpolate(frame, [65, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoOpacity = interpolate(frame, [0, 15], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #faf7f2 0%, #f0ebe3 60%, #faf7f2 100%)",
        fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative ring */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `3px solid ${accentColor}`,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `1px solid ${accentColor}`,
          opacity: ringOpacity * 0.5,
          transform: `scale(${ringScale})`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 50,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{ width: 100, objectFit: "contain" }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Big number */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
          }}
        >
          <span
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: "#1a2037",
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            {formatted}
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: accentColor,
              marginLeft: 4,
              opacity: suffixOpacity,
              transform: `scale(${suffixScale})`,
              transformOrigin: "bottom left",
            }}
          >
            {suffix}
          </span>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: accentColor,
            borderRadius: 2,
            marginTop: 8,
          }}
        />

        {/* Label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
            marginTop: 16,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1a2037",
              letterSpacing: -0.5,
            }}
          >
            {label}
          </span>
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              opacity: descOpacity,
              maxWidth: 600,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              {description}
            </span>
          </div>
        )}

        {/* Source */}
        {source && (
          <div
            style={{
              opacity: sourceOpacity,
              marginTop: 16,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#94a3b8",
                fontStyle: "italic",
              }}
            >
              Source: {source}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
