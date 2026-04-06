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

export type FrameworkLayer = {
  label: string;
  description: string;
  color: string;
};

export type FrameworkDiagramProps = {
  title: string;
  subtitle?: string;
  layers: FrameworkLayer[];
  direction?: "top-down" | "bottom-up";
};

export const FrameworkDiagram: React.FC<FrameworkDiagramProps> = ({
  title,
  subtitle,
  layers,
  direction = "top-down",
}) => {
  const frame = useCurrentFrame();

  const orderedLayers =
    direction === "bottom-up" ? [...layers].reverse() : layers;

  // Title
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 18], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoOpacity = interpolate(frame, [0, 15], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connector line
  const connectorHeight = interpolate(
    frame,
    [20, 20 + layers.length * 18],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #faf7f2 0%, #f0ebe3 60%, #faf7f2 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 80px",
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

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{ width: 100, objectFit: "contain" }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 42,
            fontWeight: 700,
            color: "#1a2037",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 20,
              color: "#64748b",
              margin: "10px 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Framework layers */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "relative",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* Vertical connector line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 3,
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${connectorHeight}%`,
              background:
                "linear-gradient(180deg, #e2711d40, #e2711d20)",
              borderRadius: 2,
            }}
          />
        </div>

        {orderedLayers.map((layer, i) => {
          const delay = 20 + i * 18;

          const layerScale = spring({
            frame: Math.max(0, frame - delay),
            fps: 30,
            from: 0.85,
            to: 1,
            config: { damping: 14, stiffness: 100 },
          });
          const layerOpacity = interpolate(
            frame,
            [delay, delay + 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Alternate left/right alignment
          const isLeft = i % 2 === 0;
          const slideX = interpolate(
            frame,
            [delay, delay + 12],
            [isLeft ? -30 : 30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                padding: "8px 0",
                opacity: layerOpacity,
                transform: `scale(${layerScale}) translateX(${slideX}px)`,
                zIndex: 1,
              }}
            >
              {/* Connector dot */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: layer.color,
                  border: "3px solid #faf7f2",
                  boxShadow: `0 0 0 2px ${layer.color}30`,
                  zIndex: 2,
                }}
              />

              {/* Layer card */}
              <div
                style={{
                  width: "42%",
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: "20px 24px",
                  boxShadow:
                    "0 2px 20px rgba(26,32,55,0.05), 0 1px 3px rgba(0,0,0,0.03)",
                  border: "1px solid rgba(26,32,55,0.06)",
                  borderLeft: `4px solid ${layer.color}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: `${layer.color}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: layer.color,
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1a2037",
                      marginBottom: 4,
                    }}
                  >
                    {layer.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#64748b",
                      lineHeight: 1.4,
                    }}
                  >
                    {layer.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
