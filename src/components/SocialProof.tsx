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

const STATS = [
  { value: 1000, suffix: "+", label: "Educators Trained", delay: 0 },
  { value: 50, suffix: "+", label: "Schools Served", delay: 12 },
  { value: 90, suffix: "%", label: "Time Savings", delay: 24 },
  { value: 10, suffix: "+", label: "Hours Saved / Week", delay: 36 },
];

const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) => {
  const frame = useCurrentFrame();

  const cardScale = spring({
    frame: Math.max(0, frame - stat.delay),
    fps: 30,
    from: 0.7,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const cardOpacity = interpolate(
    frame,
    [stat.delay, stat.delay + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Count up animation
  const countProgress = interpolate(
    frame,
    [stat.delay + 5, stat.delay + 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Ease out the counting for a more natural feel
  const easedProgress = 1 - Math.pow(1 - countProgress, 3);
  const currentValue = Math.round(stat.value * easedProgress);

  // Format number with commas
  const formatted = currentValue.toLocaleString();

  // Accent line grows in
  const lineWidth = interpolate(
    frame,
    [stat.delay + 8, stat.delay + 25],
    [0, 60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "40px 50px",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        boxShadow:
          "0 4px 30px rgba(26,32,55,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid rgba(26,32,55,0.06)",
        minWidth: 260,
      }}
    >
      {/* Number */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 64,
            fontWeight: 800,
            color: "#1a2037",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {formatted}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: "#e2711d",
            marginLeft: 2,
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: "#e2711d",
          borderRadius: 2,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily,
          fontSize: 18,
          fontWeight: 500,
          color: "#64748b",
          letterSpacing: 0.5,
        }}
      >
        {stat.label}
      </span>
    </div>
  );
};

export const SocialProof = () => {
  const frame = useCurrentFrame();

  // Headline animation
  const headlineOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [0, 18], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtext
  const subOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand outro
  const outroOpacity = interpolate(frame, [140, 158], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outroY = interpolate(frame, [140, 158], [20, 0], {
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
      {/* Grid overlay */}
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
          gap: 50,
          padding: "0 80px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            textAlign: "center",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#1a2037",
              margin: 0,
              letterSpacing: -1,
            }}
          >
            Trusted by{" "}
            <span style={{ color: "#e2711d" }}>School Leaders</span>{" "}
            Worldwide
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "#64748b",
              margin: "12px 0 0",
              fontWeight: 400,
              opacity: subOpacity,
            }}
          >
            Real results from real schools
          </p>
        </div>

        {/* Stats grid */}
        <Sequence from={15}>
          <div
            style={{
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </Sequence>

        {/* Brand footer */}
        <div
          style={{
            opacity: outroOpacity,
            transform: `translateY(${outroY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Img
            src={staticFile("kaiak-logo-png.png")}
            style={{ width: 180, objectFit: "contain" }}
          />
          <div
            style={{
              backgroundColor: "#e2711d",
              color: "#ffffff",
              padding: "12px 32px",
              borderRadius: 30,
              fontSize: 17,
              fontWeight: 700,
              boxShadow: "0 0 25px rgba(226,113,29,0.2)",
            }}
          >
            Book Your Free Strategy Call
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
