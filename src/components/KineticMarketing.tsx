import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  random,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont();

// Floating logo circles with depth-of-field blur
const FloatingLogo = ({
  x,
  y,
  size,
  blur,
  delay,
  speed,
}: {
  x: number;
  y: number;
  size: number;
  blur: number;
  delay: number;
  speed: number;
}) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame + delay) * speed * 0.03) * 20;
  const floatX = Math.cos((frame + delay) * speed * 0.02) * 10;
  const opacity = interpolate(frame, [delay, delay + 20], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(236,72,153,0.3))",
        filter: `blur(${blur}px)`,
        opacity,
        transform: `translate(${floatX}px, ${floatY}px)`,
      }}
    />
  );
};

// Radar ring
const RadarRing = ({ size, delay }: { size: number; delay: number }) => {
  const frame = useCurrentFrame();
  const rotation = frame * 0.5 + delay * 10;
  const opacity = interpolate(frame, [delay, delay + 15], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px dashed rgba(99,102,241,0.2)",
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    />
  );
};

const WORDS = [
  { text: "BUILD", color: "#0b84f3", delay: 0 },
  { text: "FASTER", color: "#f1f5f9", delay: 15 },
  { text: "WITH", color: "#a78bfa", delay: 30 },
  { text: "AI", color: "#0b84f3", delay: 42 },
  { text: "SYSTEMS", color: "#f1f5f9", delay: 55 },
];

const SUBTEXT = [
  { text: "AUTOMATE", delay: 80 },
  { text: "·", delay: 85 },
  { text: "INTEGRATE", delay: 90 },
  { text: "·", delay: 95 },
  { text: "SCALE", delay: 100 },
];

export const KineticMarketing = () => {
  const frame = useCurrentFrame();

  // Background gradient breathing
  const breathe = Math.sin(frame * 0.02) * 0.3 + 0.5;
  const hue1 = interpolate(frame, [0, 300], [280, 320], { extrapolateRight: "clamp" });
  const hue2 = interpolate(frame, [0, 300], [240, 260], { extrapolateRight: "clamp" });

  // Pulse circles
  const pulseScale1 = 1 + Math.sin(frame * 0.04) * 0.15;
  const pulseScale2 = 1 + Math.cos(frame * 0.03) * 0.12;

  // Iris wipe transition at the end
  const irisSize = frame > 240
    ? interpolate(frame, [240, 270], [2000, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 2000;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 40% 40%, hsla(${hue1}, 60%, 15%, ${breathe}) 0%, hsla(${hue2}, 50%, 8%, 1) 50%, #050510 100%)`,
        fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Floating depth-of-field circles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingLogo
          key={i}
          x={random(`fl-x-${i}`) * 100}
          y={random(`fl-y-${i}`) * 100}
          size={random(`fl-s-${i}`) * 60 + 20}
          blur={random(`fl-b-${i}`) * 15 + 5}
          delay={random(`fl-d-${i}`) * 30}
          speed={random(`fl-sp-${i}`) * 2 + 0.5}
        />
      ))}

      {/* Radar rings */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <RadarRing size={400} delay={0} />
        <RadarRing size={600} delay={5} />
        <RadarRing size={800} delay={10} />
      </div>

      {/* Pulse circles */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,132,243,0.08) 0%, transparent 70%)",
          transform: `scale(${pulseScale1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          transform: `scale(${pulseScale2})`,
        }}
      />

      {/* Main text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 2,
        }}
      >
        {/* Words with elastic entrance */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 20px",
            maxWidth: 1000,
          }}
        >
          {WORDS.map((word, i) => {
            const wordScale = spring({
              frame: Math.max(0, frame - word.delay),
              fps: 30,
              from: 3,
              to: 1,
              config: { damping: 12, stiffness: 100 },
            });
            const wordOpacity = interpolate(
              frame,
              [word.delay, word.delay + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Exit: rotate and shrink
            const exitProgress = frame > 200
              ? interpolate(frame, [200 + i * 5, 220 + i * 5], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;
            const exitRotation = exitProgress * -15;
            const exitScale = 1 - exitProgress;

            return (
              <span
                key={i}
                style={{
                  fontSize: 100,
                  fontWeight: 900,
                  color: word.color,
                  opacity: wordOpacity * (1 - exitProgress * 0.8),
                  transform: `scale(${wordScale * exitScale}) rotate(${exitRotation}deg)`,
                  textShadow:
                    word.color === "#0b84f3"
                      ? "0 0 40px rgba(11,132,243,0.4)"
                      : "none",
                  lineHeight: 1.1,
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>

        {/* Subtext */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 16,
          }}
        >
          {SUBTEXT.map((item, i) => {
            const subOpacity = interpolate(
              frame,
              [item.delay, item.delay + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <span
                key={i}
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#a78bfa",
                  letterSpacing: 4,
                  opacity: subOpacity,
                }}
              >
                {item.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Iris wipe (circle closing) */}
      {frame > 240 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#050510",
            clipPath: `circle(${irisSize}px at 50% 50%)`,
            zIndex: 0,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
