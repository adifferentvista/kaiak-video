import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// Simplified world map dots (key cities/regions)
const MAP_DOTS = [
  // Europe
  { x: 520, y: 180, label: "" },
  { x: 540, y: 200, label: "" },
  { x: 500, y: 210, label: "" },
  // Middle East
  { x: 600, y: 230, label: "" },
  { x: 620, y: 250, label: "" },
  // South Asia
  { x: 680, y: 250, label: "" },
  { x: 700, y: 270, label: "" },
  // Southeast Asia
  { x: 760, y: 290, label: "" },
  { x: 780, y: 310, label: "" },
  { x: 740, y: 280, label: "" },
];

// Journey path points
const JOURNEY_POINTS = [
  { x: 540, y: 200, label: "London", delay: 20 },
  { x: 610, y: 240, label: "Dubai", delay: 50 },
  { x: 700, y: 260, label: "Mumbai", delay: 80 },
  { x: 760, y: 290, label: "Bangkok", delay: 110 },
  { x: 800, y: 310, label: "Singapore", delay: 140 },
];

const SCHOOL_COUNT = [
  { city: "London", count: "8 Schools" },
  { city: "Dubai", count: "12 Schools" },
  { city: "Mumbai", count: "6 Schools" },
  { city: "Bangkok", count: "15 Schools" },
  { city: "Singapore", count: "9 Schools" },
];

export const MapJourney = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Map fade in
  const mapOpacity = interpolate(frame, [5, 20], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Generate SVG path from journey points
  const pathD = JOURNEY_POINTS.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
  ).join(" ");

  // Path draw animation
  const pathProgress = interpolate(frame, [20, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Total counter
  const totalOpacity = interpolate(frame, [170, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const totalScale = spring({
    frame: Math.max(0, frame - 170),
    fps: 30,
    from: 0.7,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid background */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#e2e8f0",
            fontSize: 42,
            fontWeight: 700,
            margin: 0,
          }}
        >
          Trusted by Schools{" "}
          <span style={{ color: "#fbbf24" }}>Worldwide</span>
        </h1>
      </div>

      {/* Map SVG */}
      <svg
        width="1200"
        height="500"
        viewBox="300 100 600 350"
        style={{ overflow: "visible" }}
      >
        {/* Background dots */}
        {MAP_DOTS.map((dot, i) => (
          <circle
            key={`bg-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3}
            fill="#334155"
            opacity={mapOpacity}
          />
        ))}

        {/* Connecting path */}
        <path
          d={pathD}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2.5}
          strokeDasharray={1000}
          strokeDashoffset={1000 - 1000 * pathProgress}
          strokeLinecap="round"
          opacity={0.6}
        />

        {/* Glow path */}
        <path
          d={pathD}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={6}
          strokeDasharray={1000}
          strokeDashoffset={1000 - 1000 * pathProgress}
          strokeLinecap="round"
          opacity={0.15}
        />

        {/* City markers */}
        {JOURNEY_POINTS.map((point, i) => {
          const pointOpacity = interpolate(
            frame,
            [point.delay, point.delay + 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const pointScale = spring({
            frame: Math.max(0, frame - point.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 8, stiffness: 150 },
          });

          // Pulse ring
          const pulseScale = interpolate(
            (frame - point.delay) % 40,
            [0, 40],
            [1, 2.5],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const pulseOpacity = interpolate(
            (frame - point.delay) % 40,
            [0, 40],
            [0.4, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={i} opacity={pointOpacity}>
              {/* Pulse */}
              {frame > point.delay + 10 && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={8}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={1.5}
                  opacity={pulseOpacity}
                  transform={`scale(${pulseScale})`}
                  style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                />
              )}

              {/* Dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={7}
                fill="#fbbf24"
                transform={`scale(${pointScale})`}
                style={{ transformOrigin: `${point.x}px ${point.y}px` }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={3}
                fill="#0f172a"
                transform={`scale(${pointScale})`}
                style={{ transformOrigin: `${point.x}px ${point.y}px` }}
              />

              {/* Label */}
              <text
                x={point.x}
                y={point.y - 16}
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize={14}
                fontWeight={600}
                fontFamily={fontFamily}
              >
                {point.label}
              </text>
              <text
                x={point.x}
                y={point.y + 26}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={11}
                fontFamily={fontFamily}
              >
                {SCHOOL_COUNT[i].count}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Total banner */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: totalOpacity,
          transform: `scale(${totalScale})`,
          backgroundColor: "rgba(251,191,36,0.1)",
          border: "1px solid rgba(251,191,36,0.2)",
          borderRadius: 16,
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ color: "#fbbf24", fontSize: 40, fontWeight: 800 }}>
          50+
        </span>
        <span style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 500 }}>
          International Schools Across 5 Regions
        </span>
      </div>
    </AbsoluteFill>
  );
};
