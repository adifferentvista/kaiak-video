import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/PlayfairDisplay";
const { fontFamily: display } = loadDisplay();

const safeStaticFile = (path: string): string => {
  try {
    return staticFile(path);
  } catch {
    return "";
  }
};

export type FeaturedImageProps = {
  hookText: string;
  hookHighlight?: string;
  pillar?: string;
  imagePath: string;
  fontSize?: number;
  textColor?: string;
  highlightColor?: string;
};

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  hookText,
  hookHighlight,
  imagePath,
  fontSize = 52,
  textColor = "#0F172A",
  highlightColor = "#EA580C",
}) => {
  const imgSrc = imagePath ? safeStaticFile(imagePath) : "";
  const hasImage = imgSrc.length > 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5F0E8" }}>
      {/* Full-bleed background image */}
      {hasImage && (
        <Img
          src={imgSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}

      {/* Text overlay — positioned in the left empty space */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "48%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 24px 0 48px",
        }}
      >
        {/* Headline line 1 */}
        <div
          style={{
            fontFamily: display,
            fontSize,
            fontWeight: 900,
            color: textColor,
            lineHeight: 1.1,
          }}
        >
          {hookText}
        </div>

        {/* Headline line 2 — accent */}
        {hookHighlight && (
          <div
            style={{
              fontFamily: display,
              fontSize,
              fontWeight: 900,
              fontStyle: "italic",
              color: highlightColor,
              lineHeight: 1.1,
            }}
          >
            {hookHighlight}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
