import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
  random,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: "#8b5cf6",
  "AI in Education": "#3b82f6",
  "Systems Thinking": "#e2711d",
  "Practical AI": "#22c55e",
  "No-Admin Life": "#ec4899",
};

export type BlogHeroVisualProps = {
  hookText: string;
  hookHighlight?: string;
  category: string;
  visualType:
    | "calendar"
    | "inbox"
    | "dashboard"
    | "documents"
    | "terminal"
    | "workflow"
    | "chat"
    | "metrics";
};

// Grain overlay
const GrainOverlay = () => {
  const dots = Array.from({ length: 250 }).map((_, i) => ({
    x: random(`g-x-${i}`) * 100,
    y: random(`g-y-${i}`) * 100,
    o: random(`g-o-${i}`) * 0.07,
    s: random(`g-s-${i}`) * 2 + 0.5,
  }));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        {dots.map((d, i) => (
          <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.s} fill="#fff" opacity={d.o} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Glass panel
const Glass = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      backgroundColor: "rgba(15, 23, 42, 0.72)",
      backdropFilter: "blur(12px)",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ====== VISUAL TYPES ======

const CalendarVisual = ({ frame }: { frame: number }) => {
  const items = [
    { t: "8:00", l: "Staff Standup", s: "cut" },
    { t: "9:00", l: "Budget Review", s: "keep" },
    { t: "11:00", l: "Parent Check-in", s: "keep" },
    { t: "1:00", l: "Status Update", s: "cut" },
    { t: "2:00", l: "Board Prep", s: "cut" },
    { t: "4:00", l: "Strategy Session", s: "keep" },
  ];
  return (
    <Glass style={{ width: 480, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, fontFamily }}>Monday</span>
        <span style={{ color: "#64748b", fontSize: 11, fontFamily }}>6 meetings → 3</span>
      </div>
      {items.map((m, i) => {
        const d = 15 + i * 4;
        const op = interpolate(frame, [d, d + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const cut = m.s === "cut";
        const sw = cut ? interpolate(frame, [d + 16, d + 24], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
        const cf = cut ? interpolate(frame, [d + 16, d + 24], [1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
        return (
          <div key={i} style={{ display: "flex", padding: "5px 16px", opacity: op, gap: 10, alignItems: "center" }}>
            <span style={{ color: "#475569", fontSize: 10, fontFamily, width: 32 }}>{m.t}</span>
            <div style={{ flex: 1, padding: "4px 10px", borderRadius: 5, backgroundColor: cut ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.12)", borderLeft: `3px solid ${cut ? "#ef4444" : "#22c55e"}`, position: "relative", opacity: cf }}>
              <span style={{ color: "#cbd5e1", fontSize: 12, fontFamily }}>{m.l}</span>
              {cut && <div style={{ position: "absolute", top: "50%", left: 10, width: `${sw}%`, height: 2, backgroundColor: "#ef4444", borderRadius: 1 }} />}
            </div>
          </div>
        );
      })}
    </Glass>
  );
};

const InboxVisual = ({ frame }: { frame: number }) => {
  const emails = [
    { f: "Board Chair", s: "Q3 Report Review", tag: "auto-replied" },
    { f: "Parent (Gr 5)", s: "Field Trip Permission", tag: "sorted" },
    { f: "HR Director", s: "Staff Absence", tag: "flagged" },
    { f: "Teacher (Yr 8)", s: "Student concern", tag: "priority" },
  ];
  return (
    <Glass style={{ width: 480, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, fontFamily }}>AI Triaged Inbox</span>
        <span style={{ color: "#22c55e", fontSize: 11, fontFamily, fontWeight: 600 }}>47 sorted</span>
      </div>
      {emails.map((e, i) => {
        const d = 15 + i * 7;
        const op = interpolate(frame, [d, d + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const tc = e.tag === "priority" ? "#ef4444" : e.tag === "flagged" ? "#fbbf24" : "#22c55e";
        return (
          <div key={i} style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.03)", opacity: op }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600, fontFamily }}>{e.f}</span>
              <span style={{ color: tc, fontSize: 9, fontWeight: 700, backgroundColor: `${tc}18`, padding: "1px 7px", borderRadius: 8, textTransform: "uppercase", fontFamily }}>{e.tag}</span>
            </div>
            <span style={{ color: "#94a3b8", fontSize: 11, fontFamily }}>{e.s}</span>
          </div>
        );
      })}
    </Glass>
  );
};

const DashboardVisual = ({ frame }: { frame: number }) => {
  const bars = [65, 82, 45, 90, 72, 88, 55];
  return (
    <Glass style={{ width: 480, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[{ l: "Automated", v: "23", c: "#e2711d" }, { l: "Saved", v: "10.4h", c: "#22c55e" }].map((s, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.06)", opacity: interpolate(frame, [18 + i * 6, 26 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <div style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: 1, fontFamily }}>{s.l}</div>
            <div style={{ color: s.c, fontSize: 22, fontWeight: 800, fontFamily }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
        {bars.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${interpolate(frame, [25 + i * 3, 42 + i * 3], [0, v], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, backgroundColor: i === bars.length - 1 ? "#e2711d" : "#e2711d50", borderRadius: "3px 3px 0 0" }} />
        ))}
      </div>
    </Glass>
  );
};

const DocumentsVisual = ({ frame }: { frame: number }) => {
  const docs = [
    { n: "Board Report Q3.pdf", s: "✓ Generated", c: "#22c55e" },
    { n: "Parent Newsletter.docx", s: "✓ Drafted", c: "#22c55e" },
    { n: "Policy-Attendance.pdf", s: "✓ Indexed", c: "#3b82f6" },
    { n: "Budget-FY26.xlsx", s: "⏳ Pending", c: "#fbbf24" },
  ];
  return (
    <Glass style={{ width: 480, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, fontFamily }}>Document Pipeline</span>
      </div>
      {docs.map((d, i) => (
        <div key={i} style={{ padding: "9px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.03)", opacity: interpolate(frame, [20 + i * 8, 28 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ color: "#cbd5e1", fontSize: 12, fontFamily }}>{d.n}</span>
          <span style={{ color: d.c, fontSize: 10, fontWeight: 600, fontFamily }}>{d.s}</span>
        </div>
      ))}
    </Glass>
  );
};

const TerminalVisual = ({ frame }: { frame: number }) => {
  const CMD = "kaiak automate --inbox --reports";
  const chars = Math.min(Math.max(0, Math.floor((frame - 20) * 0.5)), CMD.length);
  const typed = CMD.slice(0, chars);
  const done = chars >= CMD.length;
  const successOp = done ? interpolate(frame, [20 + CMD.length * 2 + 5, 20 + CMD.length * 2 + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  return (
    <Glass style={{ width: 480, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", display: "flex", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c840" }} />
      </div>
      <div style={{ padding: "16px 16px 20px", fontFamily: "'Consolas', monospace", fontSize: 13, lineHeight: 1.8 }}>
        <div><span style={{ color: "#22c55e" }}>$</span> <span style={{ color: "#e2e8f0" }}>{typed}</span>{!done && <span style={{ backgroundColor: "#e2e8f0", width: 8, height: 16, display: "inline-block", marginLeft: 2 }} />}</div>
        {done && (
          <>
            <div style={{ color: "#94a3b8", opacity: successOp }}>⚡ Connecting to 6 systems...</div>
            <div style={{ color: "#22c55e", opacity: successOp, marginTop: 4 }}>✓ Inbox triaged (47 emails)</div>
            <div style={{ color: "#22c55e", opacity: successOp }}>✓ Board report generated</div>
            <div style={{ color: "#22c55e", opacity: successOp }}>✓ 10.4 hours saved this week</div>
          </>
        )}
      </div>
    </Glass>
  );
};

const WorkflowVisual = ({ frame }: { frame: number }) => {
  const steps = [
    { l: "Emails In", c: "#3b82f6" },
    { l: "AI Triage", c: "#e2711d" },
    { l: "Auto-Reply", c: "#22c55e" },
    { l: "Dashboard", c: "#8b5cf6" },
  ];
  return (
    <Glass style={{ width: 480, padding: 20, display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ color: "#94a3b8", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontFamily }}>Automated Workflow</div>
      {steps.map((s, i) => {
        const d = 15 + i * 12;
        const op = interpolate(frame, [d, d + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const sc = spring({ frame: Math.max(0, frame - d), fps: 30, from: 0.7, to: 1, config: { damping: 12, stiffness: 120 } });
        const lineH = i < steps.length - 1 ? interpolate(frame, [d + 6, d + 14], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
        return (
          <div key={i} style={{ display: "flex", gap: 14, opacity: op }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: `${s.c}20`, border: `2px solid ${s.c}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sc})`, flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: s.c }} />
              </div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 24, backgroundColor: `${s.c}30` }}><div style={{ width: "100%", height: `${lineH}%`, backgroundColor: s.c }} /></div>}
            </div>
            <div style={{ paddingTop: 4 }}>
              <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, fontFamily }}>{s.l}</span>
            </div>
          </div>
        );
      })}
    </Glass>
  );
};

const ChatVisual = ({ frame }: { frame: number }) => {
  const msgs = [
    { role: "user", text: "Draft a parent update about the new schedule" },
    { role: "ai", text: "Here's a draft covering the key changes, timings, and FAQ. Tone is warm but direct." },
    { role: "user", text: "Make it shorter and add a Bahasa version" },
    { role: "ai", text: "Done — both versions attached. Ready to send via your parent comm system." },
  ];
  return (
    <Glass style={{ width: 480, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, fontFamily }}>AI Assistant</span>
        <span style={{ color: "#22c55e", fontSize: 10, fontFamily }}>● Online</span>
      </div>
      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {msgs.map((m, i) => {
          const d = 15 + i * 12;
          const op = interpolate(frame, [d, d + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isUser = m.role === "user";
          return (
            <div key={i} style={{ opacity: op, display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "80%", padding: "7px 12px", borderRadius: isUser ? "10px 10px 2px 10px" : "10px 10px 10px 2px", backgroundColor: isUser ? "#e2711d20" : "rgba(255,255,255,0.05)", border: `1px solid ${isUser ? "#e2711d30" : "rgba(255,255,255,0.06)"}` }}>
                <span style={{ color: isUser ? "#e2e8f0" : "#94a3b8", fontSize: 11, fontFamily, lineHeight: 1.4 }}>{m.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Glass>
  );
};

const MetricsVisual = ({ frame }: { frame: number }) => {
  const metrics = [
    { l: "Response Time", v: "< 2min", prev: "45min", c: "#22c55e" },
    { l: "Reports/Week", v: "12", prev: "3", c: "#e2711d" },
    { l: "Manual Tasks", v: "4", prev: "27", c: "#3b82f6" },
    { l: "Team Satisfaction", v: "94%", prev: "61%", c: "#8b5cf6" },
  ];
  return (
    <Glass style={{ width: 480, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ color: "#94a3b8", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, fontFamily, marginBottom: 4 }}>Impact Metrics</div>
      {metrics.map((m, i) => {
        const d = 18 + i * 8;
        const op = interpolate(frame, [d, d + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", opacity: op }}>
            <span style={{ color: "#94a3b8", fontSize: 12, fontFamily }}>{m.l}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#475569", fontSize: 11, fontFamily, textDecoration: "line-through" }}>{m.prev}</span>
              <span style={{ color: "#475569", fontSize: 11 }}>→</span>
              <span style={{ color: m.c, fontSize: 14, fontWeight: 800, fontFamily }}>{m.v}</span>
            </div>
          </div>
        );
      })}
    </Glass>
  );
};

const VISUALS: Record<string, React.FC<{ frame: number }>> = {
  calendar: CalendarVisual,
  inbox: InboxVisual,
  dashboard: DashboardVisual,
  documents: DocumentsVisual,
  terminal: TerminalVisual,
  workflow: WorkflowVisual,
  chat: ChatVisual,
  metrics: MetricsVisual,
};

export const BlogHeroVisual: React.FC<BlogHeroVisualProps> = ({
  hookText,
  hookHighlight,
  category,
  visualType,
}) => {
  const frame = useCurrentFrame();
  const accentColor = CATEGORY_COLORS[category] || "#e2711d";
  const Visual = VISUALS[visualType];

  // 3D
  const rX = interpolate(frame, [0, 300], [8, 2], { extrapolateRight: "clamp" });
  const rY = interpolate(frame, [0, 300], [-6, 1], { extrapolateRight: "clamp" });
  const vScale = spring({ frame: Math.max(0, frame - 8), fps: 30, from: 0.88, to: 1, config: { damping: 18, stiffness: 60 } });
  const vOp = interpolate(frame, [8, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Blobs
  const b1X = interpolate(frame, [0, 300], [60, 55], { extrapolateRight: "clamp" });
  const b1Y = interpolate(frame, [0, 300], [30, 35], { extrapolateRight: "clamp" });

  // Text
  const hookOp = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hookY = interpolate(frame, [10, 26], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: Math.max(0, frame - 3), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 150 } });
  const logoOp = interpolate(frame, [0, 15], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Depth card
  const depthOp = interpolate(frame, [15, 30], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)", fontFamily }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(226,113,29,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(226,113,29,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      {/* Blobs */}
      <div style={{ position: "absolute", left: `${b1X}%`, top: `${b1Y}%`, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`, filter: "blur(60px)", transform: "translate(-50%, -50%)" }} />
      <div style={{ position: "absolute", left: "75%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(50px)", transform: "translate(-50%, -50%)" }} />

      <GrainOverlay />

      {/* Logo */}
      <div style={{ position: "absolute", top: 30, right: 40, opacity: logoOp }}>
        <Img src={staticFile("kaiak-logo-png.png")} style={{ width: 100, objectFit: "contain", filter: "brightness(2)" }} />
      </div>

      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
        {/* Top: Hook text — centered */}
        <div style={{ zIndex: 2, textAlign: "center", maxWidth: 900, padding: "0 60px" }}>
          {/* Category pill */}
          <div style={{ transform: `scale(${badgeScale})`, marginBottom: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: `${accentColor}18`, border: `1px solid ${accentColor}30`, padding: "5px 14px", borderRadius: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: accentColor }} />
              <span style={{ color: accentColor, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{category}</span>
            </div>
          </div>

          {/* Hook text — big, bold, centered */}
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 64,
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.1,
              margin: 0,
              opacity: hookOp,
              transform: `translateY(${hookY}px)`,
              letterSpacing: -2,
            }}
          >
            {hookText}
            {hookHighlight && (
              <>
                <br />
                <span style={{ color: accentColor }}>{hookHighlight}</span>
              </>
            )}
          </h1>
        </div>

        {/* Bottom: Visual — centered, prominent */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Depth shadow */}
          <div style={{ position: "absolute", top: 14, left: 18, opacity: depthOp, filter: "blur(4px)" }}>
            <Glass style={{ width: 480, height: 200, backgroundColor: "rgba(15, 23, 42, 0.35)" }}><div /></Glass>
          </div>

          <div style={{ opacity: vOp, transform: `scale(${vScale}) perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`, position: "relative", zIndex: 2 }}>
            <Visual frame={frame} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
