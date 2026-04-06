import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  random,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadKnewave } from "@remotion/google-fonts/Knewave";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: knewave } = loadKnewave();
const { fontFamily: inter } = loadInter();

// Matrix-style data stream
const DataStream = ({ x, speed, delay }: { x: number; speed: number; delay: number }) => {
  const frame = useCurrentFrame();
  const chars = "01アイカキ{}[]<>/\\|";
  const streamLength = 12;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        opacity: 0.12,
      }}
    >
      {Array.from({ length: streamLength }).map((_, i) => {
        const charIdx = Math.floor((frame * speed + i * 7 + delay) % chars.length);
        const yOffset = ((frame * speed * 0.5 + i * 60 + delay * 20) % 1200) - 100;
        const charOpacity = interpolate(yOffset, [0, 200, 800, 1100], [0, 1, 1, 0]);

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: yOffset,
              color: "#e2711d",
              fontSize: 14,
              fontFamily: "monospace",
              opacity: charOpacity,
            }}
          >
            {chars[charIdx]}
          </span>
        );
      })}
    </div>
  );
};

// Floating geometric particles
const Particle = ({
  x,
  y,
  size,
  type,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  type: "triangle" | "hexagon" | "circle";
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame + delay) * 0.03) * 15;
  const rotation = frame * 0.3 + delay * 10;
  const opacity = interpolate(frame, [delay, delay + 20], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shapes: Record<string, React.ReactNode> = {
    triangle: (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,22 2,22" fill="none" stroke="#e2711d" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    hexagon: (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    circle: (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px solid rgba(226,113,29,0.3)",
        }}
      />
    ),
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translateY(${floatY}px) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      {shapes[type]}
    </div>
  );
};

export const CinematicIntro = () => {
  const frame = useCurrentFrame();

  // Name "pop-in" — scale from 3x to 1x
  const nameScale = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 3,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });
  const nameOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tech rings
  const ring1Rot = frame * 0.4;
  const ring2Rot = -frame * 0.3;
  const ringsOpacity = interpolate(frame, [30, 45], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // HUD panel slide in from far left
  const hudX = spring({
    frame: Math.max(0, frame - 40),
    fps: 30,
    from: -700,
    to: 0,
    config: { damping: 20, stiffness: 60 },
  });
  const hudOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scanner line
  const scannerY = interpolate(frame, [0, 300], [0, 100], {
    extrapolateRight: "clamp",
  });
  const scannerOpacity = interpolate(frame, [20, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corner brackets
  const bracketOpacity = interpolate(frame, [15, 30], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bracketScale = spring({
    frame: Math.max(0, frame - 15),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Glitch effect on name (occasional)
  const glitchActive = (frame > 80 && frame < 85) || (frame > 150 && frame < 153);
  const glitchSkew = glitchActive ? random(`glitch-${frame}`) * 8 - 4 : 0;
  const glitchHue = glitchActive ? random(`hue-${frame}`) * 30 : 0;

  // Subtitle typing
  const subtitleText = "Founder & AI Systems Architect";
  const subtitleChars = Math.min(
    Math.max(0, Math.floor((frame - 60) * 0.8)),
    subtitleText.length
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Data streams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <DataStream
          key={i}
          x={random(`ds-x-${i}`) * 100}
          speed={random(`ds-sp-${i}`) * 0.5 + 0.3}
          delay={random(`ds-d-${i}`) * 100}
        />
      ))}

      {/* Rotating dashed tech rings */}
      <div
        style={{
          position: "absolute",
          right: "25%",
          top: "50%",
          transform: "translate(50%, -50%)",
          opacity: ringsOpacity,
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "2px dashed #e2711d",
            transform: `rotate(${ring1Rot}deg)`,
            position: "absolute",
            top: -200,
            left: -200,
          }}
        />
        <div
          style={{
            width: 550,
            height: 550,
            borderRadius: "50%",
            border: "1px dashed rgba(129,140,248,0.4)",
            transform: `rotate(${ring2Rot}deg)`,
            position: "absolute",
            top: -275,
            left: -275,
          }}
        />
      </div>

      {/* Floating particles */}
      {[
        { x: 10, y: 15, size: 20, type: "triangle" as const, delay: 0 },
        { x: 85, y: 20, size: 24, type: "hexagon" as const, delay: 10 },
        { x: 75, y: 75, size: 18, type: "triangle" as const, delay: 20 },
        { x: 15, y: 80, size: 22, type: "hexagon" as const, delay: 30 },
        { x: 50, y: 10, size: 16, type: "circle" as const, delay: 5 },
        { x: 90, y: 50, size: 20, type: "circle" as const, delay: 15 },
      ].map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Scanner line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scannerY}%`,
          height: 2,
          background: "linear-gradient(90deg, transparent, #e2711d, transparent)",
          opacity: scannerOpacity,
        }}
      />

      {/* Corner brackets */}
      {[
        { top: 40, left: 60 },
        { top: 40, right: 60 },
        { bottom: 40, left: 60 },
        { bottom: 40, right: 60 },
      ].map((pos, i) => {
        const isTop = "top" in pos;
        const isLeft = "left" in pos;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 30,
              height: 30,
              opacity: bracketOpacity,
              transform: `scale(${bracketScale})`,
              borderTop: isTop ? "2px solid #e2711d" : "none",
              borderBottom: !isTop ? "2px solid #e2711d" : "none",
              borderLeft: isLeft ? "2px solid #e2711d" : "none",
              borderRight: !isLeft ? "2px solid #e2711d" : "none",
            }}
          />
        );
      })}

      {/* Main name — center */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${nameScale}) skewX(${glitchSkew}deg)`,
          opacity: nameOpacity,
          filter: `hue-rotate(${glitchHue}deg)`,
        }}
      >
        <span
          style={{
            fontFamily: knewave,
            fontSize: 130,
            color: "#e2711d",
            textShadow: "0 0 40px rgba(226,113,29,0.2)",
            letterSpacing: -2,
          }}
        >
          KAIAK
        </span>
      </div>

      {/* Glassmorphism HUD panel — slides from left */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "55%",
          transform: `translateX(${hudX}px)`,
          opacity: hudOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(26, 32, 55, 0.85)",
            backdropFilter: "blur(16px)",
            padding: "24px 32px",
            borderRadius: "4px 16px 16px 4px",
            border: "1px solid rgba(226,113,29,0.2)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 80%)",
            minWidth: 380,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#e2711d",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 8,
            }}
          >
            // System Architect
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 22,
              color: "#f1f5f9",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Benedict Rinne, M.Ed.
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: "#94a3b8",
            }}
          >
            {subtitleText.slice(0, subtitleChars)}
            {subtitleChars < subtitleText.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 16,
                  backgroundColor: "#e2711d",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                }}
              />
            )}
          </div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 16,
              fontFamily: "monospace",
              fontSize: 11,
              color: "#64748b",
            }}
          >
            <span>AI Systems</span>
            <span>·</span>
            <span>School Leadership</span>
            <span>·</span>
            <span>Automation</span>
          </div>
        </div>
      </div>

      {/* Logo in corner */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          opacity: interpolate(frame, [60, 75], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{ width: 100, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};
