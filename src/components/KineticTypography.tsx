import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  random,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export const KineticTypography = () => {
  const frame = useCurrentFrame();

  // Word 1: "AUTOMATE" — zooms from 0 to full scale instantly
  const word1Scale = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });
  const word1Opacity = frame >= 10 ? 1 : 0;

  // Word 2: "YOUR" — slides in from the right
  const word2X = interpolate(frame, [25, 40], [400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const word2Opacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word 3: "SCHOOL" — fades in with blur
  const word3Opacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const word3Blur = interpolate(frame, [45, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shake at frame 75
  const isShaking = frame >= 75 && frame < 85;
  const shakeX = isShaking ? random(`shake-x-${frame}`) * 12 - 6 : 0;
  const shakeY = isShaking ? random(`shake-y-${frame}`) * 8 - 4 : 0;

  // Flash on impact
  const flashOpacity = interpolate(frame, [75, 78, 82], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line wipe
  const lineWidth = interpolate(frame, [85, 105], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagOpacity = interpolate(frame, [110, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [110, 125], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade
  const fadeOut = interpolate(frame, [155, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        opacity: fadeOut,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ffffff",
          opacity: flashOpacity,
        }}
      />

      {/* Main text block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* AUTOMATE */}
        <div
          style={{
            opacity: word1Opacity,
            transform: `scale(${word1Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            AUTOMATE
          </span>
        </div>

        {/* YOUR */}
        <div
          style={{
            opacity: word2Opacity,
            transform: `translateX(${word2X}px)`,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 300,
              color: "#fbbf24",
              letterSpacing: 20,
              lineHeight: 1,
            }}
          >
            YOUR
          </span>
        </div>

        {/* SCHOOL */}
        <div
          style={{
            opacity: word3Opacity,
            filter: `blur(${word3Blur}px)`,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            SCHOOL
          </span>
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: "#fbbf24",
          borderRadius: 2,
          marginTop: 30,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          marginTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          AI & Systems for Leaders
        </span>
      </div>
    </AbsoluteFill>
  );
};
