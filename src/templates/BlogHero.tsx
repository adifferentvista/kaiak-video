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

const CATEGORY_COLORS: Record<string, string> = {
  "Leadership": "#8b5cf6",
  "AI in Education": "#3b82f6",
  "Systems Thinking": "#e2711d",
  "Practical AI": "#22c55e",
  "No-Admin Life": "#ec4899",
};

export type BlogHeroProps = {
  title: string;
  subtitle?: string;
  category: string;
  readTime?: string;
};

export const BlogHero: React.FC<BlogHeroProps> = ({
  title,
  subtitle,
  category,
  readTime = "5 min read",
}) => {
  const frame = useCurrentFrame();
  const accentColor = CATEGORY_COLORS[category] || "#e2711d";

  // Background pattern fade
  const patternOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Category badge
  const badgeScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // Title
  const titleOpacity = interpolate(frame, [8, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [8, 24], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle
  const subOpacity = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [18, 34], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineWidth = interpolate(frame, [12, 35], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Read time + decorative elements
  const metaOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoOpacity = interpolate(frame, [5, 20], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative circle
  const circleScale = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #faf7f2 0%, #f0ebe3 60%, #faf7f2 100%)",
        fontFamily,
      }}
    >
      {/* Grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: patternOpacity,
        }}
      />

      {/* Large decorative circle */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `2px solid ${accentColor}15`,
          transform: `scale(${circleScale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -50,
          top: -50,
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: `${accentColor}06`,
          transform: `scale(${circleScale})`,
        }}
      />

      {/* Small decorative dots */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 100,
          display: "grid",
          gridTemplateColumns: "repeat(4, 8px)",
          gap: 12,
          opacity: patternOpacity * 0.3,
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
        ))}
      </div>

      {/* Logo watermark */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{ width: 120, objectFit: "contain" }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 100px",
          maxWidth: 1200,
        }}
      >
        {/* Category badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: `${accentColor}12`,
              border: `1px solid ${accentColor}25`,
              color: accentColor,
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <span
            style={{
              color: "#94a3b8",
              fontSize: 13,
              opacity: metaOpacity,
            }}
          >
            {readTime}
          </span>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: accentColor,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 58,
            fontWeight: 700,
            color: "#1a2037",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: 900,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: 24,
              color: "#64748b",
              margin: "16px 0 0",
              maxWidth: 700,
              lineHeight: 1.5,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Author line */}
        <div
          style={{
            opacity: metaOpacity,
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a2037, #2a3050)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e2711d",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div>
            <div style={{ color: "#1a2037", fontSize: 14, fontWeight: 600 }}>
              Benedict Rinne, M.Ed.
            </div>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>
              Founder, KAIAK
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
