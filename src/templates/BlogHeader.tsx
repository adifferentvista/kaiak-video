import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";

const { fontFamily: serif } = loadSerif();
const { fontFamily: sans } = loadSans();

// Exact KAIAK site pillar colors
const PILLAR_STYLES: Record<
  string,
  { bg: string; text: string; dotColor: string }
> = {
  leadership: { bg: "#FEE2E2", text: "#991B1B", dotColor: "#991B1B" },
  "systems-thinking": { bg: "#D1FAE5", text: "#065F46", dotColor: "#065F46" },
  "practical-ai": { bg: "#DBEAFE", text: "#1E40AF", dotColor: "#1E40AF" },
  "no-admin-life": { bg: "#FEF3C7", text: "#92400E", dotColor: "#92400E" },
  education: { bg: "#EDE9FE", text: "#7C3AED", dotColor: "#7C3AED" },
};

const PILLAR_LABELS: Record<string, string> = {
  leadership: "Leadership",
  "systems-thinking": "Systems Thinking",
  "practical-ai": "Practical AI",
  "no-admin-life": "No-Admin Life",
  education: "AI in Education",
};

export type BlogHeaderProps = {
  hookText: string;
  hookHighlight?: string;
  pillar: string;
};

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  hookText,
  hookHighlight,
  pillar,
}) => {
  const style = PILLAR_STYLES[pillar] || PILLAR_STYLES["practical-ai"];
  const label = PILLAR_LABELS[pillar] || pillar;

  // Dot grid configuration
  const dotRows = 8;
  const dotCols = 6;
  const dotSpacing = 24;
  const dotSize = 5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDFBF7",
        fontFamily: sans,
      }}
    >
      {/* Left edge pillar color bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          backgroundColor: style.text,
        }}
      />

      {/* Main content area */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 100px 0 80px",
        }}
      >
        {/* Left: Text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            paddingRight: 60,
          }}
        >
          {/* Pillar badge */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 8,
              backgroundColor: style.bg,
              padding: "6px 16px",
              borderRadius: 20,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: style.text,
              }}
            />
            <span
              style={{
                color: style.text,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              {label}
            </span>
          </div>

          {/* Hook text */}
          <div
            style={{
              fontFamily: serif,
              fontSize: 72,
              fontWeight: 400,
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {hookText}
          </div>

          {/* Highlight text */}
          {hookHighlight && (
            <div
              style={{
                fontFamily: serif,
                fontSize: 72,
                fontWeight: 400,
                fontStyle: "italic",
                color: style.text,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                marginTop: 4,
              }}
            >
              {hookHighlight}
            </div>
          )}
        </div>

        {/* Right: Dot grid accent */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${dotCols}, ${dotSpacing}px)`,
              gridTemplateRows: `repeat(${dotRows}, ${dotSpacing}px)`,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {Array.from({ length: dotRows * dotCols }).map((_, i) => {
              const row = Math.floor(i / dotCols);
              const col = i % dotCols;
              // Slight opacity variation for visual interest
              const distFromCenter = Math.sqrt(
                Math.pow(row - dotRows / 2, 2) +
                  Math.pow(col - dotCols / 2, 2)
              );
              const maxDist = Math.sqrt(
                Math.pow(dotRows / 2, 2) + Math.pow(dotCols / 2, 2)
              );
              const opacity = 0.15 + (1 - distFromCenter / maxDist) * 0.35;

              return (
                <div
                  key={i}
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: "50%",
                    backgroundColor: style.dotColor,
                    opacity,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* KAIAK logo — subtle, bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 40,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{
            width: 90,
            objectFit: "contain",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Thin bottom border line for polish */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 6,
          right: 0,
          height: 1,
          backgroundColor: "#E2E8F0",
        }}
      />
    </AbsoluteFill>
  );
};
