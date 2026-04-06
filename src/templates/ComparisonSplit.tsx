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

export type ComparisonItem = {
  text: string;
};

export type ComparisonSplitProps = {
  leftTitle: string;
  rightTitle: string;
  leftItems: ComparisonItem[];
  rightItems: ComparisonItem[];
  leftLabel?: string;
  rightLabel?: string;
};

const SideItem = ({
  text,
  delay,
  side,
}: {
  text: string;
  delay: number;
  side: "left" | "right";
}) => {
  const frame = useCurrentFrame();
  const accentColor = side === "left" ? "#ef4444" : "#22c55e";

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(
    frame,
    [delay, delay + 10],
    [side === "left" ? -15 : 15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        backgroundColor: `${accentColor}08`,
        borderRadius: 10,
        border: `1px solid ${accentColor}15`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: accentColor,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily,
          fontSize: 16,
          fontWeight: 500,
          color: "#1a2037",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const ComparisonSplit: React.FC<ComparisonSplitProps> = ({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftLabel = "Before",
  rightLabel = "After",
}) => {
  const frame = useCurrentFrame();

  const dividerHeight = interpolate(frame, [5, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeScale = spring({
    frame: Math.max(0, frame - 25),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #faf7f2 0%, #f0ebe3 60%, #faf7f2 100%)",
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div style={{ position: "absolute", top: 30, right: 40, opacity: logoOpacity }}>
        <Img src={staticFile("kaiak-logo-png.png")} style={{ width: 100, objectFit: "contain" }} />
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left side */}
        <div style={{ flex: 1, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ opacity: headerOpacity, marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>
              {leftLabel}
            </div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 32, fontWeight: 700, color: "#1a2037", lineHeight: 1.2 }}>
              {leftTitle}
            </div>
            <div style={{ width: 40, height: 3, backgroundColor: "#ef4444", borderRadius: 2, marginTop: 10 }} />
          </div>
          <Sequence from={15} layout="none">
            {leftItems.map((item, i) => (
              <SideItem key={i} text={item.text} delay={i * 8} side="left" />
            ))}
          </Sequence>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 4,
            height: `${dividerHeight}%`,
            background: "linear-gradient(180deg, transparent, #e2711d, transparent)",
            borderRadius: 2,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
              backgroundColor: "#e2711d",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(226,113,29,0.3)",
            }}
          >
            KAIAK
          </div>
        </div>

        {/* Right side */}
        <Sequence from={15} layout="none">
          <div style={{ flex: 1, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ opacity: headerOpacity, marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>
                {rightLabel}
              </div>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 32, fontWeight: 700, color: "#1a2037", lineHeight: 1.2 }}>
                {rightTitle}
              </div>
              <div style={{ width: 40, height: 3, backgroundColor: "#22c55e", borderRadius: 2, marginTop: 10 }} />
            </div>
            {rightItems.map((item, i) => (
              <SideItem key={i} text={item.text} delay={i * 8 + 10} side="right" />
            ))}
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
