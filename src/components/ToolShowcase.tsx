import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
} from "remotion";

const TOOLS = [
  { name: "Gmail", color: "#EA4335", logo: "logos/gmail.svg", angle: 270 },
  { name: "Google Docs", color: "#4285F4", logo: "logos/google-docs.svg", angle: 321.4 },
  { name: "Google Sheets", color: "#34A853", logo: "logos/google-sheets.svg", angle: 12.9 },
  { name: "Google Drive", color: "#FBBC05", logo: "logos/google-drive.svg", angle: 64.3 },
  { name: "NotebookLM", color: "#8B5CF6", logo: "logos/notebooklm.svg", angle: 115.7 },
  { name: "ChatGPT", color: "#10A37F", logo: "logos/openai.svg", angle: 167.1 },
  { name: "Claude", color: "#D97706", logo: "logos/claude.svg", angle: 218.6 },
];

const ToolIcon = ({
  tool,
  index,
  frame,
}: {
  tool: (typeof TOOLS)[number];
  index: number;
  frame: number;
}) => {
  const delay = index * 8;
  const radius = 300;
  const hubRadius = 65;
  const angleRad = (tool.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;
  const lineStartX = Math.cos(angleRad) * hubRadius;
  const lineStartY = Math.sin(angleRad) * hubRadius;
  const lineLength = radius - hubRadius;

  const iconScale = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  const iconOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connection line grows from center to icon
  const lineProgress = interpolate(
    frame,
    [delay + 12, delay + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {/* Connection line */}
      <div
        style={{
          position: "absolute",
          left: `calc(50% + ${lineStartX}px)`,
          top: `calc(50% + ${lineStartY}px)`,
          width: lineLength,
          height: 2,
          transformOrigin: "0 50%",
          transform: `rotate(${tool.angle}deg)`,
        }}
      >
        <div
          style={{
            width: `${lineProgress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, rgba(226,113,29,0.4), ${tool.color}40)`,
            borderRadius: 1,
          }}
        />
      </div>

      {/* Tool card */}
      <div
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: `translate(-50%, -50%) scale(${iconScale})`,
          opacity: iconOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#ffffff",
            border: `2px solid ${tool.color}30`,
            boxShadow: `0 4px 20px ${tool.color}15, 0 2px 8px rgba(0,0,0,0.06)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <Img
            src={staticFile(tool.logo)}
            style={{ width: 44, height: 44, objectFit: "contain" }}
          />
        </div>
        <span
          style={{
            color: "#1a2037",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {tool.name}
        </span>
      </div>
    </>
  );
};

const CenterHub = ({ frame }: { frame: number }) => {
  const hubScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  const hubOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse ring
  const pulseScale = interpolate(
    frame % 60,
    [0, 60],
    [1, 1.4],
    { extrapolateRight: "clamp" }
  );
  const pulseOpacity = interpolate(
    frame % 60,
    [0, 60],
    [0.3, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Pulse ring */}
      {frame > 15 && (
        <div
          style={{
            position: "absolute",
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "2px solid #e2711d",
            opacity: pulseOpacity,
            transform: `scale(${pulseScale})`,
          }}
        />
      )}

      {/* Main hub */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a2037, #2a3050)",
          opacity: hubOpacity,
          transform: `scale(${hubScale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(26,32,55,0.3)",
          border: "3px solid #e2711d",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <span
          style={{
            color: "#e2711d",
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 2,
          }}
        >
          KAIAK
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 9,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 1,
          }}
        >
          AI SYSTEMS
        </span>
      </div>
    </div>
  );
};

const StatusText = ({ frame }: { frame: number }) => {
  const lines = [
    { text: "Connected", delay: 0 },
    { text: "Automated", delay: 12 },
    { text: "Effortless", delay: 24 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 40,
        alignItems: "center",
      }}
    >
      {lines.map((line, i) => {
        const opacity = interpolate(
          frame,
          [line.delay, line.delay + 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const y = interpolate(
          frame,
          [line.delay, line.delay + 15],
          [15, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span
              style={{
                color: "#1a2037",
                fontSize: 22,
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: 1,
              }}
            >
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Headline = ({ frame }: { frame: number }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 48,
          color: "#1a2037",
          fontWeight: 400,
          margin: 0,
        }}
      >
        Your tools.{" "}
        <span style={{ color: "#e2711d", fontWeight: 700 }}>
          One system.
        </span>
      </h1>
    </div>
  );
};

const BrandEnd = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("kaiak-logo-png.png")}
        style={{ width: 350, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 28,
          color: "#4a5568",
          letterSpacing: 2,
        }}
      >
        All your tools. One intelligent system.
      </span>
      <div
        style={{
          backgroundColor: "#e2711d",
          color: "#ffffff",
          padding: "14px 36px",
          borderRadius: 30,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          marginTop: 16,
          boxShadow: "0 0 25px rgba(226,113,29,0.25)",
        }}
      >
        See How It Works
      </div>
    </AbsoluteFill>
  );
};


export const ToolShowcase = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Sequence from={0} durationInFrames={210}>
        <Headline frame={frame} />
        <CenterHub frame={frame} />
        {TOOLS.map((tool, i) => (
          <ToolIcon
            key={tool.name}
            tool={tool}
            index={i}
            frame={Math.max(0, frame - 20)}
          />
        ))}
      </Sequence>

      <Sequence from={110} durationInFrames={95}>
        <StatusText frame={useCurrentFrame()} />
      </Sequence>

      <Sequence from={190} durationInFrames={90}>
        <BrandEnd />
      </Sequence>
    </AbsoluteFill>
  );
};
