import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const QUOTE =
  "KAIAK transformed how our school operates. What used to take me an entire weekend now happens automatically. I finally have time to focus on our students and teachers.";

const STATS = [
  { value: "90%", label: "Less time on reports" },
  { value: "15hrs", label: "Saved per week" },
  { value: "3 weeks", label: "To full automation" },
];

export const TestimonialSpotlight = () => {
  const frame = useCurrentFrame();

  // Quote card entrance
  const cardScale = spring({
    frame,
    fps: 30,
    from: 0.9,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });
  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quote mark
  const quoteOpacity = interpolate(frame, [8, 22], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typewriter-style quote reveal (word by word)
  const words = QUOTE.split(" ");
  const wordsToShow = Math.min(
    Math.max(0, Math.floor((frame - 15) * 0.35)),
    words.length
  );
  const visibleQuote = words.slice(0, wordsToShow).join(" ");

  // Attribution
  const attrOpacity = interpolate(frame, [100, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const attrY = interpolate(frame, [100, 115], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats row
  const statsOpacity = interpolate(frame, [120, 138], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand outro
  const outroOpacity = interpolate(frame, [220, 238], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)",
        fontFamily,
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
          gap: 36,
        }}
      >
        {/* Quote card */}
        <div
          style={{
            opacity: cardOpacity,
            transform: `scale(${cardScale})`,
            backgroundColor: "#ffffff",
            borderRadius: 24,
            padding: "50px 60px",
            maxWidth: 1000,
            position: "relative",
            boxShadow:
              "0 4px 40px rgba(26,32,55,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid rgba(26,32,55,0.06)",
          }}
        >
          {/* Large quote mark */}
          <span
            style={{
              position: "absolute",
              top: 20,
              left: 30,
              fontSize: 160,
              fontFamily: "'Georgia', serif",
              color: "#e2711d",
              opacity: quoteOpacity,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 30,
              color: "#1a2037",
              lineHeight: 1.7,
              margin: 0,
              position: "relative",
              zIndex: 1,
              minHeight: 160,
            }}
          >
            {visibleQuote}
            {wordsToShow < words.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 30,
                  backgroundColor: "#e2711d",
                  marginLeft: 4,
                  verticalAlign: "text-bottom",
                  opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                }}
              />
            )}
          </p>

          {/* Attribution */}
          <div
            style={{
              opacity: attrOpacity,
              transform: `translateY(${attrY}px)`,
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a2037, #2a3050)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e2711d",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1a2037",
                }}
              >
                Sarah Chen
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#64748b",
                }}
              >
                Head of School, International Academy Bangkok
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <Sequence from={120} layout="none">
          <div
            style={{
              display: "flex",
              gap: 40,
              opacity: statsOpacity,
            }}
          >
            {STATS.map((stat, i) => {
              const statScale = spring({
                frame: Math.max(0, frame - 120 - i * 8),
                fps: 30,
                from: 0.7,
                to: 1,
                config: { damping: 12, stiffness: 120 },
              });

              return (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    transform: `scale(${statScale})`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: "#e2711d",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#64748b",
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Sequence>

        {/* Brand outro */}
        <Sequence from={220} layout="none">
          <div
            style={{
              opacity: outroOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              marginTop: 10,
            }}
          >
            <Img
              src={staticFile("kaiak-logo-png.png")}
              style={{ width: 160, objectFit: "contain" }}
            />
            <div
              style={{
                backgroundColor: "#e2711d",
                color: "#ffffff",
                padding: "10px 28px",
                borderRadius: 30,
                fontSize: 15,
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(226,113,29,0.2)",
              }}
            >
              See More Success Stories
            </div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
