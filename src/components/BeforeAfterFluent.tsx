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

type ItemType = { icon: string; text: string; delay: number };

const BEFORE_ITEMS: ItemType[] = [
  { icon: "fluent-emoji/e-mail.svg", text: "127 unread emails", delay: 0 },
  { icon: "fluent-emoji/memo.svg", text: "Board report overdue", delay: 8 },
  { icon: "fluent-emoji/telephone-receiver.svg", text: "5 missed parent calls", delay: 16 },
  { icon: "fluent-emoji/page-facing-up.svg", text: "Policy review pending", delay: 24 },
  { icon: "fluent-emoji/alarm-clock.svg", text: "60+ hour weeks", delay: 32 },
];

const AFTER_ITEMS: ItemType[] = [
  { icon: "fluent-emoji/check-mark-button.svg", text: "Inbox auto-triaged", delay: 0 },
  { icon: "fluent-emoji/bar-chart.svg", text: "Reports auto-generated", delay: 8 },
  { icon: "fluent-emoji/speech-balloon.svg", text: "Parent updates sent", delay: 16 },
  { icon: "fluent-emoji/magnifying-glass-tilted-left.svg", text: "Policies instantly searchable", delay: 24 },
  { icon: "fluent-emoji/bullseye.svg", text: "Focus on what matters", delay: 32 },
];

const ListItem = ({
  icon,
  text,
  delay,
  side,
}: {
  icon: string;
  text: string;
  delay: number;
  side: "before" | "after";
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(
    frame,
    [delay, delay + 10],
    [side === "before" ? -20 : 20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        backgroundColor:
          side === "before"
            ? "rgba(239,68,68,0.06)"
            : "rgba(34,197,94,0.06)",
        borderRadius: 12,
        border: `1px solid ${
          side === "before"
            ? "rgba(239,68,68,0.12)"
            : "rgba(34,197,94,0.12)"
        }`,
      }}
    >
      <Img
        src={staticFile(icon)}
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily,
          fontSize: 17,
          fontWeight: 500,
          color: "#1a2037",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const SidePanel = ({
  title,
  subtitle,
  items,
  side,
  accentColor,
}: {
  title: string;
  subtitle: string;
  items: ItemType[];
  side: "before" | "after";
  accentColor: string;
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "40px 50px",
      }}
    >
      <div style={{ opacity: headerOpacity, marginBottom: 8 }}>
        <div
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: 700,
            color: accentColor,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#1a2037",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 50,
            height: 3,
            backgroundColor: accentColor,
            borderRadius: 2,
            marginTop: 12,
          }}
        />
      </div>

      {items.map((item, i) => (
        <Sequence key={i} from={15} layout="none">
          <ListItem
            icon={item.icon}
            text={item.text}
            delay={item.delay}
            side={side}
          />
        </Sequence>
      ))}
    </div>
  );
};

export const BeforeAfterFluent = () => {
  const frame = useCurrentFrame();

  const dividerHeight = interpolate(frame, [5, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelScale = spring({
    frame: Math.max(0, frame - 25),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const outroOpacity = interpolate(frame, [200, 218], [0, 1], {
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
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 30,
          backgroundColor: "rgba(26,32,55,0.06)",
          padding: "6px 14px",
          borderRadius: 8,
          fontSize: 13,
          color: "#64748b",
          fontFamily,
        }}
      >
        Microsoft Fluent Emoji
      </div>

      <Sequence from={0} durationInFrames={220}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SidePanel
            title="Drowning in Admin"
            subtitle="Before"
            items={BEFORE_ITEMS}
            side="before"
            accentColor="#ef4444"
          />
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
                opacity: labelOpacity,
                transform: `scale(${labelScale})`,
                backgroundColor: "#e2711d",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 15px rgba(226,113,29,0.3)",
              }}
            >
              KAIAK
            </div>
          </div>
          <Sequence from={20} layout="none">
            <SidePanel
              title="Leading with Clarity"
              subtitle="After"
              items={AFTER_ITEMS}
              side="after"
              accentColor="#22c55e"
            />
          </Sequence>
        </div>
      </Sequence>

      <Sequence from={200} durationInFrames={70}>
        <AbsoluteFill
          style={{
            background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            opacity: outroOpacity,
          }}
        >
          <Img src={staticFile("kaiak-logo-png.png")} style={{ width: 300, objectFit: "contain" }} />
          <span style={{ fontFamily: "'Georgia', serif", fontSize: 26, color: "#4a5568", letterSpacing: 2 }}>
            From overwhelmed to in control
          </span>
          <div
            style={{
              backgroundColor: "#e2711d",
              color: "#ffffff",
              padding: "12px 32px",
              borderRadius: 30,
              fontSize: 17,
              fontWeight: 700,
              marginTop: 12,
              boxShadow: "0 0 25px rgba(226,113,29,0.2)",
            }}
          >
            Book Your Free Strategy Call
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
