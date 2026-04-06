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
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCog6Tooth,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const { fontFamily } = loadFont();

const WEEKS: {
  week: string;
  title: string;
  desc: string;
  icon: IconType;
  color: string;
}[] = [
  {
    week: "Week 1-2",
    title: "Discover",
    desc: "Audit your workflows & identify automation opportunities",
    icon: HiOutlineMagnifyingGlass,
    color: "#8b5cf6",
  },
  {
    week: "Week 3-4",
    title: "Design",
    desc: "Build your AI systems, second brain & email automation",
    icon: HiOutlineCog6Tooth,
    color: "#e2711d",
  },
  {
    week: "Week 5-6",
    title: "Deliver",
    desc: "Launch, train your team & optimize for autopilot",
    icon: HiOutlineRocketLaunch,
    color: "#22c55e",
  },
];

const WeekCard = ({
  week,
  index,
}: {
  week: (typeof WEEKS)[number];
  index: number;
}) => {
  const frame = useCurrentFrame();
  const delay = index * 25;

  const cardScale = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 14, stiffness: 90 },
  });
  const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineProgress =
    index < WEEKS.length - 1
      ? interpolate(frame, [delay + 18, delay + 35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const numberScale = spring({
    frame: Math.max(0, frame - delay - 5),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150 },
  });

  const Icon = week.icon;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          backgroundColor: "#ffffff",
          borderRadius: 20,
          padding: "32px 36px",
          width: 340,
          boxShadow: "0 4px 30px rgba(26,32,55,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid rgba(26,32,55,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -16,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: week.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 800,
            fontFamily,
            transform: `scale(${numberScale})`,
            boxShadow: `0 4px 12px ${week.color}40`,
          }}
        >
          {index + 1}
        </div>
        <Icon size={36} color={week.color} />
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: week.color,
            textTransform: "uppercase",
            letterSpacing: 2,
            fontFamily,
          }}
        >
          {week.week}
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#1a2037",
            lineHeight: 1.2,
          }}
        >
          {week.title}
        </div>
        <div style={{ fontSize: 15, color: "#64748b", lineHeight: 1.5, fontFamily }}>
          {week.desc}
        </div>
      </div>
      {index < WEEKS.length - 1 && (
        <div style={{ width: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: `${lineProgress * 100}%`,
              height: 3,
              backgroundColor: "#e2711d",
              borderRadius: 2,
              position: "relative",
            }}
          >
            {lineProgress > 0.9 && (
              <div
                style={{
                  position: "absolute",
                  right: -6,
                  top: -5,
                  width: 0,
                  height: 0,
                  borderTop: "7px solid transparent",
                  borderBottom: "7px solid transparent",
                  borderLeft: "10px solid #e2711d",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const CourseOverviewHeroicons = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [0, 18], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const resultOpacity = interpolate(frame, [110, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const resultY = interpolate(frame, [110, 128], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outroOpacity = interpolate(frame, [190, 208], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)", fontFamily }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
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
        Heroicons (react-icons)
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
        }}
      >
        <div style={{ opacity: headOpacity, transform: `translateY(${headY}px)`, textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 48, fontWeight: 700, color: "#1a2037", margin: 0 }}>
            6 Weeks to <span style={{ color: "#e2711d" }}>Automated Leadership</span>
          </h1>
          <p style={{ fontSize: 20, color: "#64748b", margin: "10px 0 0", fontFamily }}>
            Your done-with-you AI systems implementation
          </p>
        </div>
        <Sequence from={10} layout="none">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {WEEKS.map((week, i) => (
              <WeekCard key={i} week={week} index={i} />
            ))}
          </div>
        </Sequence>
        <div
          style={{
            opacity: resultOpacity,
            transform: `translateY(${resultY}px)`,
            backgroundColor: "#1a2037",
            borderRadius: 16,
            padding: "20px 48px",
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <span style={{ color: "#e2711d", fontSize: 18, fontWeight: 700, fontFamily }}>Result:</span>
          <span style={{ color: "#e2e8f0", fontSize: 18, fontFamily }}>
            10+ hours saved every week • Systems running on autopilot • 30 days post-support
          </span>
        </div>
        <Sequence from={190} layout="none">
          <div style={{ opacity: outroOpacity, display: "flex", alignItems: "center", gap: 24 }}>
            <Img src={staticFile("kaiak-logo-png.png")} style={{ width: 140, objectFit: "contain" }} />
            <div
              style={{
                backgroundColor: "#e2711d",
                color: "#ffffff",
                padding: "12px 28px",
                borderRadius: 30,
                fontSize: 16,
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(226,113,29,0.2)",
              }}
            >
              View Program Details
            </div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
