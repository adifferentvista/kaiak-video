import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";

const { fontFamily: serif } = loadSerif();
const { fontFamily: sans } = loadSans();

const PILLAR_STYLES: Record<string, { bg: string; text: string }> = {
  leadership: { bg: "#FEE2E2", text: "#991B1B" },
  "systems-thinking": { bg: "#D1FAE5", text: "#065F46" },
  "practical-ai": { bg: "#DBEAFE", text: "#1E40AF" },
  "no-admin-life": { bg: "#FEF3C7", text: "#92400E" },
  education: { bg: "#EDE9FE", text: "#7C3AED" },
};

const PILLAR_LABELS: Record<string, string> = {
  leadership: "Leadership",
  "systems-thinking": "Systems Thinking",
  "practical-ai": "Practical AI",
  "no-admin-life": "No-Admin Life",
  education: "AI in Education",
};

export type FeaturedImageProps = {
  hookText: string;
  hookHighlight?: string;
  pillar: string;
  imagePath: string;
};

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  hookText,
  hookHighlight,
  pillar,
  imagePath,
}) => {
  const style = PILLAR_STYLES[pillar] || PILLAR_STYLES["practical-ai"];
  const label = PILLAR_LABELS[pillar] || pillar;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDFBF7",
        fontFamily: sans,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left pillar accent bar */}
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

      {/* Left side: text content (55%) */}
      <div
        style={{
          width: "55%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px 0 70px",
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
            fontSize: 64,
            fontWeight: 400,
            color: "#0F172A",
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {hookText}
        </div>

        {/* Highlight */}
        {hookHighlight && (
          <div
            style={{
              fontFamily: serif,
              fontSize: 64,
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

      {/* Right side: generated image (45%) */}
      <div
        style={{
          width: "45%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 50px 40px 0",
        }}
      >
        <Img
          src={staticFile(imagePath)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: 16,
          }}
        />
      </div>

      {/* KAIAK logo — subtle, bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 36,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{
            width: 80,
            objectFit: "contain",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Bottom border */}
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
