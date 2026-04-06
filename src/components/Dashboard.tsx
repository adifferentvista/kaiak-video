import { interpolate, useCurrentFrame, spring } from "remotion";

const TASKS = [
  { label: "Weekly board report", time: "Saved 2.5 hrs", delay: 20 },
  { label: "Email triage & responses", time: "Saved 1.8 hrs", delay: 35 },
  { label: "Policy document lookup", time: "Saved 1.2 hrs", delay: 50 },
  { label: "Parent update newsletter", time: "Saved 2.0 hrs", delay: 65 },
  { label: "Compliance documentation", time: "Saved 1.5 hrs", delay: 80 },
];

const STATS = [
  { label: "Tasks Automated", value: "23", delay: 15 },
  { label: "Hours Saved", value: "10.4", delay: 25 },
  { label: "Systems Active", value: "6", delay: 35 },
];

export const Dashboard = () => {
  const frame = useCurrentFrame();

  const dashScale = spring({
    frame,
    fps: 30,
    from: 0.92,
    to: 1,
    config: { damping: 20, stiffness: 80 },
  });

  const dashOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: dashOpacity,
        transform: `scale(${dashScale})`,
        padding: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          backgroundColor: "#ffffff",
          borderRadius: 20,
          border: "1px solid rgba(26, 32, 55, 0.1)",
          boxShadow:
            "0 4px 40px rgba(26, 32, 55, 0.08), 0 20px 50px rgba(0,0,0,0.06)",
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.5)",
              }}
            />
            <span
              style={{
                color: "#e2711d",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: 2,
              }}
            >
              KAIAK
            </span>
            <span
              style={{
                color: "#7a8599",
                fontSize: 16,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              System Dashboard
            </span>
          </div>
          <span
            style={{
              color: "#16a34a",
              fontSize: 14,
              fontFamily: "system-ui, sans-serif",
              backgroundColor: "rgba(34,197,94,0.08)",
              padding: "4px 14px",
              borderRadius: 20,
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            All Systems Active
          </span>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 20 }}>
          {STATS.map((stat, i) => {
            const statOpacity = interpolate(
              frame,
              [stat.delay, stat.delay + 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const countUp = interpolate(
              frame,
              [stat.delay, stat.delay + 30],
              [0, parseFloat(stat.value)],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const displayValue =
              stat.value.includes(".")
                ? countUp.toFixed(1)
                : Math.floor(countUp).toString();

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: "#faf7f2",
                  borderRadius: 14,
                  padding: "20px 24px",
                  border: "1px solid rgba(26, 32, 55, 0.06)",
                  opacity: statOpacity,
                }}
              >
                <div
                  style={{
                    color: "#7a8599",
                    fontSize: 13,
                    fontFamily: "system-ui, sans-serif",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    color: i === 1 ? "#e2711d" : "#1a2037",
                    fontSize: 38,
                    fontWeight: 700,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {displayValue}
                  {i === 1 && (
                    <span style={{ fontSize: 18, color: "#7a8599", marginLeft: 4 }}>
                      hrs/wk
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Task list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              color: "#7a8599",
              fontSize: 13,
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 4,
              padding: "0 4px",
            }}
          >
            Automated This Week
          </div>
          {TASKS.map((task, i) => {
            const taskOpacity = interpolate(
              frame,
              [task.delay, task.delay + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const checkScale = interpolate(
              frame,
              [task.delay + 8, task.delay + 16],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const slideX = interpolate(
              frame,
              [task.delay, task.delay + 12],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor:
                    checkScale > 0.5
                      ? "rgba(34,197,94,0.05)"
                      : "rgba(26, 32, 55, 0.02)",
                  borderRadius: 10,
                  opacity: taskOpacity,
                  transform: `translateX(${slideX}px)`,
                  border: "1px solid rgba(26, 32, 55, 0.04)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border:
                        checkScale > 0.5
                          ? "2px solid #22c55e"
                          : "2px solid #c4ccd8",
                      backgroundColor:
                        checkScale > 0.5
                          ? "rgba(34,197,94,0.1)"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {checkScale > 0.5 && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        style={{
                          transform: `scale(${checkScale})`,
                        }}
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      color: "#1a2037",
                      fontSize: 17,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {task.label}
                  </span>
                </div>
                <span
                  style={{
                    color: "#16a34a",
                    fontSize: 14,
                    fontFamily: "system-ui, sans-serif",
                    opacity: checkScale > 0.5 ? 1 : 0,
                  }}
                >
                  ✓ {task.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
